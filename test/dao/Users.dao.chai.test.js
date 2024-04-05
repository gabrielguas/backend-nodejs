import mongoose from "mongoose";
import UserDAO from "../../src/services/dao/user.dao.js";
import { expect } from "chai";

mongoose.connect(
  `mongodb+srv://guasgabriel22:FanoQ6mSsi7a1iwu@curso-backend-ch.j0ycecz.mongodb.net/entregaDB-test?retryWrites=true&w=majority`
);

describe('Testing User DAO', () => {
  before(function () {
    this.userDAO = new UserDAO();
  })
  beforeEach(function () {
    this.timeout(5000);
    mongoose.connection.collections.users.drop();
  })

  it('El DAO debe devolver los usuarios en forma de arreglo', async function () {
    // Given
    const isArray = [];

    // Then
    const result = await this.userDAO.getAllUsers();

    // Assert that
    expect(result).to.be.deep.equal(isArray);
  })


  it('El DAO debería crear un usuario correctamente', async function () {
    const userData = {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      age: 30,
      password: "password123",
      loggedBy: "email",
    };
    const createdUser = await this.userDAO.createUser(userData);

    expect(createdUser).to.have.property('_id');
  });

  it('El DAO debería eliminar un usuario por su ID correctamente', async function () {
    const userData = {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      age: 30,
      password: "password123",
      loggedBy: "email",
    };
    const createdUser = await this.userDAO.createUser(userData);

    const deletedUser = await this.userDAO.deleteUserById(createdUser._id);

    expect(deletedUser._id).to.deep.equal(createdUser._id);

  });


  afterEach(function () {
    mongoose.connection.collections.users.drop();
  })
});