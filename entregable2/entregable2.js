import fs from "fs";

const file = "./products.json";

class ProductManager {
  static productId = 0;
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProduct(prod) {
    ProductManager.productId++;
    prod.id = ProductManager.productId;
    this.products.push(prod);
    const objJson = JSON.stringify(this.products);
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
    console.log(contentObj);
  }

  async getProductById(id) {
    const content = await fs.promises.readFile(this.path, {
      encoding: "utf-8",
    });
    const contentObj = await JSON.parse(content);
    const prodBuscado = contentObj.find((prod) => prod.id === id);
    if (prodBuscado) {
      console.log(prodBuscado);
    } else {
      console.log("no se pudo encontrar el producto buscado");
    }
  }

  async updateProduct(id, data) {
    const content = await fs.promises.readFile(this.path, {
      encoding: "utf-8",
    });
    const contentObj = await JSON.parse(content);
    const indiceProd = contentObj.findIndex((prod) => prod.id === id);
    if (indiceProd >= 0) {
      contentObj[indiceProd] = data;
      console.log(contentObj);
      const newObj = JSON.stringify(contentObj);
      await fs.promises.writeFile(this.path, newObj, (error) => {
        if (error) {
          console.log("ERROR", error.message);
        }
      });
    } else {
      console.log("no se encontro al producto");
    }
  }

  async deleteProduct(id) {
    const content = await fs.promises.readFile(this.path, {
      encoding: "utf-8",
    });
    const contentObj = await JSON.parse(content);
    const indiceProd = contentObj.findIndex((prod) => prod.id === id);
    if (indiceProd >= 0) {
      contentObj.splice(indiceProd, 1);
      const newObj = JSON.stringify(contentObj);
      await fs.promises.writeFile(this.path, newObj, (error) => {
        if (error) {
          console.log("ERROR", error.message);
        }
      });
      console.log("producto eliminado satisfactoriamente");
    } else {
      console.log("producto no encontrado");
    }
  }
}

const manager1 = new ProductManager(file);
const newProduct = {
  title: "guitarra",
  description: "electrica",
  price: 2000,
  thumbnail: "URL",
  code: "abc1",
  stock: 2000,
};
manager1.getProducts();
// manager1.addProduct(newProduct);
// manager1.getProducts();
// manager1.getProductById(1);
// manager1.getProductById(2);
// manager1.updateProduct(1, {
//   title: "bajo",
//   description: "electrica",
//   price: 50000,
//   thumbnail: "URL",
//   code: "abc1",
//   stock: 2000,
// });
// manager1.updateProduct(20);
// manager1.deleteProduct(1);
// manager1.deleteProduct(2);
// manager1.getProducts();
