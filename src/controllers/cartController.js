import CartRepository from "../services/repository/cartRepository.js";
import ProductRepository from "../services/repository/productRepository.js";
import TicketRepository from "../services/repository/ticketRepository.js";
import { sendTicketInfoEmail } from "../utils/mail.js";
import { v4 } from "uuid";

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();
const ticketRepository = new TicketRepository();

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
      await cartRepository.removeFromCart(userId, productId);
      res
        .status(200)
        .json({ message: "Producto eliminado del carrito con éxito" });
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
        return res
          .status(403)
          .json({ message: "No tienes permiso para vaciar este carrito" });
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

  completePurchase: async (req, res) => {
    try {
      const userId = req.session.user._id;
      const cartUserId = req.session.user._id; // Obtener el ID del usuario de la sesión
      if (userId !== cartUserId) {
        return res.status(403).json({ message: "No tienes permiso para completar esta compra" });
      }

      const cart = await cartRepository.getCartByUserId(userId);

      if (!cart || cart.products.length === 0) {
        return res.status(404).json({ message: "El carrito está vacío" });
      }

      // Crear una lista para los productos que no se pueden comprar debido a la falta de stock
      const productsNotInStock = [];
      let totalPurchase = 0;

      // Verificar si hay suficiente stock para todos los productos en el carrito
      for (const item of cart.products) {
        const product = await productRepository.getProductById(item.productId);
        if (!product || product.stock < item.quantity) {
          // Si no hay suficiente stock, agregar el producto a la lista de productos sin stock suficiente
          productsNotInStock.push(item);
        } else {
          // Si hay suficiente stock, actualizar el stock y continuar con el siguiente producto
          await productRepository.updateProductStock(
            item.productId,
            -item.quantity
          );
          // Calcular el subtotal del producto y sumarlo al total de la compra
          const subtotal = product.price * item.quantity;
          totalPurchase += subtotal;
        }
      }

      if (cart.products.length > productsNotInStock.length) {
        // Crear el ticket
        const newTicket = await ticketRepository.createTicket({
          code: v4(), // Aquí debes implementar la lógica para generar el código del ticket
          purchase_datetime: new Date(),
          amount: totalPurchase,
          purchaser: userId, // O puedes obtener más detalles del comprador de la sesión si es necesario
        });

        // Enviar el correo electrónico con la información del ticket al comprador
        const ticketData = {
          email: req.session.user.email, // Obtener el correo electrónico del comprador de la sesión
          ticketInfo: newTicket, // Pasar la información del ticket al método
        };
        await sendTicketInfoEmail(ticketData);
      } else {
        // Enviar un mensaje indicando que no había suficiente stock para los productos,
        // pero que los productos aún permanecen en el carrito
        return res.status(422).json({message: "No había suficiente stock para los productos, pero los productos aún permanecen en el carrito",});}
      // Vaciar el carrito y agregar los productos sin stock suficiente
      cart.products = productsNotInStock;
      await cart.save();

      return res
        .status(200)
        .json({ message: "Compra completada con éxito", totalPurchase });
    } catch (error) {
      console.error("Error al completar la compra:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};

export default cartController;
