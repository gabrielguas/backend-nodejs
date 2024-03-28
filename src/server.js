import express from 'express';
//import config from './config/config.js'
//import Mongosingleton from './config/mongodb-singleton.js'
import cors from 'cors';





const app = express();

//JSON settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());


app.listen(8000, () => {
    console.log("Escuchando en el puerto 8000")
})