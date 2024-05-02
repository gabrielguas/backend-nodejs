import { Router } from "express";
import { getAllProductsController,deleteProductByIdController,createProductController, updateProductByIdController, getProductByIdController } from "../../controllers/productController.js";
import hasPermissions from "../../middlewares/hasPermissions.middleware.js"
const router = Router()

router.get("/", getAllProductsController);
router.get("/:id", getProductByIdController);
router.delete("/:id", hasPermissions("admin", "premium"),deleteProductByIdController)
router.post("/", hasPermissions("admin", "premium"), createProductController )
router.put("/:id", updateProductByIdController)


export default router