import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/logo2.png";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import ShoppingCartButton from "./ShoppingCartButton";
import UserButton from "./UserButton";
import { getLoggedInMember } from "@/wix-api/members";
import { getCollections } from "@/wix-api/collections";
import MainNavigation from "./MainNavigation";
import SearchField from "./SearchField";
import { Suspense } from "react";
import MobileMenu from "./MobileMenu";

const Navbar = async () => {
  const wixClient = getWixServerClient();

  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    getCollections(wixClient),
  ]);

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-border bg-background/85 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5 2xl:max-w-8xl">
        <Suspense>
          <MobileMenu
            collections={collections}
            loggedInMember={loggedInMember}
          />
        </Suspense>
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/" className="flex items-center gap-4">
            <Image src={logo} alt="Flow Shop logo" width={40} height={40} />
            <span className="text-xl font-bold text-primary">Flow Shop</span>
          </Link>
          <MainNavigation
            collections={collections}
            className="hidden lg:flex"
          />
        </div>
        <SearchField className="hidden max-w-96 lg:inline" />
        <div className="flex items-center justify-center gap-2">
          <UserButton
            loggedInMember={loggedInMember}
            className="[&_svg]:size-5 [&_svg]:font-extrabold"
          />
          <div className="h-8 w-0.5 bg-primary" />
          <ShoppingCartButton initialData={cart} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
