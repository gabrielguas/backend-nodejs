import express from 'express';
import adminController from '../../controllers/adminController.js';
import hasPermissions from '../../middlewares/hasPermissions.middleware.js';

const router = express.Router();

// Ruta para cambiar el rol del usuario
router.post('/:userId/update-role',hasPermissions("admin"), adminController.handleUpdateUserRole);
router.delete('/:userId/delete-user',hasPermissions("admin"), adminController.handleDeleteUser);
export default router;