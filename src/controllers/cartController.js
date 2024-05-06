
import { cartService, productService, ticketService } from "../services/repository/services.js";
import { sendTicketInfoEmail } from "../utils/mail.js";
import { v4 } from "uuid";

const cartController = {
  addToCart: async (req, res) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;
      await cartService.addToCart(userId, productId);
      res.status(200).json({ message: "Producto agregado al carrito con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const userId = req.session.user._id;
      const productId = req.params.productId;
      await cartService.removeFromCart(userId, productId);
      res
        .status(200)
        .json({ message: "Producto eliminado del carrito con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  clearCart: async (req, res) => {
    try {
      const cartUserId = req.params.userId;
      
      const cart = await cartService.getCartByUserId(cartUserId);
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

      const cart = await cartService.getCartByUserId(userId);

      if (!cart || cart.products.length === 0) {
        return res.status(404).json({ message: "El carrito está vacío" });
      }

      // Crear una lista para los productos que no se pueden comprar debido a la falta de stock
      const productsNotInStock = [];
      const purchasedItems = [];
      let totalPurchase = 0;

      // Verificar si hay suficiente stock para todos los productos en el carrito
      for (const item of cart.products) {
        const product = await productService.getProductById(item.productId);
        if (!product || product.stock < item.quantity) {
          // Si no hay suficiente stock, agregar el producto a la lista de productos sin stock suficiente
          productsNotInStock.push(item);
        } else {
          // Si hay suficiente stock, actualizar el stock y continuar con el siguiente producto
          await productService.updateProductStock(
            item.productId,
            -item.quantity
          );
          // Calcular el subtotal del producto y sumarlo al total de la compra
          const subtotal = product.price * item.quantity;
          totalPurchase += subtotal;

          // Agregar el ítem a la lista de ítems comprados
          purchasedItems.push({
            title: product.title,
            quantity: item.quantity,
            price: product.price,
            subtotal: subtotal
        });
        }
      }

      if (cart.products.length > productsNotInStock.length) {
        // Crear el ticket
        const newTicket = await ticketService.createTicket({
          code: v4(),
          purchase_datetime: new Date(),
          amount: totalPurchase,
          purchaser: userId, 
        });
        // Enviar el correo electrónico con la información del ticket al comprador
        const ticketData = {
          email: req.session.user.email, 
          ticketInfo: newTicket,
          purchasedItems,
          productsNotInStock,
        };
        await sendTicketInfoEmail(ticketData);
      } else {
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
