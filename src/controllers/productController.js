import { productService,userService } from "../services/repository/services.js";
import { sendProductDeletedEmail } from "../utils/mail.js";

// Crear un nuevo producto
const createProductController = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await productService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los productos
const getAllProductsController = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por su ID
const getProductByIdController = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Actualizar un producto por su ID
const updateProductByIdController = async (req, res) => {
  try {
    const productId = req.params.id;
    const newData = req.body;
    const updatedProduct = await productService.updateProductById(productId, newData);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Eliminar un producto por su ID
const deleteProductByIdController = async (req, res) => {
  try {

    const productId = req.params.id;
    const result = await productService.deleteProductById(productId);

    if (result.owner !== "admin"){
      const user = await userService.getUserById(result.owner);
      sendProductDeletedEmail(result.title, user.email);
    }
    
    res.status(200).json({ message: "El producto fue eliminado"});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



export {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductByIdController,
  deleteProductByIdController,
};
