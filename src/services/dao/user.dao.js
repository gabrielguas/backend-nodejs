import userModel from "../../models/user.model.js";

// Crear un nuevo usuario
const createUser = async (userData) => {
  try {
    const newUser = await userModel.create(userData);
    return newUser;
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error.message);
  }
};

// Obtener todos los usuarios
const getAllUsers = async () => {
  try {
    const users = await userModel.find();
    return users;
  } catch (error) {
    throw new Error("Error al obtener los usuarios: " + error.message);
  }
};

// Obtener un usuario por su ID
const getUserById = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  } catch (error) {
    throw new Error("Error al obtener el usuario: " + error.message);
  }
};

// Actualizar un usuario por su ID
const updateUserById = async (userId, newData) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(userId, newData, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("Usuario no encontrado");
    }
    return updatedUser;
  } catch (error) {
    throw new Error("Error al actualizar el usuario: " + error.message);
  }
};

// Eliminar un usuario por su ID
const deleteUserById = async (userId) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error("Usuario no encontrado");
    }
    return deletedUser;
  } catch (error) {
    throw new Error("Error al eliminar el usuario: " + error.message);
  }
};

// Función para obtener un usuario por su correo electrónico
const getUserByEmail = async (email) => {
  try {
    const user = await userModel.findOne({ email: email });
    return user;
  } catch (error) {
    throw new Error(
      "Error al obtener el usuario por correo electrónico: " + error.message
    );
  }
};

export {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
