import session from "express-session";
import MongoStore from "connect-mongo";
import { configEnv } from "../config.js"

// Configuración de la sesión
const sessionConfig = session({
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${configEnv.DB_USER}:${configEnv.DB_PASS}@${configEnv.DB_CLUSTER}/${configEnv.DB_NAME}?retryWrites=true&w=majority`,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 10 * 60,
  }),
  secret: configEnv.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
});

export default sessionConfig;
