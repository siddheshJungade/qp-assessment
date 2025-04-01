import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { IOrderRequest } from '../interfaces/order.interface';

export class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    async createOrder(req: Request, res: Response) {
        try {
            const orderData: IOrderRequest = req.body;
            const customerId = Number(req.params.user_id); 
            const result = await this.orderService.createOrder(orderData, customerId);
            return res.status(201).json(result);
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                if (error.message.includes('not found')) {
                    return res.status(404).json({ error: error.message });
                }
                if (error.message.includes('Insufficient inventory')) {
                    return res.status(400).json({ error: error.message });
                }
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getOrderItems(req: Request, res: Response) {
        try {
            const orderId = Number(req.params.order_id);
            const items = await this.orderService.getOrderItems(orderId);
            return res.status(200).json(items);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
} 