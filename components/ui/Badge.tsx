import { cn } from "@/lib/utils";

type BadgeVariant = "brand" | "accent" | "warm" | "muted" | "success";

const styles: Record<BadgeVariant, string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-200",
  accent: "bg-accent-100 text-accent-700 ring-accent-300",
  warm: "bg-warm-100 text-warm-700 ring-warm-300",
  muted: "bg-slate-100 text-ink-soft ring-line",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export function Badge({
  children,
  variant = "muted",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
