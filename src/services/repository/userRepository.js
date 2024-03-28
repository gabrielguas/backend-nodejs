import UserDAO from "../dao/user.dao.js"

import { createHash } from "../../utils/bcrypt.js"

class UserRepository {
  constructor() {
    this.userDAO = new UserDAO();
  }

  async createUser(userData) {
    try {
      return await this.userDAO.createUser(userData);
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      return await this.userDAO.getUserById(userId);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId, newData) {
    try {
      return await this.userDAO.updateUser(userId, newData);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      return await this.userDAO.deleteUser(userId);
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      return await this.userDAO.getUserByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmailOrUsername(email, username) {
    try {
      return await this.userDAO.getUserByEmailOrUsername(email, username);
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(userId, newPassword) {
    try {
      const hashedPassword = createHash(newPassword);
      // Actualiza la contraseña del usuario en la base de datos utilizando el método updateUser del DAO de usuario
      return await this.userDAO.updateUser(userId, { password: hashedPassword  });
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la actualización de la contraseña
      throw error;
    }
  }
}

export default UserRepository;
