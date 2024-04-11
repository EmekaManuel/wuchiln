import ConfirmationDialog from "@/components/alerts/deleteConfirmation";
import Layout from "@/components/layout";
import ProductEditModal from "@/components/modals/productEdit";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductData } from "@/lib/utils";
import axios from "axios";
import { EditIcon, PlusCircleIcon, TrashIcon } from "lucide-react"; // Import icons
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null
  );

  useEffect(() => {
    axios
      .get("/api/products.api")
      .then((response) => setProducts(response.data.data));
  }, [products]);

  const router = useRouter();

  const handleAddProductClick = () => {
    router.push("/products/new");
  };

  const handleEditProduct = (product: ProductData) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = (product: ProductData) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleSaveChanges = () => {
    setIsEditModalOpen(false);
  };

  function handleConfirmDelete(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Layout>
      <AlertDialog>
        <Dialog>
          <Button
            onClick={handleAddProductClick}
            variant="default"
            className=" px-2 gap-2 rounded-lg text-black hover:bg-gray-400 bg-gray-300"
          >
            <span>
              <PlusCircleIcon size={20} />
            </span>
            Add New Product
          </Button>
          <Table className="mt-5">
            <TableCaption>A list of your products inventory.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Product name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Market Price</TableHead>
                <TableHead className="">Amount</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium capitalize">
                    {product?.productName}
                  </TableCell>
                  <TableCell className="font-medium capitalize">
                    {product?.description}
                  </TableCell>
                  <TableCell className="font-medium capitalize">
                    &#x20A6;{product?.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-medium capitalize">
                    &#x20A6;{product?.marketPrice.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <DialogTrigger>
                        <EditIcon
                          size={20}
                          className="cursor-pointer text-blue-500 hover:text-blue-700"
                          onClick={() => handleEditProduct(product)}
                        />
                      </DialogTrigger>
                      <AlertDialogTrigger>
                        <TrashIcon
                          size={20}
                          className="cursor-pointer text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteProduct(product)}
                        />
                      </AlertDialogTrigger>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium capitalize">
                    <Badge
                      variant={
                        product?.status === "In-Stock"
                          ? "inprogress"
                          : product?.status === "Re-Stocking"
                          ? "pending"
                          : product?.status === "Out-Of-Stock"
                          ? "destructive"
                          : "default"
                      }
                    >
                      {product?.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <ProductEditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveChanges}
            product={selectedProduct}
          />

          {isDeleteModalOpen && (
            <ConfirmationDialog
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              resourceType="product"
              onConfirm={handleConfirmDelete}
              title="Delete Product"
              description={`${selectedProduct?.productName}`.toUpperCase()}
              cancelText="Cancel"
              confirmText="Delete"
              product={selectedProduct}
            />
          )}
        </Dialog>
      </AlertDialog>
    </Layout>
  );
};

export default Products;
