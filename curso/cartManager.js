import fs from "fs";
import ProductManager from "./productManager.js";

export default class cartManager {
  constructor(cartpath, productpath) {
    this.cartpath = cartpath;
    this.productpath = productpath;
  }

  async addCart() {
    const arrayCart = await this.getCart();
    const cart = {};
    cart.products = [];
    cart.id = arrayCart.length;
    arrayCart.push(cart);
    const cartJson = JSON.stringify(arrayCart);
    await this.saveCart(cartJson);
    return cart;
  }

  async addProductToCart(cid, pid) {
    const prodID = Number(pid);
    const cartID = Number(cid);
    const productManager = new ProductManager(this.productpath);
    const arrayProducts = await productManager.getProducts();
    const arrayCarts = await this.getCart();
    const prodExists = arrayProducts.some((prod) => prod.id === prodID);
    const cartExists = arrayCarts.some((cart) => cart.id === cartID);
    let updatedCartArray = [];
    if (prodExists && cartExists) {
      const searchedCart = arrayCarts.find(
        (cart) => cart.id === cartID,
        () => {
          const searchedProdOnCart = cart.products.find(
            (prod) => prod.id === prodID
          );
          if (searchedProdOnCart) {
            prod.quantity += 1;
          } else {
            cart.products.push({
              id: prodID,
              quantity: 1,
            });
          }
        }
      );
      updatedCartArray = arrayCarts.map(
        (cart) => cart.id === cartID,
        () => {
          cart = searchedCart;
        }
      );
    }

    const cartJson = JSON.stringify(updatedCartArray);
    await this.saveCart(cartJson);
    return updatedCartArray;
  }

  async saveCart(cartJson) {
    await fs.promises.writeFile(this.cartpath, cartJson, (error) => {
      if (error) {
        throw new Error("No se pudo crear el carrito");
      }
      return cartJson;
    });
  }

  async getCart() {
    const content = await fs.promises.readFile(this.cartpath, {
      encoding: "utf-8",
    });
    const contentObj = await JSON.parse(content);
    return contentObj;
  }
  
  async getCartById(id) {
    const CARTID = Number(id)
    const content = await fs.promises.readFile(this.cartpath, {
      encoding: "utf-8",
    });
    const contentObj = await JSON.parse(content);
    const cartBuscado = contentObj.find((prod) => prod.id === CARTID);
    if (cartBuscado) {
      return cartBuscado;
    } else {
      throw new Error("no se encontro el prod buscado");
    }
  }
}
