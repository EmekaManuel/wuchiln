import Link from "next/link";
import { useRouter } from "next/router";
import AppLogo from "./logo";
import {
  BoxIcon,
  CogIcon,
  HomeIcon,
  ListIcon,
  MessageCircleCode,
  SquareStack,
} from "lucide-react";

const Nav = () => {
  const router = useRouter();

  const isActiveLink = (href: string) => {
    return router.pathname === href
      ? "bg-white text-blue-900 rounded-l-lg"
      : "";
  };

  return (
    <aside className="text-black p-6 pr-0">
      <Link href="/" className="gap-1 mb-10 mr-4 flex">
        <AppLogo />
      </Link>
      <nav className="flex-col flex gap-5">
        <Link
          href="/dashboard"
          className={`flex gap-2 p-1 ${isActiveLink("/dashboard")}`}
        >
          <HomeIcon />
          Dashboard
        </Link>
        <Link
          href="/products"
          className={`flex gap-2 p-1 ${isActiveLink("/products")}`}
        >
          <BoxIcon />
          Products
        </Link>
        <Link
          href="/categories"
          className={`flex gap-2 p-1 ${isActiveLink("/categories")}`}
        >
          <SquareStack />
          Category
        </Link>
        <Link
          href="/orders"
          className={`flex gap-2 p-1 ${isActiveLink("/orders")}`}
        >
          <ListIcon />
          Orders
        </Link>
        <Link
          href="/settings"
          className={`flex gap-2 p-1 ${isActiveLink("/settings")}`}
        >
          <CogIcon />
          Settings
        </Link>
        <Link
          href="/support"
          className={`flex gap-2 p-1 ${isActiveLink("/support")}`}
        >
          <MessageCircleCode />
          Support
        </Link>
      </nav>
    </aside>
  );
};

export default Nav;
