import { useCartCheckout } from "@/hooks/checkout";
import LoadingButton from "./LoadingButton";
import { ButtonProps } from "../ui/button";
import { Wallet } from "lucide-react";

export default function CheckoutButton(props: ButtonProps) {
  const { startCheckoutFlow, pending } = useCartCheckout();

  return (
    <LoadingButton onClick={startCheckoutFlow} loading={pending} {...props}>
      Checkout
      <Wallet className="size-5 transition-all duration-300 group-hover:translate-x-2" />
    </LoadingButton>
  );
}
