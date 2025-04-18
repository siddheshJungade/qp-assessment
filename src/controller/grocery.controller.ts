import { Request, Response } from 'express';
import { GroceryService } from '../services/grocery.service';
import { IGroceryItem, IGroceryItemResponse } from '../interfaces/grocery.interface';

export class GroceryController {
    private adminService: GroceryService;

    constructor() {
      this.adminService = new GroceryService();
    }

    async createGroceryItem(req: Request, res: Response) {
        const result = await this.adminService.createGroceryItem(req.body);
        return res.status(result.code).json(result);
    }

    async getAllGroceryItems(req: Request, res: Response) {
        const result = await this.adminService.getAllGroceryItems();
        return res.status(result.code).json(result);
    }

    async deleteGroceryItem(req: Request, res: Response) {
        const result = await this.adminService.deleteGroceryItem(req.params.id);
        return res.status(result.code).json(result);
    }

    async updateGroceryItem(req: Request, res: Response) {
        const result = await this.adminService.updateGroceryItem(req.params.id, req.body);
        return res.status(result.code).json(result);
    }

    async updateGroceryItemInventory(req: Request, res: Response) {
        const result = await this.adminService.updateGroceryItemInventory(req.params.id, req.body);
        return res.status(result.code).json(result);
    }
}