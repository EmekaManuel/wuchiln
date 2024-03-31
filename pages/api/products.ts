// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mongooseConnect } from "@/lib/mongoose";
import { ApiResponse, ProductData } from "@/lib/utils";
import Product from "@/models/product";
import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ProductData>>
) {
  if (req.method === "POST") {
    await mongooseConnect();
    try {
      const { productName, description, price, marketPrice }: ProductData =
        req.body;
      const createdProduct = await Product.create({
        
        productName,
        description,
        price,
        marketPrice,
      });
      res.status(201).json({ success: true, data: createdProduct });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === "GET") {
    await mongooseConnect();
    const products:ProductData = await Product.find().lean()
    res.status(200).json({success: true, data: products})


  }
}