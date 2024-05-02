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
      return res.status(400).send("No se ha entregado el mail, el mail es incorrecto o no está registrado!");
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
export {
  checkConnection,
  sendEmailToResetPassword,
  resetPassword,
  updatePassword,
};
