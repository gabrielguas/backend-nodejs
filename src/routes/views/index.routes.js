import { Router } from "express";
import { renderHomePage } from "../../controllers/homeController.js";
import adminController from "../../controllers/adminController.js"
import hasPermissions from "../../middlewares/hasPermissions.middleware.js"

const router = Router();

// Ruta para la página de inicio "/"
router.get("/", async (req, res) => {
  // Verifica si el usuario tiene permisos de administrador
  if (req.session && req.session.user && req.session.user.rol === "admin") {
    // Si es administrador, redirige al panel de administrador
    res.redirect("/admin");
  } else {
    // Si es usuario normal, renderiza la página de inicio
    await renderHomePage(req, res);
  }
});

// Ruta para el panel de administrador
router.get("/admin", hasPermissions("admin"), adminController.showAdminPanel);

export default router;
