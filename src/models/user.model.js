// userModel.js

import mongoose from "mongoose";
import cartModel from "./cart.model.js";

const collection = "users";
const validRoles = ["usuario", "admin", "premium"];

const schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  rol: {
    type: String,
    enum: validRoles,
    default: "usuario",
  },
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
  loggedBy: String,
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" }, // Referencia al carrito

  last_connection: Date,
});

schema.methods.login = function() {
  this.last_connection = new Date();
  return this.save();
};

schema.methods.logout = function() {
  this.last_connection = new Date();
  return this.save();
};

// Middleware para crear un carrito al crear un usuario
schema.pre("save", async function (next) {
  try {
    // Si el usuario no tiene un carrito, créalo
    if (!this.cart) {
      const newCart = await cartModel.create({ userId: this._id });
      this.cart = newCart._id;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const userModel = mongoose.model(collection, schema);

export default userModel;
