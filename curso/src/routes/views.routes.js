import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import { FileSystemRepository } from "../repository/fileSystemRepository.js";

const router = Router();

const fileSystemRepository = new FileSystemRepository()
const productManager = new ProductManager(fileSystemRepository);

router.get("/", async (req, res) => {
  const prods = await productManager.getProducts()
  res.render("index", {
    prods: prods
  });
});

router.get("/chat", (req, res) => {
  res.render("chat", { msg: "hola" });
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
  });

export default router;
