import Link from "next/link";
import type { Metadata } from "next";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CATEGORIES, STATUSES } from "@/lib/constants";
import { getPublishedProjects, type ProjectFilter } from "@/lib/projects";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "学生作品",
  description: "浏览学生们的 AI 项目作品，按分类、状态与喜欢数探索。",
};

type SearchParams = {
  category?: string;
  status?: string;
  sort?: string;
};

function buildHref(params: SearchParams, patch: SearchParams) {
  const merged = { ...params, ...patch };
  const search = new URLSearchParams();
  if (merged.category && merged.category !== "all")
    search.set("category", merged.category);
  if (merged.status && merged.status !== "all")
    search.set("status", merged.status);
  if (merged.sort && merged.sort !== "latest") search.set("sort", merged.sort);
  const query = search.toString();
  return query ? `/projects?${query}` : "/projects";
}

function FilterPills({
  options,
  active,
  params,
  paramKey,
}: {
  options: { value: string; label: string }[];
  active: string;
  params: SearchParams;
  paramKey: keyof SearchParams;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = active === option.value;
        return (
          <Link
            key={option.value}
            href={buildHref(params, { [paramKey]: option.value })}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ring-inset transition-colors",
              isActive
                ? "bg-brand-600 text-white ring-brand-600"
                : "bg-surface text-ink-soft ring-line hover:bg-slate-50",
            )}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolved = await searchParams;
  const params: SearchParams = {
    category: resolved.category ?? "all",
    status: resolved.status ?? "all",
    sort: resolved.sort === "popular" ? "popular" : "latest",
  };

  const filter: ProjectFilter = {
    category: params.category as ProjectFilter["category"],
    status: params.status as ProjectFilter["status"],
    sort: params.sort as ProjectFilter["sort"],
  };

  const projects = await getPublishedProjects(filter);

  return (
    <div className="container-page py-12 sm:py-16">
      <SectionHeading
        eyebrow="学生作品"
        title="作品墙"
        description="每个项目背后，都有一段真实的学习过程。点击卡片查看完整故事。"
      />

      <Card className="mt-8 space-y-5 p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted">分类</p>
          <FilterPills
            paramKey="category"
            params={params}
            active={params.category ?? "all"}
            options={[{ value: "all", label: "全部" }, ...CATEGORIES]}
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted">状态</p>
          <FilterPills
            paramKey="status"
            params={params}
            active={params.status ?? "all"}
            options={[{ value: "all", label: "全部" }, ...STATUSES]}
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted">排序</p>
          <FilterPills
            paramKey="sort"
            params={params}
            active={params.sort ?? "latest"}
            options={[
              { value: "latest", label: "最新 / 精选" },
              { value: "popular", label: "最多喜欢" },
            ]}
          />
        </div>
      </Card>

      <p className="mt-6 text-sm text-muted">共 {projects.length} 个项目</p>

      {projects.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <Card className="mt-4 p-12 text-center text-sm text-muted">
          这个筛选条件下还没有项目，换个条件看看吧。
        </Card>
      )}
    </div>
  );
}
