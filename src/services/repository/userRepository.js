

import { createHash } from "../../utils/bcrypt.js"

export default class UserRepository  {
  constructor(dao) {
    this.userDAO = dao;
  }


  async createUser(userData) {
    try {
      return await this.userDAO.createUser(userData);
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(){
    try{
      return await this.userDAO.getAllUsers();
    } catch (error){
      throw error;
    }
  }

  async getAllUsersToDelete(query){
    try{
      return await this.userDAO.getAllUsersToDelete(query)
    }catch(error){
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
      return await this.userDAO.updateUserById(userId, newData);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      return await this.userDAO.deleteUserById(userId);
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
      return await this.userDAO.updateUserById(userId, { password: hashedPassword  });
    } catch (error) {
      throw error;
    }
  }
}
