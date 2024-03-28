import express from "express";
//import config from './config/config.js'
import MongoSingleton from './config/db/mongodb-connection-singleton.js';
import cors from "cors";
import userRouter from './routes/users.api.routes.js'


const app = express();

//JSON settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());



// API
app.use("/api/users", userRouter )




app.listen(8000, () => {
  console.log("Escuchando en el puerto 8000");
});

// Levantamos instancia Mongo
const mongoInstance = async () => {
  try {
    await MongoSingleton.getInstance();
  } catch (error) {
    console.error(error);
  }
};

mongoInstance();