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

    describe("Testing de login y session con cookie: ", ()=> {
      before(function () {
        this.cookie;
        this.mockUser = {
          first_name: 'John',
          last_name: 'Doe',
          rol: 'usuario',
          email: 'john.doe15@example.com', // Para probar, cambia eesto
          age: 30,
          password: 'contraseña',
          loggedBy: 'account',
          cart: 'id_del_carrito',
        };
      })

      it("Test registro usuario: Debe poder registrar un usuario", async function () {
        //Given

        //Then
        const {statusCode} = await requester.post("/api/session/register").send(this.mockUser)
        //Assert
        expect (statusCode).is.eql(201);
      })

      it("Test login usuario: Debe poder loguear un usuario", async function () {
        //Given
        const mockLogin = {
          email: this.mockUser.email,
          password: this.mockUser.password
        }
        //Then
        const result = await requester.post("/api/session/login").send(mockLogin)
        const cookieResult = result.headers['set-cookie'][0]
        //Assert
        expect(result.statusCode).is.eql(200)

        const cookieData = cookieResult.split("=")
        this.cookie = {
          name: cookieData[0],
          value: cookieData[1]
        }
        expect(this.cookie.value).to.be.ok
      })

      it("Test logout usuario: Debe destruir la session", async function(){
        //Given

        //Then
        const result = await requester.get("/api/session/logout").send()

        //Assert
        expect(result.statusCode).is.eql(200)
        expect(result.body).to.have.property('message', 'Cerraste sesion exitosamente');
      })
    })
  });
});
