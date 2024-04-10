import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CategoryPage = () => {
  const [categoryName, setcategoryName] = useState(" ");
  const [parentCategory, setParentCategory] = useState(" ");
  const [categories, setCategories] = useState<
    { categoryName: string; _id: any; parentCategory: any }[]
  >([]);

  useEffect(() => {
    fetchCategories();
  }, [categoryName || categories]);

  const fetchCategories = () => {
    axios
      .get("/api/categories")
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  const createCategory = async (event: any) => {
    event.preventDefault();
    const data = {
      categoryName,
      parentCategory: parentCategory || null, 
    };
    console.log(data);
    await axios.post("/api/categories", data);
    setcategoryName("");
  };
  
  return (
    <Layout className="relative">
      <h1 className="text-blue-900 text-xl mb-10 font-bold">
        Create a New Category
      </h1>{" "}
      <form onSubmit={createCategory} className="flex flex-col">
        <div className=" w-full">
          <Label htmlFor="CategoryName">Category Name</Label>
          <div className="w-full flex gap-2 items-center justify-start ">
            <Input
              className="w-2/3"
              type="text"
              onChange={(event) => {
                setcategoryName(event.target.value);
              }}
              value={categoryName}
              id="CategoryName"
              placeholder="Category name"
            />
            <Select
              onValueChange={(newValue) => {
                setParentCategory(newValue);
                console.log(newValue);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  className="text-gray-400"
                  placeholder="Parent Category"
                />
              </SelectTrigger>
              <SelectContent>
                {categories?.length > 0 &&
                  categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.categoryName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Button className=" bg-gray-800/90 ">Create New Category</Button>
          </div>
        </div>

        <Table>
          <TableCaption>A list of your categories.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Category Name</TableHead>
              <TableHead>Parent Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {category.categoryName}
                </TableCell>
                <TableCell>{category.parentCategory}</TableCell>
                {/* You can replace this with the actual method */}
                <TableCell className="text-right">Amount</TableCell>
                {/* You can replace this with the actual amount */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </form>
    </Layout>
  );
};

export default CategoryPage;
