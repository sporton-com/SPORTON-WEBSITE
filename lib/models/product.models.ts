import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  condition: { type: String, required: true, enum: ["new", "used"] },
  description: { type: String, trim: true },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const Product =
  mongoose.models?.Product || mongoose.model("Product", productSchema);

export default Product;
