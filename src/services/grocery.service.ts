import { DatabaseConnection } from '../config/database';
import { GroceryItem } from '../entities/GroceryItem';
import { IGroceryItem, IGroceryItemResponse } from '../interfaces/grocery.interface';


export class GroceryService {
  private groceryItemRepository = DatabaseConnection.getRepository(GroceryItem);
  async getAllGroceryItems(): Promise<IGroceryItemResponse> {
    try {
      const groceryItems = await this.groceryItemRepository.find();
      return {
        code: 200,
        success: true,
        message: 'Grocery items retrieved successfully',
        data: groceryItems
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: 'Error retrieving grocery items',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
  async createGroceryItem(itemData: IGroceryItem): Promise<IGroceryItemResponse> {
    try {
      // Check if item with same name already exists
      console.log('itemData', itemData);
      const existingItem = await this.groceryItemRepository.findOne({ 
        where: { name: itemData.name } 
      });

      if (existingItem) {
        return {
          code: 400,
          success: false,
          message: 'A grocery item with this name already exists.'
        };
      }

      // Create new grocery item
      const groceryItem = this.groceryItemRepository.create({
        name: itemData.name,
        price: itemData.price,
        inventory: itemData.inventory,
        category: itemData.category,
        description: itemData.description || ''
      });

      // Save to database
      const savedItem = await this.groceryItemRepository.save(groceryItem);

      return {
        code: 201,
        success: true,
        message: 'Grocery item created successfully',
        data: savedItem
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: 'Error creating grocery item',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
  async deleteGroceryItem(id: string): Promise<IGroceryItemResponse> {
    try {
      // Check if item exists
      const existingItem = await this.groceryItemRepository.findOne({ 
        where: { id: Number(id) } 
      });

      if (!existingItem) {
        return {
          code: 404,
          success: false,
          message: 'Grocery item not found'
        };
      }

      // Delete item
      await this.groceryItemRepository.delete(existingItem.id);

      return {
        code: 200,
        success: true,
        message: 'Grocery item deleted successfully'
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: 'Error deleting grocery item',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async updateGroceryItem(id: string, itemData: IGroceryItem): Promise<IGroceryItemResponse> {
    try {
      // Check if item exists
      const existingItem = await this.groceryItemRepository.findOne({ 
        where: { id: Number(id) } 
      });

      if (!existingItem) {
        return {
          code: 404,
          success: false,
          message: 'Grocery item not found'
        };
      }

      // Update item
      existingItem.name = itemData.name;
      existingItem.price = itemData.price;
      existingItem.inventory = itemData.inventory;
      existingItem.category = itemData.category;
      existingItem.description = itemData.description || '';

      // Save to database
      const updatedItem = await this.groceryItemRepository.save(existingItem);

      return {
        code: 200,
        success: true,
        message: 'Grocery item updated successfully',
        data: updatedItem
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: 'Error updating grocery item',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async updateGroceryItemInventory(id: string, itemData: IGroceryItem): Promise<IGroceryItemResponse> {
    try {
      // Check if item exists
      const existingItem = await this.groceryItemRepository.findOne({ 
        where: { id: Number(id) } 
      });

      if (!existingItem) {
        return {
          code: 404,
          success: false,
          message: 'Grocery item not found'
        };
      }

      // Update item
      existingItem.inventory = itemData.inventory;

      // Save to database
      const updatedItem = await this.groceryItemRepository.save(existingItem);

      return {
        code: 200,
        success: true,
        message: 'Grocery item inventory updated successfully',
        data: updatedItem
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: 'Error updating grocery item inventory',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
} 