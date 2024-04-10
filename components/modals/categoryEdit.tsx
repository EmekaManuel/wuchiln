import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { CategoryData } from "@/lib/utils";
import Category from "@/models/category.model";

interface CategoryEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  category: CategoryData | null;
}

const CategoryEditModal: React.FC<CategoryEditModalProps> = ({
  isOpen,
  onClose,
  category,
}) => {
  const [editedCategory, setEditedCategory] = useState<CategoryData | null>(
    category
  );
  const [editedFields, setEditedFields] = useState<{ [key: string]: string }>(
    {}
  );
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEditedCategory(category);
    fetchCategories();
  }, [categories]);

  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    setEditedCategory((prevState) => ({
      ...prevState!,
      [id]: value,
    }));
    setEditedFields((prevFields) => ({
      ...prevFields,
      [id]: value,
    }));
  };

  const handleSelect = (value: string) => {
    setEditedCategory((prevState) => ({
      ...prevState!,
      parentCategory: value,
    }));
  };

  const handleSaveChanges = async () => {
    const combinedProduct = {
      ...editedCategory,
      ...editedFields,
    };

    const _id = category?._id;
    console.log("Combined product:", combinedProduct);

    try {
      setIsLoading(true);
      await axios.put(`/api/categories.api/`, { _id, ...combinedProduct });
      setIsLoading(false);
      toast({
        description: "✅ Category Edited Successfully!",
      });
      onClose();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const fetchCategories = () => {
    axios
      .get("/api/categories.api")
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription className="capitalize">
            Make changes to your Category here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Category Name
            </Label>
            <Input
              id="categoryName"
              onChange={handleChange}
              defaultValue={category?.categoryName}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Parent Category
            </Label>

            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.categoryName}{" "}
                    {/* Assuming parentCategory is a string */}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSaveChanges}>
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <p>save changes</p>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryEditModal;
