import passport from "passport";
import passportLocal from "passport-local";
import { createHash, isValidPassword } from "../utils/bcrypt.js"
import GitHubStrategy from "passport-github2";
import { configEnv } from "../config/config.js"
import UserRepository from "../services/repository/userRepository.js"

const { GITHUB_CLIENT_ID, GITHUB_SECRET, GITHUB_CALLBACK_URL } = configEnv;
// Declaro la estrategia
const localStrategy = passportLocal.Strategy;

const initializePassport = () => {
  const userRepo = new UserRepository();
  //Register
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age, rol } = req.body;
        try {
          const exist = await userRepo.getUserByEmail(email);
          if (exist) {
            ("Ya hay un usuario registrado con ese email");
            return done(null, false, {
              message: "Ya hay un usuario registrado con ese email",
            });
          }

          const result = await userRepo.createUser({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            rol,
          });
          return done(null, result);
        } catch (error) {
          console.error("Error registrando al usuario:", error);
          return done(error); // Devuelve el error al middleware de Passport
        }
      }
    )
  );

  //Login
  passport.use(
    "login",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const user = await userRepo.getUserByEmail(username);
          if (!user) {
            console.warn("El usuario no existe");
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            console.warn("Credenciales invalidas");
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done("Error al iniciar sesion: " + error);
        }
      }
    )
  );

  // Funciones de serializacion y desserializacion
  passport.serializeUser(async (user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userRepo.getUserById(id);
      done(null, user);
    } catch (error) {
      console.error("Error desserialiazndo al usuario: ", error);
    }
  });

  // Usando github
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_SECRET,
        callbackUrl: GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userRepo.getUserByEmailOrUsername(
            profile._json.email,
            profile._json.login
          );
          if (!user) {
            let newUser = {
              username: profile._json.login,
              email: profile._json.url,
              password: "gitHubUserPass",
              loggedBy: "GitHub",
              type: "user",
            };
            const result = await userRepo.createUser(newUser);
            return done(null, result);
          } else {
            // Si entramos por aca significa que el user ya existe en la DB
            return done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;
