import { Router } from 'express'
import cartController from "../../controllers/cartController.js"
import validateCartOwnership from '../../middlewares/validateCartOwnership.js';
const router = Router();

router.post('/:userId/products/:productId',validateCartOwnership, cartController.addToCart);
router.post('/remove/:userId/:productId',validateCartOwnership, cartController.removeFromCart);
router.post('/clearcart/:userId',validateCartOwnership, cartController.clearCart);
router.post('/checkout/:userId',validateCartOwnership, cartController.completePurchase);
export default router;

