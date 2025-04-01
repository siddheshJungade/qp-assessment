import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export class OrderValidator {
    private static createOrderSchema = Joi.object({
        items: Joi.array().items(Joi.object({
            groceryItemId: Joi.number().integer().positive().required(),
            quantity: Joi.number().integer().positive().required()
        })).min(1).required()
    });

    private static userIdSchema = Joi.object({
        user_id: Joi.number().integer().positive().required()
    });

    private static orderIdSchema = Joi.object({
        order_id: Joi.number().integer().positive().required()
    });

    static validateOrderId(req: Request, res: Response, next: NextFunction) {
        const { error, value } = OrderValidator.orderIdSchema.validate(req.params);
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.details.map(detail => detail.message)
            });
        }
        req.params = value;
        next()
    }
    static validateUserId(req: Request, res: Response, next: NextFunction) {
        const { error, value } = OrderValidator.userIdSchema.validate(req.params);
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.details.map(detail => detail.message)
            });
        }
        req.params = value;
        next()
    }
    static validateCreateOrder(req: Request, res: Response, next: NextFunction) {
        const { error, value } = OrderValidator.createOrderSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.details.map(detail => detail.message)
            });
        }
        req.body = value;
        next();
    }
} 