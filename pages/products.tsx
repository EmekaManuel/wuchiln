import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";


const Products = () => {
  const router = useRouter();

  const handleAddProductClick = () => {
    router.push('/products/new');
  };

  return <Layout>
    <Button onClick={handleAddProductClick} variant='default' className="py-1 px-2 gap-2 rounded-lg text-black hover:bg-gray-400 bg-gray-300"> <span><PlusCircleIcon size={20}/></span> Add New Product</Button>
      </Layout>;
};

export default Products;
