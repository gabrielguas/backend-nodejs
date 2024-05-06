import { Router } from "express";
import userController from "../../controllers/userController.js";
import hasPermission from "../../middlewares/hasPermissions.middleware.js"
const router = Router();

router.get("/", userController.getAllUsers);
router.delete("/", hasPermission("admin"), userController.deleteUsersTime)

export default router;