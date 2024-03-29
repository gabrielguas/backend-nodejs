import { Router } from "express";
import { renderLoginPage, renderRegisterPage } from "../../controllers/authController.js";
import userController from "../../controllers/userController.js"
import isAuth from "../../middlewares/isAuth.middleware.js";
import hasPermissions from "../../middlewares/hasPermissions.middleware.js";

const router = Router();

// Ruta para mostrar el formulario de inicio de sesión
router.get("/login", isAuth, renderLoginPage);
router.get("/register", isAuth, renderRegisterPage);
router.get("/:userId/cart", hasPermissions("usuario","premium"), userController.showCartPage)

export default router;
