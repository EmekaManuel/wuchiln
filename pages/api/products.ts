import { mongooseConnect } from "@/lib/mongoose";
import { ApiResponse, ProductData } from "@/lib/utils";
import Product from "@/models/product";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ProductData>>
) {
  await mongooseConnect();

  switch (req.method) {
    case "POST":
      try {
        const { productName, description, price, marketPrice, status, images }: ProductData =
          req.body;

          console.log("body before sending", {productName, description, price, marketPrice, status, images})
        const createdProduct = await Product.create({
          productName,
          description,
          price,
          marketPrice,
          status,
          images
        });
        console.log(createdProduct)
        res.status(201).json({ success: true, data: createdProduct });
      } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case "GET":
      try {
        const products: ProductData = await Product.find().lean();
        res.status(200).json({ success: true, data: products });
      } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case "DELETE":
      try {
        const { _id } = req.body;
        console.log(req.body)
        const deleteProduct = await Product.findOneAndDelete({_id})
        console.log(deleteProduct)
        res.status(200).json({ success: true });

      } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case "PUT":
      try {
        const {
          _id,
          productName,
          description,
          price,
          marketPrice,
          status,
          images
        }: ProductData = req.body;
        const updatedProduct = await Product.updateOne(
          { _id },
          {
            productName,
            description,
            price,
            marketPrice,
            status,
            images
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
