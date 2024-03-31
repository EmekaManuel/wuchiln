import { Schema, model, Document, Model } from "mongoose";

interface IProduct extends Document {
  productName: string;
  description: string;
  price: number;
  marketPrice: number;
}

const productSchema = new Schema<IProduct>({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  marketPrice: { type: Number, required: true },
});

let ProductModel: Model<IProduct>;

try {
  ProductModel = model<IProduct>("Product")
} catch (error) {
  ProductModel = model<IProduct>("Product", productSchema)

}

export default ProductModel