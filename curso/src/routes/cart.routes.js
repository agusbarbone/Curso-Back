import { Router } from "express";
import CartManager from '../managers/cartManager.js'
import ProductManager from '../managers/productManager.js'
import { __dirname } from "../utils.js";
import { FileSystemRepository } from '../repository/fileSystemRepository.js'

const router = Router();

router.post("/",async (req, res) => {
  try {
    const fileSystemRepository = new FileSystemRepository()
    const productManager = new ProductManager(fileSystemRepository)
    const cartManager = new CartManager(fileSystemRepository, productManager);
    const cart = await cartManager.createCart();
    res.status(200).json(cart)
  } catch (error) {
    res.status(400).json({error: error.message })
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const fileSystemRepository = new FileSystemRepository()
    const productManager = new ProductManager(fileSystemRepository)
    const cartManager = new CartManager(fileSystemRepository,productManager);
    const cart = await cartManager.getCartById(Number(req.params.cid));
    res.status(200).json(cart)
  } catch (error) {
    res.status(400).json({error: error.message })
  }
});

router.post("/:cid/product/:pid",async (req, res) => {
  try {
    const fileSystemRepository = new FileSystemRepository()
    const productManager = new ProductManager(fileSystemRepository)
    const cartManager = new CartManager(fileSystemRepository, productManager);
    const cart = await cartManager.addProductToCart(Number(req.params.cid),Number(req.params.pid));
    res.status(200).json(cart)
  } catch (error) {
    res.status(400).json({error: error.message })
  }
});

export default router;
