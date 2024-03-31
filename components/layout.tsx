import Nav from "@/components/nav";
import { Button } from "@/components/ui/button";

import { signIn, useSession } from "next-auth/react";

export default function Layout({ children }: any) {
  const { data: session, status } = useSession();

  if (
    status === "authenticated" &&
    session?.user?.email === "marrnuel123@gmail.com"
  ) {
    return (
      <div className="bg-gray-200 w-screen h-screen flex">
        <Nav />
        <div className="bg-white flex-grow mt-2 mr-2 p-4 mb-2 rounded relative rounded-large">
          {children}
        </div>
      </div>
    );
  }

  if (
    status === "authenticated" &&
    session?.user?.email !== "marrnuel123@gmail.com"
  ) {
    return (
      <div className="bg-blue-500 w-screen h-screen flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold mb-3">Hello Stranger!</h1>
        <p className="text-lg mb-6 capitalize">
          You do not have access to this page{" "}
        </p>
        <div>
          <Button
            onClick={() => signIn("google")}
            variant="secondary"
            size="default"
          >
            Contact The Admin
          </Button>
        </div>
      </div>
    );
  }

  // return <a href="/api/auth/signin">Sign in</a>

  return (
    <div className="bg-blue-500 w-screen h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-bold mb-3">Welcome Finnih!</h1>
      <p className="text-lg mb-6 capitalize">Login to access your dashboard</p>
      <div>
        <Button
          onClick={() => signIn("google")}
          variant="secondary"
          size="default"
        >
          Login with Google
        </Button>
      </div>
    </div>
  );
}
