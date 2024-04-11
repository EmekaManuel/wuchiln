import { mongooseConnect } from "@/lib/mongoose";
import { ApiResponse } from "@/lib/utils";
import Category from "@/models/category.model";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<any>>
) {
  await mongooseConnect();

  switch (req.method) {
    case "POST":
      try {
        const { categoryName, parentCategory } = req.body;
        console.log("body before sending", { categoryName, parentCategory });

        const categoryData: Partial<any> = {
          categoryName,
          ...(parentCategory && { parentCategory }),
        };

        const createdCategory = await Category.create(categoryData);
        console.log("created category", createdCategory);
        res.status(201).json({ success: true, data: createdCategory });
      } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case "GET":
      try {
        const category: any = await Category.find().populate("parentCategory");
        res.status(200).json({ success: true, data: category });
      } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case "DELETE":
      try {
        const { _id } = req.body;
        console.log("this", _id);
        console.log(req.body);
        const deletedCategory = await Category.findOneAndDelete({ _id });
        console.log("deleted category", deletedCategory);
        res.status(200).json({ success: true });
      } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case "PUT":
      try {
        const { _id, categoryName, parentCategory }: any = req.body;
        console.log("body before sending", { categoryName, parentCategory });

        const updatedCategory = await Category.updateOne(
          { _id },
          {
            categoryName,
            parentCategory,
          },
          { new: true }
        );

        if (updatedCategory) {
          res.status(200).json({ success: true });
        } else {
          res.status(404).json({ success: false, error: "Category not found" });
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
