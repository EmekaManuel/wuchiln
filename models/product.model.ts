import { Schema, model, Document, Model } from "mongoose";

interface IProduct extends Document {
  productName: string;
  description: string;
  price: number;
  marketPrice: number;
  status: string;
  images:string[]
}

const productSchema = new Schema<IProduct>({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  marketPrice: { type: Number, required: true },
  status: { type: String, required: true },
  images: {type: [String], required: true}
});

let ProductModel: Model<IProduct>;

try {
  ProductModel = model<IProduct>("Product");
} catch (error) {
  ProductModel = model<IProduct>("Product", productSchema);
}

export default ProductModel;
