import { Router } from "express";
import { getAllProductsController,deleteProductByIdController,createProductController, updateProductByIdController, getProductByIdController } from "../../controllers/productController.js";
import hasPermissions from "../../middlewares/hasPermissions.middleware.js"
const router = Router()

router.get("/", getAllProductsController);
router.get("/:id", getProductByIdController);
router.delete("/:id", hasPermissions("admin"), deleteProductByIdController)
router.post("/",hasPermissions("admin"), createProductController )
router.put("/:id", hasPermissions("admin"), updateProductByIdController)


export default router