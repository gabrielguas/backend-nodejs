import { cartService } from "../services/repository/services.js";
import { userService } from "../services/repository/services.js";
import { sendAccountDeletedEmail } from "../utils/mail.js"
import UserDTO from "../services/dto/user.dto.js";

const userController = {

  showCartPage: async (req, res) => {
    try {
      const userId = req.session.user._id;
      const cart = await cartService.getCartByUserId(userId);
      res.render("cart/cart", { cart });
    } catch (error) {
      res.status(500).send("Error interno del servidor");
    }
  },

  showAddProductPremiumPage: async (req, res) => {
    const userId = req.session.user._id;
    res.render("premium/addProduct", { userId });
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      if (!users || users.length === 0) {
        return res.status(404).json({ error: 'Usuarios no encontrados' });
      }
      const usersDTO = users.map(user => new UserDTO(user.username, user.email, user.rol));
      res.json({ "Usuarios": usersDTO })
    } catch (error) {
      res.status(500).send("Error interno del servidor al buscar los usuarios")
    }
  },

  deleteUsersTime: async (req, res) => {
    try {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      // Buscar usuarios que no han tenido actividad en los últimos 2 días y que no sean administradores
      const inactiveUsers = await userService.getAllUsersToDelete({
        last_connection: { $lt: twoDaysAgo },
        rol: { $ne: "admin" }
      });
      // Enviar correo electrónico a cada usuario inactivo antes de eliminarlos
      await Promise.all(inactiveUsers.map(async (user) => {
        sendAccountDeletedEmail(user.email);
        await userService.deleteUser(user._id);
      }));

      res.status(200).json({ message: "Usuarios inactivos eliminados exitosamente" });
    } catch (error) {
      res.status(500).send("Error interno del servidor al eliminar usuarios inactivos");
    }
  },
}
export default userController;
