import mongoose from "mongoose";
import productModel from "../models/cart.model.js";

mongoose.pluralize(null);

const collection = "carts";

const schema = new mongoose.Schema({
  products: { type: [mongoose.Schema.Types.ObjectId], ref: "products" },
  total: { type: Number, required: true },
});
schema.pre("find", function () {
  this.populate({ path: "products", model: productModel });
});

export default mongoose.model(collection, schema);