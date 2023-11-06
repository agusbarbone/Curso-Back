import { Router } from "express";
import ProductManager from "../../productManager.js";
import { __dirname } from "../utils.js";

const router = Router();

const PATH = `${__dirname}data\\products.json`;

router.get("/", async (req, res) => {
  try {
    const products = await new ProductManager(PATH).getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/limit", async (req, res) => {
  try {
    const products = await new ProductManager(PATH).getProductsWithLimit(
      req.query.limit
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const pid = Number(req.params.pid);
    const products = await new ProductManager(PATH).getProductById(pid);
    res.status(200).json(products);
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
      const newProduct = new ProductManager(PATH);
      await newProduct.addProduct(data);
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
    const products = await new ProductManager(PATH).updateProduct(
      Number(req.params.pid),
      req.body
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const products = await new ProductManager(PATH).deleteProduct(
      Number(req.params.pid)
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
