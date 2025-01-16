"use client";

import SearchField from "@/components/shared/SearchField";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import UserButton from "@/components/shared/UserButton";
import { twConfig } from "@/lib/utils";
import { members } from "@wix/members";
import { collections } from "@wix/stores";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/app/assets/logo2.png";

interface MobileMenuProps {
  collections: collections.Collection[];
  loggedInMember: members.Member | null;
}

export default function MobileMenu({
  collections,
  loggedInMember,
}: MobileMenuProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > parseInt(twConfig.theme.screens.lg)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className="inline-flex lg:hidden [&_svg]:size-5"
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon className="size-5 text-primary" />
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="left"
          className="w-full bg-gradient-to-br from-primary/25 to-secondary"
        >
          <SheetHeader>
            <SheetTitle>
              <Link href="/" className="flex items-center justify-center gap-4">
                <Image src={logo} alt="Flow Shop logo" width={40} height={40} />
                <span className="text-3xl font-bold text-primary">
                  Flow Shop
                </span>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col items-center space-y-10 py-10">
            <SearchField className="w-full" />
            <ul className="flex-grow space-y-5 text-center text-lg">
              <li>
                <Link href="/shop" className="font-semibold hover:underline">
                  Shop
                </Link>
              </li>
              {collections.map((collection) => (
                <li key={collection._id}>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="font-semibold hover:underline"
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}
              <li>
                <UserButton
                  loggedInMember={loggedInMember}
                  className="p-4 [&_svg]:size-8 [&_svg]:font-extrabold"
                />
              </li>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
