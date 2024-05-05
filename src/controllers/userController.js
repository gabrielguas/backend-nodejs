import { cartService } from "../services/repository/services.js";
import { userService } from "../services/repository/services.js";
import UserDTO from "../services/dto/user.dto.js";


const userController = {


showCartPage: async (req, res) => {
  try {
    const userId = req.session.user._id;
    const cart = await cartService.getCartByUserId( userId );
    res.render("cart/cart", { cart });
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
},

showAddProductPremiumPage: async (req,res) => {
  const userId = req.session.user._id;
  res.render("premium/addProduct", { userId });
},

getAllUsers: async (req,res) => {
  try{
    const users = await userService.getAllUsers();
    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'Usuarios no encontrados' });
    }
    const usersDTO = users.map(user => new UserDTO(user.username, user.email, user.rol));
    res.json({"Usuarios": usersDTO})
  }catch (error){
    res.status(500).send("Error interno del servidor al buscar los usuarios")
  }
}
}
export default userController;
