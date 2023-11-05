import fs from "fs";

export default class ProductManager {
  static productId = 0;
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProduct(prod) {
    const arrayProducts = await this.getProducts();
    prod.id = arrayProducts.length;
    arrayProducts.push(prod);
    const objJson = JSON.stringify(arrayProducts);
    await fs.promises.writeFile(this.path, objJson, (error) => {
      if (error) {
        console.log("ERROR", error.message);
      }
    });
  }

  async getProducts() {
    const content = await fs.promises.readFile(this.path, {
      encoding: "utf-8",
    });
    const contentObj = await JSON.parse(content);
    return contentObj;
  }

  async getProductsWithLimit(limit) {
    const content = await fs.promises.readFile(this.path, {
      encoding: "utf-8",
    });
    const contentObj = await JSON.parse(content);
    const response = [];
    for (let index = 0; index < limit; index++) {
      response.push(contentObj[index]);
    }
    return response;
  }

  async getProductById(id) {
    const content = await fs.promises.readFile(this.path, {
      encoding: "utf-8",
    });
    const contentObj = await JSON.parse(content);
    const prodBuscado = contentObj.find((prod) => prod.id === id);
    if (prodBuscado) {
      return prodBuscado;
    } else {
      throw new Error("no se encontro el prod buscado");
    }
  }

  async updateProduct(id, data) {
    const products = await this.getProducts();
    const nuevoArray = products.map(obj => {
      if (obj.id === id) {
        const prodModificado = {...obj, ...data}
        return prodModificado;
      } else {
        return obj;
      }
    });
    const newObj = JSON.stringify(nuevoArray);
    try {
      await fs.promises.writeFile(this.path, newObj);
      return nuevoArray;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const nuevoArray = products.filter((objeto) => objeto.id !== id); 
    const newObj = JSON.stringify(nuevoArray);
    await fs.promises.writeFile(this.path, newObj, (error) => {
      if (error) {
        throw new Error(`Error: ${error}`);
      }
    });
    return nuevoArray
  }
}
