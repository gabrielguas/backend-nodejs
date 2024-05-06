import mongoose from "mongoose";
import { configEnv } from "../config.js"

const { DB_USER, DB_PASS, DB_CLUSTER, DB_NAME } = configEnv;
export default class MongoSingleton {
  static #instance;

  constructor() {
    this.#connectMongoDB();
  }

  // Implementacon Singleton
  static getInstance() {
    if (this.#instance) {
    } else {
      this.#instance = new MongoSingleton();
    }
    return this.#instance;
  }

  #connectMongoDB = async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`
      );
      console.log("Conectado con exito a MongoDB usando Moongose.");
    } catch (error) {
      console.error("No se pudo conectar a la BD usando Moongose: " + error);
      process.exit();
    }
  };
}
