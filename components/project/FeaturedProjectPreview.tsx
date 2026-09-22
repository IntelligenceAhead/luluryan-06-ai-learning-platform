import Link from "next/link";
import { ProjectCover } from "@/components/project/ProjectCover";
import { Badge } from "@/components/ui/Badge";
import { EyeIcon, HeartIcon } from "@/components/ui/icons";
import { categoryLabel, statusLabel } from "@/lib/constants";
import { displayAuthor, formatCount, projectImages } from "@/lib/utils";
import type { Project } from "@/lib/projects";

/** Hero 右侧的精选项目预览：第一屏就能看到真实学生作品。 */
export function FeaturedProjectPreview({ project }: { project: Project }) {
  const { cover } = projectImages(project);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-3xl bg-surface ring-1 ring-inset ring-line shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-brand-200"
    >
      <div className="relative">
        <ProjectCover
          src={cover}
          title={project.title}
          category={project.category}
          className="aspect-[16/10]"
          eager
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm backdrop-blur">
          本周精选作品
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <Badge variant="brand">{categoryLabel(project.category)}</Badge>
          <Badge
            variant={project.status === "completed" ? "success" : "accent"}
          >
            {statusLabel(project.status)}
          </Badge>
        </div>

        <h2 className="mt-3 text-xl font-semibold text-ink group-hover:text-brand-700">
          {project.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.excerpt ?? project.summary}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
          <span className="truncate">{displayAuthor(project)}</span>
          <span className="inline-flex shrink-0 items-center gap-3 text-ink-soft">
            <span className="inline-flex items-center gap-1" title="浏览量">
              <EyeIcon />
              {formatCount(project.viewCount)}
            </span>
            <span
              className="inline-flex items-center gap-1 text-rose-500"
              title="喜欢"
            >
              <HeartIcon />
              {formatCount(project.voteCount)}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
