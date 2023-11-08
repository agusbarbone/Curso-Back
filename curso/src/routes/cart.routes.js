import { Router } from "express";
import cartManager from "../../cartManager.js";
import { __dirname } from "../utils.js";

const router = Router();

const CARTPATH = `${__dirname}data\\cart.json`;
const PRODUCTPATH = `${__dirname}data\\products.json`;

router.post("/",async (req, res) => {
  try {
    const cartController = new cartManager(CARTPATH, PRODUCTPATH)
    const cart = await cartController.addCart()
    res.status(200).json(cart)
  } catch (error) {
    res.status(400).json({error: error.message })
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cartController = new cartManager(CARTPATH, PRODUCTPATH)
    const cart = await cartController.getCartById(req.params.cid)
    res.status(200).json(cart)
  } catch (error) {
    res.status(400).json({error: error.message })
  }
});

router.post("/:cid/product/:pid",async (req, res) => {
  try {
    const cartController = new cartManager(CARTPATH, PRODUCTPATH)
    const cart = await cartController.addProductToCart(req.params.cid, req.params.pid)
    res.status(200).json(cart)
  } catch (error) {
    res.status(400).json({error: error.message })
  }
});

export default router;
