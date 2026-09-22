import { categoryLabel } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FALLBACK_GRADIENTS: Record<string, string> = {
  ai: "from-brand-500 to-accent-500",
  code: "from-slate-600 to-brand-600",
  web: "from-warm-500 to-warm-700",
  game: "from-brand-600 to-accent-500",
  agent: "from-accent-500 to-brand-600",
};

/**
 * 项目封面。有图时直接展示图片（后续替换真实截图只需更新数据中的路径），
 * 无图时渲染一个清晰的项目占位封面，保证作品视觉始终成立。
 */
export function ProjectCover({
  src,
  title,
  category,
  className,
  imageClassName,
  eager = false,
}: {
  src?: string | null;
  title: string;
  category: string;
  className?: string;
  imageClassName?: string;
  eager?: boolean;
}) {
  return (
    <div
      className={cn("relative overflow-hidden bg-slate-100", className)}
      aria-hidden={!src}
    >
      {src ? (
        <img
          src={src}
          alt={`${title} 项目封面`}
          loading={eager ? "eager" : "lazy"}
          className={cn(
            "h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]",
            imageClassName,
          )}
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full flex-col justify-between bg-gradient-to-br p-5 transition-transform duration-300 ease-out group-hover:scale-[1.03]",
            FALLBACK_GRADIENTS[category] ?? FALLBACK_GRADIENTS.ai,
          )}
        >
          <span className="inline-flex w-fit rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur">
            {categoryLabel(category)}
          </span>
          <div>
            <p className="text-xs font-medium text-white/70">项目封面</p>
            <p className="mt-1 text-lg font-bold leading-snug text-white">
              {title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
