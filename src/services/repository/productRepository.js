import ProductDAO from "../dao/product.dao.js";

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

  async getAllProductsPaginate(page, limit, query, sort) {
    try {
      let filter = {};
      if (query) {
        filter = {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
        };
      }

      let sortOption = {};
      if (sort) {
        if (sort.toLowerCase() === "asc") {
          sortOption = { price: 1 }; // Ascendente
        } else if (sort.toLowerCase() === "desc") {
          sortOption = { price: -1 }; // Descendente
        }
      }

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: sortOption,
      };

      return await this.productDAO.getAllProductsPaginate(filter, options);
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener productos paginados");
    }
  }
}
export default ProductRepository;
