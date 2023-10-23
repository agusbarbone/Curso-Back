import fs from "fs"

class ProductManager {
  static cantidadDeProductos = 0;
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const prodRepetido = this.products.find((prod) => prod.code === code);
    if (
      title &&
      description &&
      price &&
      thumbnail &&
      code &&
      stock &&
      !prodRepetido
    ) {
      ProductManager.cantidadDeProductos++;

      const newProduct = {
        id: ProductManager.cantidadDeProductos,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      };

      this.products.push(newProduct);
      console.log("producto aniadido");
    } else {
      console.log(
        "no se puede agregar el producto por falta de campos o code repetido"
      );
    }
  }

  getProducts() {
    this.products.forEach((prod) => console.log(prod));
  }

  getProductById(id) {
    const prodBuscado = this.products.find((prod) => prod.id === id);

    if (prodBuscado) {
      console.log(prodBuscado);
    } else {
      console.log("ID Not Found!");
    }
  }
}

const prod = new ProductManager();

prod.getProducts();
prod.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  1200,
  "Sin imagen",
  "abc123",
  25
);
prod.getProducts();
prod.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  1200,
  "Sin imagen",
  "abc123",
  25
);
prod.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  1200,
  "Sin imagen"
);
prod.getProductById(1);
prod.getProductById(2);
