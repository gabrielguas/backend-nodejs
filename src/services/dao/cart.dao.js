import CartModel from "../../models/cart.model.js";

class CartDAO {
  async createCart(cartData) {
    try {
      const newCart = await CartModel.create(cartData);
      return newCart;
    } catch (error) {
      throw new Error("Error al crear el carrito: " + error.message);
    }
  }

  async getAllCarts() {
    try {
      const carts = await CartModel.find();
      return carts;
    } catch (error) {
      throw new Error("Error al obtener los carritos: " + error.message);
    }
  }

  async getCartByUserId(userId) {
    try {
      const cart = await CartModel.findOne({ userId: userId }).populate('products.productId');;
      return cart;
    } catch (error) {
      throw new Error(
        "Error al obtener el carrito por ID de usuario: " + error.message
      );
    }
  }

  async updateCartByUserId(userId, newData) {
    try {
      const updatedCart = await CartModel.findOneAndUpdate(
        { userId: userId },
        newData,
        { new: true }
      );
      if (!updatedCart) {
        throw new Error("Carrito no encontrado");
      }
      return updatedCart;
    } catch (error) {
      throw new Error(
        "Error al actualizar el carrito por ID de usuario: " + error.message
      );
    }
  }

  async deleteCartByUserId(userId) {
    try {
      const deletedCart = await CartModel.findOneAndDelete({ userId: userId });
      if (!deletedCart) {
        throw new Error("Carrito no encontrado");
      }
      return deletedCart;
    } catch (error) {
      throw new Error(
        "Error al eliminar el carrito por ID de usuario: " + error.message
      );
    }
  }
}

export default CartDAO;
