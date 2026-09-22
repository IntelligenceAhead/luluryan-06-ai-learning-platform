import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { abilityLabel } from "@/lib/constants";
import { getPublishedProjects, type Project } from "@/lib/projects";
import { cn, displayAuthor, formatDateShort } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "学习路径",
  description:
    "把作品横向聚合起来，看清知识、能力与作品之间的关联。",
};

type View = "knowledge" | "ability";

function groupBy(
  projects: Project[],
  pick: (project: Project) => string[],
): { key: string; items: Project[] }[] {
  const map = new Map<string, Project[]>();
  for (const project of projects) {
    for (const key of pick(project)) {
      const list = map.get(key) ?? [];
      list.push(project);
      map.set(key, list);
    }
  }
  return [...map.entries()]
    .map(([key, items]) => ({ key, items }))
    .sort((a, b) => b.items.length - a.items.length);
}

export default async function LearningPathPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const resolved = await searchParams;
  const view: View = resolved.view === "ability" ? "ability" : "knowledge";

  const projects = await getPublishedProjects();
  const groups =
    view === "knowledge"
      ? groupBy(projects, (project) => project.tags)
      : groupBy(projects, (project) => project.abilityTags);

  return (
    <div className="container-page py-12 sm:py-16">
      <SectionHeading
        eyebrow="学习路径"
        title="知识、能力与作品，在这里连成一张网"
        description="换一个角度，就能看到同一批作品背后的知识结构与能力成长。"
      />

      <div className="mt-8 inline-flex rounded-full bg-surface p-1 ring-1 ring-inset ring-line">
        {[
          { value: "knowledge", label: "按知识 / 标签" },
          { value: "ability", label: "按能力维度" },
        ].map((tab) => (
          <Link
            key={tab.value}
            href={`/learning-path?view=${tab.value}`}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              view === tab.value
                ? "bg-brand-600 text-white"
                : "text-ink-soft hover:text-ink",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        {groups.map((group) => (
          <Card key={group.key} className="p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-ink">
                {view === "ability" ? abilityLabel(group.key) : group.key}
              </h2>
              <Badge variant={view === "ability" ? "accent" : "brand"}>
                {group.items.length} 个项目
              </Badge>
            </div>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block rounded-xl bg-canvas p-4 ring-1 ring-inset ring-line transition-colors hover:bg-brand-50"
                  >
                    <p className="font-medium text-ink">{project.title}</p>
                    <p className="mt-1 text-xs text-muted">
                      {displayAuthor(project)} ·{" "}
                      {formatDateShort(project.createdAt)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        ))}

        {groups.length === 0 ? (
          <Card className="p-12 text-center text-sm text-muted">
            还没有可聚合的项目数据。
          </Card>
        ) : null}
      </div>
    </div>
  );
}
