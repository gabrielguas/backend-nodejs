import express from "express";
import __dirname from "./utils.js";

// Env
import { configEnv } from "./config/config.js"

// Handlebars
import handlebars from "express-handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import Handlebars from "handlebars";

// Base de datos
import MongoSingleton from "./config/db/mongodb-connection-singleton.js";

import cors from "cors";

// API
import userRouter from "./routes/api/users.api.routes.js";
import productRouter from "./routes/api/products.api.routes.js";
import sessionRouter from "./routes/api/session.api.routes.js"
import cartRouter from "./routes/api/cart.api.routes.js"
import emailApiRouter from './routes/api/email.api.routes.js'


// Vistas
import indexViewRouter from './routes/views/index.routes.js'
import usersViewRouter from './routes/views/users.routes.js'
import githubLoginViewRouter from './routes/views/github-login.routes.js'
import emailRouter from './routes/views/email.routes.js'


// Sessions
import sessionConfig from "./config/server/sessionConfig.js"

//Passport
import passport from "passport";
import initializePassport from "./config/passport.config.js"

//Verificación mailer
import { checkConnection } from "./utils/mail.js";

// Swagger
import { swaggerOptions } from "./config/swagger/swagger.config.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const app = express();

//Configuracion para swagger
const specs = swaggerJSDoc(swaggerOptions);

// Configuración para el manejo de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del motor de plantillas Handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      // Helper para codificar objetos a JSON
      json: function (context) {
        return JSON.stringify(context);
      },
    },
  })
);

// Configuración del motor de plantillas
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

// Configuración de CORS
app.use(cors());

// Public
app.use(express.static(__dirname + "/public"));

// Configuracion de Session
app.use(sessionConfig);


// Middleware de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


// Rutas para vistas
app.use("/", indexViewRouter);
app.use("/users", usersViewRouter);
app.use("/github", githubLoginViewRouter);
app.use("/email", emailRouter);
app.use("/apidocs",swaggerUiExpress.serve,swaggerUiExpress.setup(specs))

// Rutas de la API
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/session",sessionRouter)
app.use("/api/cart", cartRouter)
app.use("/api/email", emailApiRouter)


// Iniciar el servidor en el puerto 8000
app.listen(configEnv.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${configEnv.PORT}`);
});

// Inicializar la instancia de la base de datos MongoDB
const mongoInstance = async () => {
  try {
    await MongoSingleton.getInstance();
  } catch (error) {
    console.error("Error al iniciar la instancia de MongoDB:", error);
  }
};

checkConnection
mongoInstance();
