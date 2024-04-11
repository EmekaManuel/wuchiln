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
import { CategoryData } from "@/lib/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { EditIcon, TrashIcon } from "lucide-react";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import ProductEditModal from "@/components/modals/productEdit";
import ConfirmationDialog from "@/components/alerts/deleteConfirmation";
import CategoryEditModal from "@/components/modals/categoryedit";

const CategoryPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedCategory, setEditedCategory] = useState<CategoryData | null>(
    null
  );
  const [categoryName, setcategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState<string | null>("");
  const [categories, setCategories] = useState<CategoryData[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(
    null
  );

  useEffect(() => {
    fetchCategories();
  }, [categoryName || categories || parentCategory]);

  const fetchCategories = () => {
    axios
      .get("/api/categories.api")
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  const createCategory = async (event: any) => {
    event.preventDefault();
    const data = {
      categoryName,
      parentCategory: parentCategory || null,
    };
    console.log("create category", data);
    await axios.post("/api/categories.api", data);
    setcategoryName("");
    setParentCategory(null);
  };

  const handleDeleteCategory = (category: CategoryData) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleEditCategory = (category: CategoryData) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  function handleConfirmDelete(): void {
    throw new Error("Function not implemented.");
  }

  const handleSaveChanges = () => {
    setIsEditModalOpen(false);
  };

  return (
    <Layout className="relative">
      <AlertDialog>
        <Dialog>
          <h1 className="text-blue-900 text-xl mb-10 font-bold">
            {editedCategory
              ? `Edit Category ${editedCategory?.categoryName}`
              : "Create New Category"}
          </h1>
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
                      categories.map(
                        (category) =>
                          (parentCategory !== null ||
                            category._id !== parentCategory) && (
                            <SelectItem key={category._id} value={category._id}>
                              {category.categoryName}
                            </SelectItem>
                          )
                      )}
                  </SelectContent>
                </Select>

                <Button className=" bg-gray-800/90 ">
                  Create New Category
                </Button>
              </div>
            </div>

            <Table>
              <TableCaption>A list of your categories.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Category Name</TableHead>
                  <TableHead>Parent Category</TableHead>
                  <TableHead className="">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {category.categoryName}
                    </TableCell>
                    <TableCell>
                      {category.parentCategory?.categoryName}
                    </TableCell>
                    {/* You can replace this with the actual method */}
                    <TableCell>
                      <div className="flex space-x-2">
                        <EditIcon
                          size={20}
                          className="cursor-pointer text-blue-500 hover:text-blue-700"
                          onClick={() => handleEditCategory(category)}
                        />
                        <AlertDialogTrigger>
                          <TrashIcon
                            size={20}
                            className="cursor-pointer text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteCategory(category)}
                          />
                        </AlertDialogTrigger>
                      </div>
                    </TableCell>
                    {/* You can replace this with the actual amount */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </form>

          <CategoryEditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveChanges}
            category={selectedCategory}
          />

          {isDeleteModalOpen && (
            <ConfirmationDialog
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              resourceType="category"
              onConfirm={handleConfirmDelete}
              title="Delete Category"
              description={`${selectedCategory?.categoryName}`.toUpperCase()}
              cancelText="Cancel"
              confirmText="Delete"
              category={selectedCategory}
            />
          )}
        </Dialog>
      </AlertDialog>
    </Layout>
  );
};

export default CategoryPage;
