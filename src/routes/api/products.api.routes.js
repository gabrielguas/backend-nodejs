import { Router } from "express";
import { getAllProductsController } from "../../controllers/productController.js";

const router = Router()

router.get("/", getAllProductsController);



export default router