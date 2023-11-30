
export default class CartManager {
    constructor(fileSystem, productManager) {
        this.fileSystem = fileSystem;
        this.productManager = productManager
    }

  async createCart() {
    const arrayCart = await this.fileSystem.getCart();
    arrayCart.push({ products: [], id: arrayCart.length + 1 });
    await this.fileSystem.saveCart(arrayCart);
    return { products: [], id: arrayCart.length }
  }

  async getCartById(id) {
    const cartsArray = await this.fileSystem.getCart();
    const cartBuscado = cartsArray.find(cart => cart.id === id);
    if (cartBuscado) {
      return cartBuscado;
    } else {
      throw new Error("no se encontro el carrito buscado");
    }
  }

  async addProductToCart(cid, pid) {
    const carritoBuscado = await this.getCartById(cid);
  
    await this.productManager.getProductById(pid);

    const existingProduct = carritoBuscado.products.find(product => product.id === pid);
  
    if (existingProduct) {
      existingProduct.cantidad++;
    } else {
      carritoBuscado.products.push({ id: pid, cantidad: 1 });
    }
  

    const arrayCarts = await this.fileSystem.getCart();
  

    const updatedCartArray = arrayCarts.map((cart) => {
      if (cart.id === cid) {
        return carritoBuscado;
      }
      return cart;
    });
  

    await this.fileSystem.saveCart(updatedCartArray);
  

    return updatedCartArray;
  }
}
