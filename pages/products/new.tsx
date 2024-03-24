import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const NewProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [marketprice, setMarketprice] = useState("");

  return (
    <Layout className="relative">
      <h1 className="text-blue-900 text-xl mb-10 font-bold">
        Create a New Product
      </h1>
      <Label htmlFor="productname">Product Name</Label>
      <Input
        type="text"
        onChange={(event) => {
          setProductName(event.target.value);
        }}
        value={productName}
        id="productname"
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
      <Label htmlFor="marketprice">Market Price in NGN</Label>
      <Input
        type="number"
        id="marketprice"
        onChange={(event) => {
          setMarketprice(event.target.value);
        }}
        value={marketprice}
        placeholder="market price"
      />
      <Button className="my-6 bg-gray-800/90 absolute right-10">
        Save New Product
      </Button>
    </Layout>
  );
};

export default NewProduct;
