// SessionController.js
import passport from "passport";

const sessionController = {
  registerUser: async (req, res) => {
    passport.authenticate("register", (err, user, info) => {
      if (err) {
        console.error("Error durante el registro:", err);
        return res
          .status(500)
          .send({ status: "error", message: "Error durante el registro" });
      }
      if (!user) {
        // No se creó el usuario debido a que ya existe un usuario con ese mail
        return res.status(400).send({ status: "error", message: info.message });
      }
      // Usuario creado con éxito
      return res
        .status(201)
        .send({ status: "success", message: "Usuario creado con éxito!" });
    })(req, res);
  },

  loginUser: async (req, res) => {
    passport.authenticate("login", {
      failureRedirect: "/api/session/fail-login",
    })(req, res, () => {
      const user = req.user;

      req.session.user = {
        _id: user._id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        rol: user.rol,
      };

      res.send({
        status: "success",
        payload: req.session.user,
        message: "Login realizado!!",
      });
    });
  },

  githubLogin: async (req, res) => {
    console.log("en githublogin aca");
    passport.authenticate("github", { scope: ["user:email"] })(req, res);
  },

  githubLoginCallback: async (req, res) => {
    
    passport.authenticate("github", { failureRedirect: "/github/error" })(req,res,() => {
        const user = req.user;
        req.session.user = {
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          age: 18, // Establece la edad a 18 por defecto
          rol: user.rol,
        };
        res.redirect("/"); // Redirecciona después del inicio de sesión con éxito
      }
    );
  },

  logoutUser: async (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.error("Error al destruir la sesión: " + error);
        res.status(500).json({
          error: "Error logout",
          msg: "Error al cerrar la sesión",
        });
      } else {
        res.redirect("/");
      }
    });
  },

  failRegister: async (req, res) => {
    res.status(401).send({ error: "Error en el proceso de registro" });
  },

  failLogin: async (req, res) => {
    res.status(401).send({ error: "Error en el proceso de login" });
  },
};

export default sessionController;
