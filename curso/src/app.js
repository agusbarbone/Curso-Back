import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";

import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js";
import { __dirname, __filename } from "./utils.js";
import ProductManager from "./dao/managers/productManager.js";
import { FileSystemRepository } from "./repository/fileSystemRepository.js";
import dotenv from 'dotenv'
const PORT = 8080;
dotenv.config()

const app = express();
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor de Express activo en el puerto ${PORT}`);
});
const socketServer = new Server(httpServer);
const fileSystemRepository = new FileSystemRepository();
const productManager = new ProductManager(fileSystemRepository);
const prods = await productManager.getProducts();
// const mongooseURI = "mongodb+srv://abarbone:K0C477MrNAlpgjFO@ecommerce.xgrnaco.mongodb.net/";

socketServer.on("connection", (socket) => {
  console.log(socket.id);
  socket.emit("prods", { prods: prods });

  socket.on("message", (data) => {
    console.log(data);
    socket.emit("confirmation", data.content);
  });
});

app.use(express.json());
try {
  mongoose.connect(process.env.mongooseURI).then(() => console.log("Base de datos conectada"));
} catch (error) {
  console.log(`Error al iniciar servidor (${error.message})`);
}

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
