import nodemailer from "nodemailer";
import mailConfig from "../config/mail/mail.config.js";
import UserRepository from "../services/repository/userRepository.js";
import { v4 } from "uuid";

const transporter = nodemailer.createTransport(mailConfig);

// Verificar la conexion con gmail
const checkConnection = transporter.verify(function (error, success) {
  if (error) {
    console.log(
      "No se ha podido establecer la conexión con el servidor de correo"
    );
  } else {
    console.log("El servidor está listo para enviar mensajes por mail");
  }
});

// Restablecer contraseña

// Objeto para almacenar temporalmente los correos electrónicos y sus tokens de restablecimiento
const tempDBmails = {};

// Opciones de correo electrónico para el restablecimiento de contraseña
const mailOptionstoReset = {
  from: "guasgabriel22@gmail.com",
  subject: "Reset Password",
};

// Función para enviar un correo electrónico con un enlace para restablecer la contraseña
const sendEmailToResetPassword = async (req, res) => {
  try {
    const userRepository = new UserRepository();
    const { email } = req.body;

    // Obtén el usuario por su correo electrónico
    const user = await userRepository.getUserByEmail(email);
    if (!email || !user) {
      return res
        .status(400)
        .send(
          "No se ha entregado el mail, el mail es incorrecto o no está registrado!"
        );
    }
    // Generar un token único
    const token = v4();
    const link = `http://localhost:8080/api/email/reset-password/${token}`;

    // Guardar el correo electrónico y su token en la base de datos temporal
    tempDBmails[token] = {
      email,
      expirationTime: new Date(Date.now() + 60 * 60 * 1000), // Expira en 1 hora
    };

    // Configurar el contenido del correo electrónico
    mailOptionstoReset.to = email;
    mailOptionstoReset.html = `Para resetear tu contraseña, sigue el <a href="${link}">enlace</a>.`;

    // Enviar el correo electrónico
    transporter.sendMail(mailOptionstoReset, (error, info) => {
      if (error) {
        return res
          .status(500)
          .send({ message: "Error al enviar el correo", payload: error });
      }
      // Redirigir al usuario a la página despues de enviar el correo, no importa si existe o no el mail
      res.redirect("/email/email-sent");
    });
  } catch (error) {
    res.status(500).send({
      error: error,
      message: "No se pudo enviar el correo electrónico",
    });
  }
};

// Función para restablecer la contraseña
const resetPassword = (req, res) => {
  const token = req.params.token;
  const emailInfo = tempDBmails[token];

  if (!emailInfo) {
    return res
      .status(404)
      .send("El token de restablecimiento de contraseña no es válido");
  }

  const now = new Date();
  const expirationTime = emailInfo.expirationTime;

  if (now > expirationTime || !expirationTime) {
    delete tempDBmails[token];
    return res.redirect("/send-email-to-reset");
  }
  tempDBmails[token];
  res.render("resetpassword/reset-password-form", { token });
};

const updatePassword = async (req, res) => {
  const token = req.params.token;
  const emailInfo = tempDBmails[token];
  if (!emailInfo) {
    return res
      .status(404)
      .send("El token de restablecimiento de contraseña no es válido");
  }

  const { email } = emailInfo;
  const { password, confirmPassword } = req.body;

  // Verificar si las contraseñas coinciden
  if (password !== confirmPassword) {
    return res.status(400).send("Las contraseñas no coinciden");
  }

  try {
    const userRepository = new UserRepository();
    // Obtén el usuario por su correo electrónico
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .send("El usuario asociado al correo electrónico no existe");
    }

    // Actualiza la contraseña del usuario
    await userRepository.updatePassword(user._id, password);

    // Elimina el token de la base de datos temporal
    delete tempDBmails[token];

    // Redirige al usuario a la página de confirmación
    res.redirect("/users/login");
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    res.status(500).send("Error al actualizar la contraseña");
  }
};

const sendTicketInfoEmail = async (ticketData) => {
  try {
    const { email, ticketInfo, purchasedItems, productsNotInStock } = ticketData;
    // Construir una cadena HTML para mostrar todos los ítems comprados
    let purchasedItemsHTML = "<ul>";
    purchasedItems.forEach((item) => {
      purchasedItemsHTML += `<li>${item.title} - Cantidad: ${item.quantity} - Precio unitario: ${item.price} - Subtotal: ${item.subtotal}</li>`;
    });
    purchasedItemsHTML += "</ul>";

    let productsNotInStockHTML = "";
    if (productsNotInStock.length > 0) {
      productsNotInStockHTML = "<li>Ítems sin stock:</li><ul>";
      productsNotInStock.forEach((item) => {
        const product = item.productId;
        productsNotInStockHTML += `<li>${product.title} (Cantidad en stock: ${product.stock}) - El producto no pudo ser comprado debido a la falta de stock. Continuará en el carrito.</li>`;
      });
      productsNotInStockHTML += "</ul>";
    }

    // Configurar las opciones de correo electrónico
    const mailOptions = {
      from: "guasgabriel22@gmail.com",
      to: email,
      subject: "Ticket",
      html: `
            <p>¡Hola!</p>
            <p>Aquí tienes la información de tu compra:</p>
            <ul>
                <li>Código del ticket: ${ticketInfo.code}</li>
                <li>Fecha de compra: ${ticketInfo.purchase_datetime}</li>
                <li>Total de compra: ${ticketInfo.amount}</li>
                <li>Ítems comprados:</li>
                ${purchasedItemsHTML} <!-- Aquí se inserta la cadena HTML con los ítems comprados -->
                ${productsNotInStockHTML} <!-- Aquí se inserta la cadena HTML con los ítems sin stock si los hay -->
            </ul>
            <p>¡Gracias por tu compra!</p>
        `,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(
      "Error al enviar el correo electrónico con la información del ticket:",
      error
    );
    throw new Error("Error al enviar el correo electrónico");
  }
};

const sendProductDeletedEmail = async (productName, userEmail) => {
  try {
    // Configurar las opciones de correo electrónico
    const mailOptions = {
      from: "guasgabriel22@gmail.com",
      to: userEmail,
      subject: "Producto Eliminado",
      html: `
        <p>¡Hola!</p>
        <p>Queremos informarte que el siguiente producto ha sido eliminado de tu carrito:</p>
        <p><strong>Producto:</strong> ${productName}</p>
        <p>Lamentamos las molestias que esto pueda ocasionarte. Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactarnos.</p>
        <p>¡Gracias por tu comprensión!</p>
      `,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error al enviar el correo electrónico de producto eliminado:", error);
    throw new Error("Error al enviar el correo electrónico");
  }
};


export {
  checkConnection,
  sendEmailToResetPassword,
  resetPassword,
  updatePassword,
  sendTicketInfoEmail,
  sendProductDeletedEmail,
};
