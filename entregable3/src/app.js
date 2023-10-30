import express from "express";
import ProductManager from "../../entregable2/entregable2.js";

const PORT = 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));

const manager1 = new ProductManager("../../entregable2/products.json");

app.get("/products", async (req, res) => {
  const prods = await manager1.getProducts();
  res.send(prods);
  console.log(prods, "llegando");
});

app.get("/products/:pid", async (req, res) => {
  const prods = await manager1.getProducts();
  res.send(prods[req.params.pid]);
  console.log(prods);
});

app.get('/productquery', async (req, res) => {
    const prods = await manager1.getProducts()
    res.send(prods[req.query.pid])
})

app.listen(PORT, () => {
  console.log(`Servidor de Express activo en el puerto ${PORT}`);
});
