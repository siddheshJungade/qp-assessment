import { AppDataSource } from '../config/database';
import { Orders, OrderStatus } from '../entities/Orders';
import { GroceryItem } from '../entities/GroceryItem';
import { OrderItem } from '../entities/OrderItem';
import { IOrderRequest, IOrderResponse, IOrderItemResponse } from '../interfaces/order.interface';

export class OrderService {

    private orderItemRepository = AppDataSource.getRepository(OrderItem);

    async createOrder(orderData: IOrderRequest, customerId: number): Promise<IOrderResponse> {
        // Start a transaction
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            let totalAmount = 0;
            const itemsResponse: IOrderItemResponse[] = [];

            // Validate all items exist and have sufficient inventory
            for (const item of orderData.items) {
                const groceryItem = await queryRunner.manager.findOne(GroceryItem, {
                    where: { id: item.groceryItemId }
                });

                if (!groceryItem) {
                    throw new Error(`Grocery item with ID ${item.groceryItemId} not found`);
                }

                if (groceryItem.inventory < item.quantity) {
                    throw new Error(`Insufficient inventory for item ${groceryItem.name}`);
                }

                const subtotal = groceryItem.price * item.quantity;
                totalAmount += subtotal;

                itemsResponse.push({
                    groceryItemId: item.groceryItemId,
                    name: groceryItem.name,
                    quantity: item.quantity,
                    price: groceryItem.price,
                    subtotal
                });
            }

            // Create order
            const order = queryRunner.manager.create(Orders, {
                orderDate: new Date(),
                customerId,
                totalAmount,
                status: OrderStatus.PENDING
            });

            // Save order
            const savedOrder = await queryRunner.manager.save(order);

            // Create and save order items
            for (const item of orderData.items) {
                const groceryItem = await queryRunner.manager.findOne(GroceryItem, {
                    where: { id: item.groceryItemId }
                });

                // Create order item
                const orderItem = queryRunner.manager.create(OrderItem, {
                    orderId: savedOrder.id,
                    groceryItemId: item.groceryItemId,
                    quantity: item.quantity,
                    unitPrice: groceryItem!.price,
                    subtotal: groceryItem!.price * item.quantity
                });

                await queryRunner.manager.save(orderItem);

                // Update inventory
                groceryItem!.inventory -= item.quantity;
                await queryRunner.manager.save(groceryItem!);
            }

            // Commit the transaction
            await queryRunner.commitTransaction();

            return {
                orderId: savedOrder.id,
                userId: customerId,
                items: itemsResponse,
                total: totalAmount,
                status: savedOrder.status,
                createdAt: savedOrder.createdAt.toISOString()
            };
        } catch (error) {
            // Rollback the transaction in case of error
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            // Release the query runner
            await queryRunner.release();
        }
    }

    async getOrderItems(orderId: number): Promise<IOrderItemResponse[]> {
        const orderItems = await this.orderItemRepository.find({
            where: { orderId: orderId },
            relations: ['groceryItem']
        });

        return orderItems.map(item => ({
            groceryItemId: item.groceryItemId,
            name: item.groceryItem.name,
            quantity: item.quantity,
            price: item.unitPrice,
            subtotal: item.subtotal
        }));
    }
}
