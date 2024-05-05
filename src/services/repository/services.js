import CartDao from "../dao/cart.dao.js"
import ProductDAO from "../dao/product.dao.js";
import UserDAO from "../dao/user.dao.js";
import TicketDAO from "../dao/ticket.dao.js";

import CartRepository from "./cartRepository.js"
import ProductRepository from "./productRepository.js"
import UserRepository from "./userRepository.js"
import TicketRepository from "./ticketRepository.js"

const cartDao = new CartDao();
const productDao = new ProductDAO();
const userDao = new UserDAO();
const ticketDao = new TicketDAO();

export const cartService = new CartRepository(cartDao);
export const productService = new ProductRepository(productDao);
export const userService = new UserRepository(userDao);
export const ticketService = new TicketRepository(ticketDao);