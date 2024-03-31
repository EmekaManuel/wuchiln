import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { PlusCircleIcon, EditIcon, TrashIcon } from "lucide-react"; // Import icons
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductData } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Products = () => {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    axios.get('/api/products').then(response => setProducts(response.data.data));
  }, []); 

  const router = useRouter();

  const handleAddProductClick = () => {
    router.push('/products/new');
  };

  function handleEditProduct(id: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Layout>
      <Button onClick={handleAddProductClick} variant='default' className=" px-2 gap-2 rounded-lg text-black hover:bg-gray-400 bg-gray-300"> <span><PlusCircleIcon size={20}/></span> Add New Product</Button>
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
          {products?.map((product, index=product._id) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{product?.productName}</TableCell>
              <TableCell>{product?.description}</TableCell>
              <TableCell>{product?.price}</TableCell>
              <TableCell className="">${product?.marketPrice}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <EditIcon size={20} className="cursor-pointer text-blue-500 hover:text-blue-700" onClick={() => handleEditProduct} />
                  <TrashIcon size={20} className="cursor-pointer text-red-500 hover:text-red-700" onClick={() => handleEditProduct} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  );
};

export default Products;
