import mongoose, { Schema, model, Document, Model } from "mongoose";

export interface ICategory extends Document {
  categoryName: string;
  parentCategory?: mongoose.Types.ObjectId;
}

const categorySchema = new Schema<ICategory>({
  categoryName: { type: String, required: true },
  parentCategory: { type: mongoose.Types.ObjectId, ref: "Category" },
});

let CategoryModel: Model<ICategory>;

try {
  CategoryModel = model<ICategory>("Category");
} catch (error) {
  CategoryModel = model<ICategory>("Category", categorySchema);
}

export default CategoryModel;
