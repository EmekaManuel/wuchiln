import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  return <Layout>
    <div className="text-blue-900 flex justify-between">
      <h2>Hello <b>{session?.user?.name}</b> </h2>
      <div className="flex items-center bg-gray-300 text-black gap-1 text-black rounded-lg overflow-hidden">
        <Image alt="" className="w-8 h-8" width={8} height={8} src={session?.user?.image ?? ''}
        />
        <span className="px-2">{session?.user?.name}</span>

      </div>
    </div>
  </Layout>;
};

export default Dashboard;
