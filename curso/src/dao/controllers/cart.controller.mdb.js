
import cartModel from '../models/cart.model.js'
export class CartController {
    constructor() {
    }

    async getCarts() {
        try {
            // path: elemento a completar
            return await cartModel.find().lean()
            // Podemos intercalar el método populate() para "completar" el array products.
            // De esta forma, en lugar de aparecer los id en la consulta, aparecerán los datos
            // completos de cada producto.
            // Se puede realizar el populate aquí o directamente en el modelo (ver cart.model.js)
            // return await cartModel.find().populate({ path: 'products', model: productModel }).lean();
        } catch (e) {
            return e.message
        }
        
    }
}