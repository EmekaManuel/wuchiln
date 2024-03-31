import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductData } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  product: any;
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

  const { toast } = useToast()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSaveChanges = async () => {
    const combinedProduct = {
      ...editedProduct,
      ...editedFields,
    };

    const _id = product?._id;
    console.log("Combined product:", combinedProduct);

    try {
      await axios.put(`/api/products/`, { _id, ...combinedProduct });
      toast({
        description: "✅ Product Edited Successfully!",
      })
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
          <DialogDescription>
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
        </div>
        <DialogFooter>
          <Button onClick={handleSaveChanges}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductEditModal;
