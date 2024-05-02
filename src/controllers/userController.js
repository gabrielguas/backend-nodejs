import UserRepository from "../services/repository/userRepository.js";
import CartRepository from "../services/repository/cartRepository.js"

const cartRepository = new CartRepository();

const userController = {


showCartPage: async (req, res) => {
  try {
    const userId = req.session.user._id;
    const cart = await cartRepository.getCartByUserId( userId );
    res.render("cart/cart", { cart });
  } catch (error) {
    console.error("Error al obtener el carrito del usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
},

showAddProductPremiumPage: async (req,res) => {
  const userId = req.session.user._id;
  res.render("premium/addProduct", { userId });
}
}
export default userController;
