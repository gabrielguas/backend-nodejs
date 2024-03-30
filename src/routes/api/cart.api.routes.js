import { Router } from 'express'
import cartController from "../../controllers/cartController.js"

const router = Router();

router.post('/:userId/products/:productId', cartController.addToCart);
router.post('/clearcart/:userId', cartController.clearCart);
// router.post('/checkout', cartController.checkout);
export default router;

