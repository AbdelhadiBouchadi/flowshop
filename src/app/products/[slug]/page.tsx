import { getProductBySlug } from "@/wix-api/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { getWixServerClient } from "@/lib/wix-client.server";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params;
  const wixServerClient = getWixServerClient();
  const product = await getProductBySlug(wixServerClient, slug);

  if (!product) notFound();

  const mainImage = product.media?.mainMedia?.image;
  return {
    title: product.name,
    description: "Get this products on Flow Shop",
    openGraph: {
      images: mainImage?.url
        ? [
            {
              url: mainImage.url,
              width: mainImage.width,
              height: mainImage.height,
              alt: mainImage.altText || "Product Image",
            },
          ]
        : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const wixServerClient = getWixServerClient();
  const product = await getProductBySlug(wixServerClient, slug);

  if (!product?._id) notFound();

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10 2xl:max-w-8xl">
      <ProductDetails product={product} />
    </main>
  );
}
