"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { collections } from "@wix/stores";
import { Boxes, ShoppingBag, Store } from "lucide-react";
import Link from "next/link";

interface MainNavigationProps {
  collections: collections.Collection[];
  className?: string;
}

export default function MainNavigation({
  collections,
  className,
}: MainNavigationProps) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        <NavigationMenuItem className="text-primary">
          <Link href="/shop" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Store className="mr-2 size-5" />
              Shop
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="text-primary">
          <NavigationMenuTrigger>
            <Boxes className="mr-2 size-5" />
            Collections
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="p-4 text-primary">
              {collections.map((collection) => (
                <li key={collection._id}>
                  <Link
                    href={`/collections/${collection.slug}`}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full justify-start whitespace-nowrap",
                      )}
                    >
                      <ShoppingBag className="mr-2 size-5" />
                      {collection.name}
                    </NavigationMenuLink>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
