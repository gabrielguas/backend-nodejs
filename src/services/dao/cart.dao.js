import CartModel from "../../models/cart.model.js"

// Crear un nuevo carrito
const createCart = async (cartData) => {
  try {
    const newCart = await CartModel.create(cartData);
    return newCart;
  } catch (error) {
    throw new Error("Error al crear el carrito: " + error.message);
  }
};

// Obtener todos los carritos
const getAllCarts = async () => {
  try {
    const carts = await CartModel.find();
    return carts;
  } catch (error) {
    throw new Error("Error al obtener los carritos: " + error.message);
  }
};

// Obtener un carrito por su ID de usuario
const getCartByUserId = async (userId) => {
  try {
    const cart = await CartModel.findOne({ userId: userId });
    return cart;
  } catch (error) {
    throw new Error(
      "Error al obtener el carrito por ID de usuario: " + error.message
    );
  }
};

// Actualizar un carrito por su ID de usuario
const updateCartByUserId = async (userId, newData) => {
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
};

// Eliminar un carrito por su ID de usuario
const deleteCartByUserId = async (userId) => {
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
};

export {
  createCart,
  getAllCarts,
  getCartByUserId,
  updateCartByUserId,
  deleteCartByUserId,
};
