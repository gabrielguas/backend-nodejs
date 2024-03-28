import express from 'express';
import sessionController from "../../controllers/sessionController.js"

const router = express.Router();

// Rutas para la gestión de sesiones de usuario
router.post("/register", sessionController.registerUser);
router.post("/login", sessionController.loginUser);
router.get("/github", sessionController.githubLogin);
router.get("/githubcallback", sessionController.githubLoginCallback);
router.get("/logout", sessionController.logoutUser);
router.get('/fail-register', sessionController.failRegister);
router.get('/fail-login', sessionController.failLogin);

export default router;