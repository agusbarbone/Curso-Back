import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js";
import { __dirname, __filename } from "./utils.js";

const PORT = 8080;

const app = express();
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor de Express activo en el puerto ${PORT}`);
});
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log(socket.id);

  socket.on('message', data => {
    console.log(data)
    socket.emit('confirmation', data.content)
  })
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
