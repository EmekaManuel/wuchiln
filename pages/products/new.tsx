import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NewProduct = () => {
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("In-Stock");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [marketPrice, setMarketPrice] = useState("");

  const [goToProductPage, setgoToProductPage] = useState(false);

  const createProduct = async (event: any) => {
    event.preventDefault();
    const data = {
      productName,
      description,
      price,
      marketPrice,
      status,
      images,
    };
    console.log(data);
    await axios.post("/api/products", data);
    setgoToProductPage(true);
  };

  const uploadImage = async (event: any) => {
    event.preventDefault();
    const files = event.target?.files;

    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      try {
        const response = await axios.post("/api/upload", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response.data);
        setImages((prevImages) => [...prevImages, ...response.data.images]);
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
  };

  if (goToProductPage) {
    router.push("/products");
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
        <Label
          htmlFor="productImages"
          className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="text-4xl text-gray-400">
            <UploadIcon height={40} width={40} />
          </div>
          <div className="mt-2 text-base leading-normal text-gray-600">
            Upload Image
          </div>
          <input
            type="file"
            id="productImages"
            className="hidden"
            onChange={uploadImage}
            multiple
          />
        </Label>

        {images.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {images.map((imageUrl, index) => (
              <Image
                key={index}
                src={imageUrl}
                width={30}
                height={30}
                alt={`Product Image ${index}`}
                className="w-24 h-24 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        <Button className="my-6 bg-gray-800/90 absolute right-10">
          Save New Product
        </Button>
      </form>
    </Layout>
  );
};

export default NewProduct;
