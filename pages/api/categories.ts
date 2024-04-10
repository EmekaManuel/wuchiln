import { mongooseConnect } from "@/lib/mongoose";
import { ApiResponse, CategoryData } from "@/lib/utils";
import Category from "@/models/category";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<CategoryData>>
) {
  await mongooseConnect();

  switch (req.method) {
    case "POST":
      try {
        const { categoryName, parentCategory }: CategoryData = req.body;
        console.log("body before sending", { categoryName, parentCategory });
        
        const categoryData: Partial<CategoryData> = {
          categoryName,
          ...(parentCategory && { parentCategory }), 
        };
    
        const createdProduct = await Category.create(categoryData);
        console.log(createdProduct);
        res.status(201).json({ success: true, data: createdProduct });
      } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case "GET":
      try {
        const category: CategoryData = await Category.find().populate('parentCategory').lean();
        res.status(200).json({ success: true, data: category });
      } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case "DELETE":
      try {
        const { _id } = req.body;
        console.log(req.body);
        const deleteProduct = await Category.findOneAndDelete({ _id });
        console.log(deleteProduct);
        res.status(200).json({ success: true });
      } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case "PUT":
      try {
        const { _id, categoryName }: CategoryData = req.body;
        const updatedProduct = await Category.updateOne(
          { _id },
          {
            categoryName,
          },
          { new: true }
        );

        if (updatedProduct) {
          res.status(200).json({ success: true });
        } else {
          res.status(404).json({ success: false, error: "Product not found" });
        }
      } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
