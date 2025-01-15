import { wixBrowserClient } from "@/lib/wix-client.browser";
import { addToCart, AddToCartProps, getCart } from "@/wix-api/cart";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { useToast } from "./use-toast";

const queryKey: QueryKey = ["cart"];

export function useCart(initialData: currentCart.Cart | null) {
  return useQuery({
    queryKey,
    queryFn: () => getCart(wixBrowserClient),
    initialData,
  });
}

export function useAddItemToCart() {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: AddToCartProps) => addToCart(wixBrowserClient, values),
    onSuccess(data) {
      toast({
        title: "Success",
        variant: "success",
        description: "Item added to cart successfully",
      });
      queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey, data.cart);
    },
    onError(error) {
      console.error(error);
      toast({
        title: "Something went wrong!",
        variant: "destructive",
        description: "Failed to add item to cart. Please try again.",
      });
    },
  });
}
