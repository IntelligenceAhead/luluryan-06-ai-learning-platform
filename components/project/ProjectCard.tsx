import Link from "next/link";
import { ProjectCover } from "@/components/project/ProjectCover";
import { Badge } from "@/components/ui/Badge";
import { EyeIcon, HeartIcon } from "@/components/ui/icons";
import { categoryLabel, statusLabel } from "@/lib/constants";
import { formatDateShort, projectImages } from "@/lib/utils";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const { cover } = projectImages(project);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-inset ring-line shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-brand-200"
    >
      <ProjectCover
        src={cover}
        title={project.title}
        category={project.category}
        className="aspect-[16/10]"
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="brand">{categoryLabel(project.category)}</Badge>
          <Badge
            variant={project.status === "completed" ? "success" : "accent"}
          >
            {statusLabel(project.status)}
          </Badge>
        </div>

        <h3 className="mt-4 text-lg font-semibold text-ink group-hover:text-brand-700">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {project.excerpt ?? project.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-ink-soft"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-2 border-t border-line pt-4 text-xs text-muted">
          <span className="truncate">
            {project.authorIsAnonymous ? "匿名同学" : project.authorDisplay} ·{" "}
            {formatDateShort(project.createdAt)}
          </span>
          <span className="inline-flex shrink-0 items-center gap-3 text-ink-soft">
            <span
              className="inline-flex items-center gap-1"
              title="浏览量"
            >
              <EyeIcon />
              {project.viewCount}
            </span>
            <span
              className="inline-flex items-center gap-1 text-rose-500"
              title="喜欢"
            >
              <HeartIcon />
              {project.voteCount}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
