import { Router } from "express";
import { getProductByIdController } from "../../controllers/productController.js";

const router = Router()

router.get("/detalle/:id", getProductByIdController);


export default router;