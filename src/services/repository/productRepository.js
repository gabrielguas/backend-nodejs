import ProductDAO from "../dao/product.dao.js"

class ProductRepository {
  constructor() {
    this.productDAO = new ProductDAO();
  }

  async createProduct(productData) {
    try {
      return await this.productDAO.createProduct(productData);
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts() {
    try {
      return await this.productDAO.getAllProducts();
    } catch (error) {
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      return await this.productDAO.getProductById(productId);
    } catch (error) {
      throw error;
    }
  }

  async updateProductById(productId, newData) {
    try {
      return await this.productDAO.updateProductById(productId, newData);
    } catch (error) {
      throw error;
    }
  }

  async deleteProductById(productId) {
    try {
      return await this.productDAO.deleteProductById(productId);
    } catch (error) {
      throw error;
    }
  }
}

export default ProductRepository;
