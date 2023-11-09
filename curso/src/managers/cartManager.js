
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
    // Obtener el carrito por su ID
    const carritoBuscado = await this.getCartById(cid);
  
    // Obtener el producto por su ID
    await this.productManager.getProductById(pid);
  
    // Buscar si el producto ya existe en el carrito
    const existingProduct = carritoBuscado.products.find(product => product.id === pid);
  
    if (existingProduct) {
      // Si el producto ya está en el carrito, aumenta la cantidad en 1
      existingProduct.cantidad++;
    } else {
      // Si el producto no está en el carrito, agrégalo con cantidad 1
      carritoBuscado.products.push({ id: pid, cantidad: 1 });
    }
  
    // Obtener la lista de carritos
    const arrayCarts = await this.fileSystem.getCart();
  
    // Actualizar el carrito en la lista
    const updatedCartArray = arrayCarts.map((cart) => {
      if (cart.id === cid) {
        return carritoBuscado;
      }
      return cart;
    });
  
    // Guardar la lista de carritos actualizada
    await this.fileSystem.saveCart(updatedCartArray);
  
    // Devolver el array de carritos actualizado
    return updatedCartArray;
  }
}
