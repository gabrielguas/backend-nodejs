import ProductModel from "../../models/product.model.js"

class ProductDAO {
  // Método para crear un nuevo producto
  async createProduct(productData) {
    try {
      const newProduct = await ProductModel.create(productData);
      return newProduct;
    } catch (error) {
      throw new Error("Error al crear el producto: " + error.message);
    }
  }

  // Método para obtener todos los productos
  async getAllProducts() {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      throw new Error("Error al obtener los productos: " + error.message);
    }
  }

  // Método para obtener un producto por su ID
  async getProductById(productId) {
    try {
      const product = await ProductModel.findById(productId);
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    } catch (error) {
      throw new Error("Error al obtener el producto: " + error.message);
    }
  }

  // Método para actualizar un producto por su ID
  async updateProductById(productId, newData) {
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
  }

  // Método para eliminar un producto por su ID
  async deleteProductById(productId) {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(productId);
      if (!deletedProduct) {
        throw new Error("Producto no encontrado");
      }
      return deletedProduct;
    } catch (error) {
      throw new Error("Error al eliminar el producto: " + error.message);
    }
  }
}

export default ProductDAO;
