import Layout from "@/components/layout";
import ProductEditModal from "@/components/modals/productEdit";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog";
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
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null
  );

  useEffect(() => {
    axios
      .get("/api/products")
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

  const handleSaveChanges = () => {
    setIsEditModalOpen(false);
  };

  return (
    <Layout>
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
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="">Amount</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">
                  {product?.productName}
                </TableCell>
                <TableCell>{product?.description}</TableCell>
                <TableCell>{product?.price}</TableCell>
                <TableCell className="">${product?.marketPrice}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <DialogTrigger>
                      <EditIcon
                        size={20}
                        className="cursor-pointer text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditProduct(product)}
                      />
                    </DialogTrigger>
                    <TrashIcon
                      size={20}
                      className="cursor-pointer text-red-500 hover:text-red-700"
                      onClick={() => handleEditProduct(product)}
                    />
                  </div>
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
      </Dialog>
    </Layout>
  );
};

export default Products;
