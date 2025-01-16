import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-br from-primary/25 to-secondary",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
