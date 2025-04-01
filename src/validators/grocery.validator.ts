import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export class GroceryValidator {
  private static createItemSchema = Joi.object({
    name: Joi.string().trim().required(),
    price: Joi.number().positive().precision(2).required(),
    inventory: Joi.number().integer().min(0).required(),
    category: Joi.string().trim().required(),
    description: Joi.string().trim().allow('').optional()
  });

  private static verifyIdSchema = Joi.object({
    id: Joi.number().integer().positive().required()
  });

  private static updateItemSchema = Joi.object({
    name: Joi.string().trim().optional(),
    price: Joi.number().positive().precision(2).optional(),
    inventory: Joi.number().integer().min(0).optional(),
    category: Joi.string().trim().optional(),
    description: Joi.string().trim().allow('').optional()
  });

  private static updateInventorySchema = Joi.object({
    inventory: Joi.number().integer().min(0).required()
  });

  static validateUpdateInventory(req: Request, res: Response, next: NextFunction) {
    const { error, value } = GroceryValidator.updateInventorySchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }
    // Update request body with validated and sanitized data
    req.body = value;
    next();

  }

  static validateUpdateItem(req: Request, res: Response, next: NextFunction) {
    const { error, value } = GroceryValidator.updateItemSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: false
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    // Update request body with validated and sanitized data
    req.body = value;
    next();
  }

  static validateCreateItem(req: Request, res: Response, next: NextFunction) {
    const { error, value } = GroceryValidator.createItemSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: false
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    // Update request body with validated and sanitized data
    req.body = value;
    next();
  }

  static validateId(req: Request, res: Response, next: NextFunction) {
    const { error, value } = GroceryValidator.verifyIdSchema.validate(req.params);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    // Update request params with validated and sanitized data
    req.params = value;
    next();
  }
} 