// adminController.js
import ProductRepository from "../services/repository/productRepository.js"

const productRepository = new ProductRepository();

const adminController = {
  showAdminPanel: async (req, res) => {
    try {
      const products = await productRepository.getAllProducts();
      res.render("admin/adminPanel", { products: products});
    } catch (error) {
      res.status(500).send("Error interno del servidor al mostrar el panel del admin");
    }
  },

  handleAddProduct: async (req, res) => {
    try {
      const newProduct = req.body; 
      await productRepository.createProduct(newProduct);
      res.redirect("/admin/panel");
    } catch (error) {
      //  console.error("Error al agregar producto:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  handleEditProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const updatedProduct = req.body; 
      await productRepository.updateProductById(productId, updatedProduct);
      res.redirect("/admin/panel");
    } catch (error) {
      // console.error("Error al editar producto:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  handleDeleteProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      await productRepository.deleteProductById(productId);
      res.redirect("/admin/panel");
    } catch (error) {
      // console.error("Error al eliminar producto:", error);
      res.status(500).send("Error interno del servidor");
    }
  },
};

export default adminController;
