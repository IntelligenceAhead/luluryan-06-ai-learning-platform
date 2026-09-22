import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-surface ring-1 ring-inset ring-line shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
