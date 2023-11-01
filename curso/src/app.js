import express from "express";
import ProductManager from "../productManager.js";

const PORT = 8080;

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const manager1 = new ProductManager("./products.json");

app.get("/products", async (req, res) => {
  const prods = await manager1.getProducts();
  res.status(200).send(prods);
  console.log(prods, "llegando");
});

app.get("/products/:pid", async (req, res) => {
  const prods = await manager1.getProducts();
  res.status(200).send(prods[req.params.pid]);
  console.log(prods);
});

app.get('/productquery', async (req, res) => {
    const prods = await manager1.getProducts()
    res.status(200).send(prods[req.query.pid])
})

app.listen(PORT, () => {
  console.log(`Servidor de Express activo en el puerto ${PORT}`);
});
