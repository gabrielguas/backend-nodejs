import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

describe("Testing APP", () => {
  const userId = "65d89d6b90ccdd8e3b62a1af";
  const productId = "658e0f7a80eb9365695f9ed7";
  describe("Testing cart API", () => {
    it("Debe agregar un producto", async () => {
      const response = await requester
        .post(`/api/cart/${userId}/products/${productId}`)
        .send();
      expect(response.status).to.equal(200); // Producto agregado exitosamente
      expect(response.body).to.have.property(
        "message",
        "Producto agregado al carrito con éxito"
      ); // Verifico el msnaje del carrito
    });
    it("Debe vaciar el carrito", async () => {
      const response = await requester.post(`/api/cart/clearcart/${userId}`).send();

    expect(response.status).to.equal(200); // Carrito vaciado exitosamente
    expect(response.body).to.have.property('message', 'Carrito vaciado exitosamente'); // Verifico el mensaje de respuesta
    })
  });
});
