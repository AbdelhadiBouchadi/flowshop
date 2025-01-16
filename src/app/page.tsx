import Image from "next/image";
import banner from "@/app/assets/banner.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Product from "@/components/shared/Product";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";
import { getWixServerClient } from "@/lib/wix-client.server";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10 2xl:max-w-8xl">
      <div className="flex items-center rounded-md bg-secondary shadow-sm dark:bg-background md:h-96">
        <div className="space-y-7 p-10 text-center md:w-1/2">
          <h1 className="text-3xl font-bold text-primary md:text-4xl">
            Fill The Void In Your Heart
          </h1>
          <p className="text-lg text-muted-foreground">
            Tough day? Credit card maxed out? Buy some expensive stuff and
            become happy again!
          </p>
          <Button asChild>
            <Link href="/shop" className="group">
              Shop Now{" "}
              <ArrowRight className="ml-2 size-5 transition-all duration-300 group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
        <div className="relative hidden h-full w-1/2 md:block">
          <Image
            src={banner}
            alt="Flow Shop Banner"
            className="h-full rounded-r-md object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/35 to-transparent dark:from-background dark:via-background/35" />
        </div>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}

async function FeaturedProducts() {
  const wixClient = getWixServerClient();

  const collection = await getCollectionBySlug(wixClient, "featured-products");

  if (!collection?._id) {
    return null;
  }

  const featuredProducts = await queryProducts(wixClient, {
    collectionIds: collection._id,
  });

  if (!featuredProducts.items.length) {
    return null;
  }

  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold text-primary">Featured Products</h2>
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.items.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <>
      <div className="h-10 w-64 animate-pulse rounded-md bg-gradient-to-br from-primary/25 to-secondary" />
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-[26rem] w-full" />
        ))}
      </div>
    </>
  );
}
