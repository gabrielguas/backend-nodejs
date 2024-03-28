import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../services/dao/product.dao.js"

// Crear un nuevo producto
const createProductController = async (req, res) => {
  try {
    const productData = req.body; // Los datos del producto deben estar en el cuerpo de la solicitud
    const newProduct = await createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los productos
const getAllProductsController = async (req, res) => {

  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por su ID
const getProductByIdController = async (req, res) => {
  try {
    const productId = req.params.id; // El ID del producto se puede obtener de los parámetros de la ruta
    const product = await getProductById(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Actualizar un producto por su ID
const updateProductByIdController = async (req, res) => {
  try {
    const productId = req.params.id; // El ID del producto se puede obtener de los parámetros de la ruta
    const newData = req.body; // Los nuevos datos del producto deben estar en el cuerpo de la solicitud
    const updatedProduct = await updateProductById(productId, newData);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Eliminar un producto por su ID
const deleteProductByIdController = async (req, res) => {
  try {
    const productId = req.params.id; // El ID del producto se puede obtener de los parámetros de la ruta
    const deletedProduct = await deleteProductById(productId);
    res.status(200).json(deletedProduct);
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
