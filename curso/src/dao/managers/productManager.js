export default class ProductManager {
    constructor(fileSystem) {
        this.fileSystem = fileSystem;
    }

    async createProduct (prod) {
        const arrayProducts = await this.fileSystem.getProducts()
        prod.id = arrayProducts.length
        arrayProducts.push(prod)
        await this.fileSystem.saveProduct(arrayProducts)
    }

    async getProducts (limit = null) {
        if (!limit) return await this.fileSystem.getProducts()
        const arrayProducts = await this.fileSystem.getProducts()
        return arrayProducts.slice(0, limit);
    }


    async getProductById (id) {
        const productsArray = await this.fileSystem.getProducts()
        const prodBuscado = productsArray.find((prod) => prod.id === id);
        if (prodBuscado) return prodBuscado
        throw new Error("no se encontro el producto buscado");

    }

    async updateProduct (id, nuevoDato) {
        const productsArray = await this.fileSystem.getProducts()
        const indice = productsArray.findIndex(elemento => elemento.id === id);
        if (indice !== -1) {
            const objetoOriginal = productsArray[indice];
            const datoActualizado = { ...objetoOriginal, ...nuevoDato };
            productsArray[indice] = datoActualizado;
            await this.fileSystem.saveProduct(productsArray)
        } else {
            throw new Error("no existe el producto");
        }
    }

    async deleteProduct (id) {
        const productsArray = await this.getProducts();
        const newProductsArray = productsArray.filter(elemento => elemento.id !== id);
        await this.fileSystem.saveProduct(newProductsArray)
        return newProductsArray;
    }
}
