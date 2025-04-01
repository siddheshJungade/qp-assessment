import { Router } from 'express';
import { AdminController } from '../controller/admin.controller';
import { GroceryValidator } from '../validators/grocery.validator';

const router = Router();
const adminController = new AdminController();

router.get(
    '/grocery-items',
    adminController.getAllGroceryItems.bind(adminController)
  );

// Grocery Items Routes
router.post(
  '/grocery-items',
  GroceryValidator.validateCreateItem,
  adminController.createGroceryItem.bind(adminController)
);


// Grocery Items Routes
router.delete(
    '/grocery-items/:id',
    GroceryValidator.validateId,
    adminController.deleteGroceryItem.bind(adminController)
  );

router.patch(
    '/grocery-items/:id',
    GroceryValidator.validateId,
    GroceryValidator.validateUpdateItem,
    adminController.updateGroceryItem.bind(adminController)
  );


router.put(
    '/grocery-items/:id/inventory',
    GroceryValidator.validateId,
    GroceryValidator.validateUpdateInventory,
    adminController.updateGroceryItemInventory.bind(adminController)
  );

export default router;