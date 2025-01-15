import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/logo2.png";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import ShoppingCartButton from "./ShoppingCartButton";

const Navbar = async () => {
  const cart = await getCart(getWixServerClient());

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-border bg-background/75 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5 2xl:max-w-8xl">
        <Link href="/" className="flex items-center gap-5">
          <Image src={logo} alt="Flow Shop Logo" width={40} height={40} />
          <span className="text-xl font-bold text-primary">Flow Shop</span>
        </Link>
        <ShoppingCartButton initialData={cart} />
      </div>
    </header>
  );
};

export default Navbar;
