import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const NewProduct = () => {
  const router  = useRouter()
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [goToProductPage, setgoToProductPage] = useState(false)

  const createProduct = async (event:any) => {
    event.preventDefault()
    const data = { productName, description, price, marketPrice };
    await axios.post("/api/products", data);
    setgoToProductPage(true)

  };

  if(goToProductPage) {
    router.push("/products")
  }

  return (
    <Layout className="relative">
      <h1 className="text-blue-900 text-xl mb-10 font-bold">
        Create a New Product
      </h1>
      <form onSubmit={createProduct}>
        <Label htmlFor="productName">Product Name</Label>
        <Input
          type="text"
          onChange={(event) => {
            setProductName(event.target.value);
          }}
          value={productName}
          id="productName"
          placeholder="product name"
        />
        <Label htmlFor="description">Product Description</Label>
        <Textarea
          id="description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          value={description}
          placeholder="description"
        />
        <Label htmlFor="price">Price in NGN</Label>
        <Input
          type="number"
          id="price"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
          value={price}
          placeholder="price"
        />
        <Label htmlFor="MarketPrice">Market Price in NGN</Label>
        <Input
          type="number"
          id="MarketPrice"
          onChange={(event) => {
            setMarketPrice(event.target.value);
          }}
          value={marketPrice}
          placeholder="market price"
        />
        <Button className="my-6 bg-gray-800/90 absolute right-10">
          Save New Product
        </Button>
      </form>
    </Layout>
  );
};

export default NewProduct;
