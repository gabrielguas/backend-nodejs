import { Router } from "express";
import {
  renderLoginPage,
  renderRegisterPage,
} from "../../controllers/authController.js";

const router = Router();

// Ruta para mostrar el formulario de inicio de sesión
router.get("/login", renderLoginPage);
router.get("/register", renderRegisterPage);
export default router;
