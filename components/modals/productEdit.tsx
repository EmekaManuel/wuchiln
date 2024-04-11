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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductData } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader, UploadIcon } from "lucide-react";

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  product: ProductData | null;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [editedProduct, setEditedProduct] = useState<ProductData | null>(
    product
  );
  const [editedFields, setEditedFields] = useState<{ [key: string]: string }>(
    {}
  );

  const [editedImages, setEditedImages] = useState<string[]>(
    product?.images || []
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEditedProduct(product);
    setEditedImages(product?.images || []);
  }, [product]);

  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    setEditedProduct((prevState) => ({
      ...prevState!,
      [id]: value,
    }));
    setEditedFields((prevFields) => ({
      ...prevFields,
      [id]: value,
    }));
  };

  const handleAddImages = async (event: any) => {
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
        console.log("the response dot data", response.data);
        const newImages = await response.data.images;

        console.log("new images:", newImages);
        setEditedImages((prevImages) => [...prevImages, ...newImages]);
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
  };
  const handleSelect = (value: string) => {
    setEditedProduct((prevState) => ({
      ...prevState!,
      status: value,
    }));
  };

  const handleSaveChanges = async () => {
    const combinedProduct = {
      ...editedProduct,
      ...editedFields,
      images: editedImages,
    };

    const _id = product?._id;
    console.log("Combined product:", combinedProduct);

    try {
      setIsLoading(true);
      await axios.put(`/api/products.api/`, { _id, ...combinedProduct });
      setIsLoading(false);
      toast({
        description: "✅ Product Edited Successfully!",
      });
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription className="capitalize ">
            Make changes to your products here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="productName"
              onChange={handleChange}
              defaultValue={product?.productName}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              onChange={handleChange}
              defaultValue={product?.description}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              onChange={handleChange}
              defaultValue={product?.price}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="marketPrice" className="text-right">
              Market Price
            </Label>
            <Input
              id="marketPrice"
              onChange={handleChange}
              defaultValue={product?.marketPrice}
              className="col-span-3"
            />
          </div>
          {(product?.images?.length ?? 0) > 0 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="marketPrice" className="text-right">
                Product Images
              </Label>
              {editedImages?.map((image, index) => (
                <div key={index} className="w-100 h-100">
                  <Image
                    className="w-[120px] h-[80px] object-cover rounded-md"
                    src={image}
                    alt={`Product Image ${index}`}
                    width={100}
                    height={100}
                  />
                </div>
              ))}

              {editedImages?.length < 3 && (
                <Label
                  htmlFor="productImages"
                  className="w-full h-full bg-gray-300 rounded-md flex justify-center items-center cursor-pointer"
                >
                  <UploadIcon className="text-white" />
                  <input
                    type="file"
                    id="productImages"
                    className="hidden"
                    onChange={handleAddImages}
                    multiple
                  />
                </Label>
              )}
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Inventory Status{" "}
            </Label>

            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup id="status" defaultValue={product?.status}>
                  <SelectItem value="Out-Of-Stock">Out-Of-Stock</SelectItem>
                  <SelectItem value="In-Stock">In-Stock</SelectItem>
                  <SelectItem value="Re-Stocking">Re-Stocking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* <Input
              id="status"
              onChange={handleChange}
              defaultValue={product?.status}
              className="col-span-3"
            /> */}
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

export default ProductEditModal;
