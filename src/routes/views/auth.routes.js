import { Router } from "express";
import {
  renderLoginPage,
  renderRegisterPage,
} from "../../controllers/authController.js";
import isAuth from "../../middlewares/isAuth.middleware.js";

const router = Router();

// Ruta para mostrar el formulario de inicio de sesión
router.get("/login", isAuth, renderLoginPage);
router.get("/register", isAuth, renderRegisterPage);
export default router;
