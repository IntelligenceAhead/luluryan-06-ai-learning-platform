import { ProjectCover } from "@/components/project/ProjectCover";

/**
 * 项目详情页的作品预览区：第一屏优先展示作品本身。
 * 采用静态图集（主图 + 缩略图），不做过度动画。
 */
export function ProjectGallery({
  images,
  title,
  category,
  cover,
}: {
  images: string[];
  title: string;
  category: string;
  cover?: string | null;
}) {
  const gallery = images.length > 0 ? images : cover ? [cover] : [];

  if (gallery.length === 0) {
    return (
      <ProjectCover
        title={title}
        category={category}
        className="aspect-[16/10] rounded-2xl ring-1 ring-inset ring-line"
      />
    );
  }

  const [main, ...rest] = gallery;

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-inset ring-line">
        <img
          src={main}
          alt={`${title} 界面截图 1`}
          className="aspect-[16/10] w-full object-cover"
        />
      </div>
      {rest.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {rest.map((src, index) => (
            <div
              key={src}
              className="overflow-hidden rounded-xl bg-slate-100 ring-1 ring-inset ring-line"
            >
              <img
                src={src}
                alt={`${title} 界面截图 ${index + 2}`}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
