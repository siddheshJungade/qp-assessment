import { Router } from 'express';
import { GroceryController } from '../controller/grocery.controller';
import { GroceryValidator } from '../validators/grocery.validator';

const router = Router();
const groceryController = new GroceryController();

router.get(
    '/grocery-items',
    groceryController.getAllGroceryItems.bind(groceryController)
  );

// Grocery Items Routes
router.post(
  '/grocery-items',
  GroceryValidator.validateCreateItem,
  groceryController.createGroceryItem.bind(groceryController)
);


// Grocery Items Routes
router.delete(
    '/grocery-items/:id',
    GroceryValidator.validateId,
    groceryController.deleteGroceryItem.bind(groceryController)
  );

router.patch(
    '/grocery-items/:id',
    GroceryValidator.validateId,
    GroceryValidator.validateUpdateItem,
    groceryController.updateGroceryItem.bind(groceryController)
  );


router.put(
    '/grocery-items/:id/inventory',
    GroceryValidator.validateId,
    GroceryValidator.validateUpdateInventory,
    groceryController.updateGroceryItemInventory.bind(groceryController)
  );

export default router;