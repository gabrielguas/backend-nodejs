import bcrypt from "bcrypt";

// Crear hash
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Validar hash
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};