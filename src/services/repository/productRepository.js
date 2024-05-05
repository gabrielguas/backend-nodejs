
export default class ProductRepository {
  constructor(dao) {
    this.productDAO = dao;
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
        let filter = { stock: { $gt: 0 } }; // Filtrar por stock mayor que cero

        if (query) {
            filter.$or = [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
            ];
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

  async updateProductStock(productId, quantityChange) {
    try {
      const product = await this.getProductById(productId);
      if (!product) {
        throw new Error("Producto no encontrado");
      }

      product.stock += quantityChange;
      await product.save();
    } catch (error) {
      throw new Error("Error al actualizar el stock del producto: " + error.message);
    }
  }
}