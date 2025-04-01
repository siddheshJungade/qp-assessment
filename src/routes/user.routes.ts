import { Router } from "express";
import { GroceryController } from "../controller/grocery.controller";
import { OrderController } from "../controller/order.controller";
import { OrderValidator } from "../validators/order.validator";

const router = Router();
const groceryController = new GroceryController();
const orderController = new OrderController();

router.get('/grocery-items', groceryController.getAllGroceryItems.bind(groceryController));
router.post('/:user_id/orders',OrderValidator.validateUserId,OrderValidator.validateCreateOrder, orderController.createOrder.bind(orderController));
router.get('/orders/:order_id/items', OrderValidator.validateOrderId,orderController.getOrderItems.bind(orderController));

export default router;