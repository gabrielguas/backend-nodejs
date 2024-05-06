import userModel from "../../models/user.model.js";

class UserDAO {
  async createUser(userData) {
    try {
      const newUser = await userModel.create(userData);
      return newUser;
    } catch (error) {
      throw new Error("Error al crear el usuario: " + error.message);
    }
  }

  async getAllUsers() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      throw new Error("Error al obtener los usuarios: " + error.message);
    }
  }

  async getAllUsersToDelete(query) {
    try {
      const users = await userModel.find(query)
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return user;
    } catch (error) {
      throw new Error("Error al obtener el usuario: " + error.message);
    }
  }

  async updateUserById(userId, newData) {
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
  }

  async deleteUserById(userId) {
    try {
      const deletedUser = await userModel.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new Error("Usuario no encontrado");
      }
      return deletedUser;
    } catch (error) {
      throw new Error("Error al eliminar el usuario: " + error.message);
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await userModel.findOne({ email: email });
      return user;
    } catch (error) {
      throw new Error(
        "Error al obtener el usuario por correo electrónico: " + error.message
      );
    }
  }
  async getUserByEmailOrUsername(email, username) {
    try {
      return await userModel.findOne({
        $or: [
          { email: email },
          { first_name: username }
        ]
      });
    } catch (error) {
      throw error;
    }
  }
}

export default UserDAO;
