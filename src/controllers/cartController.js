import CartRepository from "../services/repository/cartRepository.js";

const cartRepository = new CartRepository();

const cartController = {
  addToCart: async (req, res) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;
      await cartRepository.addToCart(userId, productId);
      res
        .status(200)
        .json({ message: "Producto agregado al carrito con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;
      await cartRepository.removeFromCart(userId, productId)
      res.status(200).json({ message: "Producto eliminado del carrito con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  clearCart: async (req, res) => {
    try {

      // const userId = req.session.user._id;
      const cartUserId = req.params.userId;
      console.log(cartUserId);
      if (cartUserId !== cartUserId) {
        return res.status(403).json({ message: "No tienes permiso para vaciar este carrito" });
      }

      const cart = await cartRepository.getCartByUserId(cartUserId);

      if (cart) {
        cart.products = [];
        await cart.save();
        res.redirect(`/users/${req.session.user._id}/cart`);
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