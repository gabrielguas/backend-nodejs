import { productService, userService } from "../services/repository/services.js";

const adminController = {
  showAdminPanel: async (req, res) => {
    try {
      const products = await productService.getAllProducts();
      res.render("admin/adminPanel", { products: products });
    } catch (error) {
      res.status(500).send("Error interno del servidor al mostrar el panel del admin");
    }
  },

  handleAddProduct: async (req, res) => {
    try {
      const newProduct = req.body;
      await productService.createProduct(newProduct);
      res.redirect("/admin/panel");
    } catch (error) {
      res.status(500).send("Error interno del servidor");
    }
  },

  handleEditProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const updatedProduct = req.body;
      await productService.updateProductById(productId, updatedProduct);
      res.redirect("/admin/panel");
    } catch (error) {
      // console.error("Error al editar producto:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  handleDeleteProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      await productService.deleteProductById(productId);
      res.redirect("/admin/panel");
    } catch (error) {
      res.status(500).send("Error interno del servidor");
    }
  },

  showAdminPanelUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers()

      res.render("admin/adminPanelUsers", { users: users });
    } catch (error) {
      res.status(500).send("Error interno del servidor al mostrar el panel del admin");
    }
  },

  handleUpdateUserRole: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await userService.getUserById(userId);

      if (!user) {
        return res.status(404).send("Usuario no encontrado");
      }

      const roles = ["usuario", "premium", "admin"];
      const currentIndex = roles.indexOf(user.rol);
      const nextIndex = (currentIndex + 1) % roles.length;
      const newRole = roles[nextIndex];

      await userService.updateUser(userId, { rol: newRole });

      res.status(200).send("Rol del usuario actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el rol del usuario:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  handleDeleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await userService.getUserById(userId);

      if (!user) {
        return res.status(404).send("Usuario no encontrado");
      }

      await userService.deleteUser(userId);

      res.status(200).send("Usuario eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      res.status(500).send("Error interno del servidor");
    }
  }


};

export default adminController;
