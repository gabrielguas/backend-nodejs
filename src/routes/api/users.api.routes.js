import { Router } from "express";
import { createUserController, getUserByIdController } from "../../controllers/userController.js";

const router = Router();

router.post('/', createUserController);
router.get('/:id', getUserByIdController);

export default router;