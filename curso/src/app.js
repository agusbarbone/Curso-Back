import express from "express";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import { __dirname, __filename } from "./utils.js";

const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
  console.log(`Servidor de Express activo en el puerto ${PORT}`);
});
