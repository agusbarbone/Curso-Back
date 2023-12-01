
import cartModel from '../models/cart.model.js'
export class CartController {
    constructor() {
    }

    async getCarts() {
        try {
            return await cartModel.find().lean()
        } catch (e) {
            return e.message
        }
        
    }
}