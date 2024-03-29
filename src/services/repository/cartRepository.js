import CartDAO from "../dao/cart.dao.js";

class CartRepository {
  constructor() {
    this.cartDAO = new CartDAO();
  }

  async createCart(cartData) {
    try {
      return await this.cartDAO.createCart(cartData);
    } catch (error) {
      throw error;
    }
  }

  async getAllCarts() {
    try {
      return await this.cartDAO.getAllCarts();
    } catch (error) {
      throw error;
    }
  }

  async getCartByUserId(userId) {
    try {
      return await this.cartDAO.getCartByUserId( userId );
    } catch (error) {
      throw new Error(
        "Error al obtener el carrito por ID de usuario: " + error.message
      );
    }
  }

  async updateCartByUserId(userId, newData) {
    try {
      return await this.cartDAO.updateCartByUserId(userId, newData);
    } catch (error) {
      throw error;
    }
  }

  async deleteCartByUserId(userId) {
    try {
      return await this.cartDAO.deleteCartByUserId(userId);
    } catch (error) {
      throw error;
    }
  }

  async addToCart(userId, productId) {
    let cart = await this.cartDAO.getCartByUserId(userId);
    const existingProductIndex = cart.products.findIndex((product) => {
      return String(product.productId._id) === String(productId);
    });
    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity++;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }
    await cart.save();
  }
}

export default CartRepository;
