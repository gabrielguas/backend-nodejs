import ProductModel from "../../models/product.model.js"

// Crear un nuevo producto
const createProduct = async (productData) => {
  try {
    const newProduct = await ProductModel.create(productData);
    return newProduct;
  } catch (error) {
    throw new Error("Error al crear el producto: " + error.message);
  }
};

// Obtener todos los productos
const getAllProducts = async () => {
  try {
    const products = await ProductModel.find();
    return products;
  } catch (error) {
    throw new Error("Error al obtener los productos: " + error.message);
  }
};

// Obtener un producto por su ID
const getProductById = async (productId) => {
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  } catch (error) {
    throw new Error("Error al obtener el producto: " + error.message);
  }
};

// Actualizar un producto por su ID
const updateProductById = async (productId, newData) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      newData,
      { new: true }
    );
    if (!updatedProduct) {
      throw new Error("Producto no encontrado");
    }
    return updatedProduct;
  } catch (error) {
    throw new Error("Error al actualizar el producto: " + error.message);
  }
};

// Eliminar un producto por su ID
const deleteProductById = async (productId) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new Error("Producto no encontrado");
    }
    return deletedProduct;
  } catch (error) {
    throw new Error("Error al eliminar el producto: " + error.message);
  }
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
