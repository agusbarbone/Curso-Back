import { Router } from "express";
import ProductManager from '../managers/productManager.js'
import { FileSystemRepository } from '../repository/fileSystemRepository.js'
import { __dirname } from "../utils.js";

const router = Router();

router.get("/:limit?", async (req, res) => {
  try {
    const fileSystemRepository = new FileSystemRepository()
    const productManager = new ProductManager(fileSystemRepository);         
    const products = await productManager.getProducts(req.params.limit)
    res.status(200).json(products);    
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/byId/:pid", async (req, res) => {
  try {
    const fileSystemRepository = new FileSystemRepository()
    const productManager = new ProductManager(fileSystemRepository);
    const product = await productManager.getProductById(Number(req.params.pid),req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    if (
      data.title &&
      data.description &&
      data.code &&
      data.price &&
      data.status &&
      data.stock &&
      data.category
    ) {
      const fileSystemRepository = new FileSystemRepository()
      const productManager = new ProductManager(fileSystemRepository);
      await productManager.createProduct(data);
      res.status(200).json(data);
    } else {
      throw new Error("falto algun dato");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const fileSystemRepository = new FileSystemRepository()
    const productManager = new ProductManager(fileSystemRepository);
    await productManager.updateProduct(Number(req.params.pid),req.body);
    res.status(200).json(req.body);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const fileSystemRepository = new FileSystemRepository()
    const productManager = new ProductManager(fileSystemRepository);
    const products = await productManager.deleteProduct(Number(req.params.pid),req.body);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

export default router;
