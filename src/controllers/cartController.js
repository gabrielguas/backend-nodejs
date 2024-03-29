import CartRepository from "../services/repository/cartRepository.js";

const cartRepository = new CartRepository();

const cartController = {
  addToCart: async (req, res) => {
    try {
      const userId = req.session.user._id;
      const productId = req.params.productId;
      await cartRepository.addToCart(userId, productId);
      res
        .status(200)
        .json({ message: "Producto agregado al carrito con éxito" });
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  clearCart: async (req, res) => {
    try {
      const userId = req.session.user._id;
      const cart = await cartRepository.getCartByUserId(userId)

      if (cart) {
        cart.products = [];
        await cart.save();
        res.status(200).json({ message: "Carrito vaciado exitosamente" });
      } else {
        res.status(404).json({ message: "El carrito está vacío" });
      }
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};

export default cartController;
