import { Router } from "express";
import ProductManager from "../dao/managers/productManager.js";
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

router.get("/realtimeproducts",async (req, res) => {
  const prods = await productManager.getProducts()
    res.render("realTimeProducts", {
      prods: prods
    });
  });

export default router;
