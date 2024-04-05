import mongoose from "mongoose";
import ProductDAO from "../../src/services/dao/product.dao.js";
import Assert from 'assert';


mongoose.connect(
  `mongodb+srv://guasgabriel22:FanoQ6mSsi7a1iwu@curso-backend-ch.j0ycecz.mongodb.net/entregaDB-test?retryWrites=true&w=majority`
);


const assert = Assert.strict

describe('Test Product DAO', () => {
  before(function () {
    this.productDAO = new ProductDAO();
  })

  beforeEach(function () {
    this.timeout(5000);
    mongoose.connection.collections.products.drop();
  })

  it('El DAO debe retornar todos los productos en forma de array', async function () {
    // Given
    const isArray = true;

    // Then
    const result = await this.productDAO.getAllProducts();

    // Assert that
    assert.strictEqual(Array.isArray(result), isArray);
  })

  it('El DAO debe agregar un producto a la base de datos', async function () {
    // Given
    const ejemploProducto = {
      title: "Laptop",
      description: "Laptop de alta gama con procesador Intel Core i7 y 16GB de RAM",
      code: "LT001",
      price: 1499.99,
      status: true,
      stock: 50,
      category: "Computadoras",
      thumbnail: ["url1", "url2"],
      owner: "admin"
    };

    // Then
    const result = await this.productDAO.createProduct(ejemploProducto)

    // Aseert that
    assert.ok(result._id);
  })

  it('El DAO debe eliminar un producto de la base de datos por su ID', async function () {
    // Given
    const ejemploProducto = {
      title: "PC",
      description: "PC de alta gama con procesador Intel Core i5 y 8GB de RAM",
      code: "PC001",
      price: 899.99,
      status: true,
      stock: 100,
      category: "Computadoras",
      thumbnail: ["url1", "url2"],
      owner: "admin"
    };
    const product = await this.productDAO.createProduct(ejemploProducto);

    // Then
    const result = await this.productDAO.deleteProductById(product._id);

    // Assert that
    assert.strictEqual(result._id.toString(), product._id.toString());
  });



  afterEach(function () {
    mongoose.connection.collections.products.drop();
  })
})