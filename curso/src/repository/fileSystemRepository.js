import fs from "fs";
import { __dirname } from "../utils.js";

export class FileSystemRepository {
    constructor() {
        this.cartpath = `${__dirname}data\\cart.json`
        this.productpath = `${__dirname}data\\products.json`
    }

    async getCart () {
        const content = await fs.promises.readFile(this.cartpath, { encoding: "utf-8" });
        return await JSON.parse(content)
    }

    async getProducts () {
        const content = await fs.promises.readFile(this.productpath, { encoding: "utf-8" });
        return await JSON.parse(content)
    }

    async saveCart (updatedCartArray) {
        const cartJson = JSON.stringify(updatedCartArray)
        await fs.promises.writeFile(this.cartpath, cartJson, (error) => {
            if (error) throw new Error("No se pudo crear el carrito")
        })
    }

    async saveProduct (arrayProducts) {
        const objJson = JSON.stringify(arrayProducts)
        await fs.promises.writeFile(this.productpath, objJson, (error) => {
            if (error) throw new Error("No se pudo crear el product")           
        })
    }
}