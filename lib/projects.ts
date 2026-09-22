import type { Project as ProjectRecord } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { Category, ProjectStatus } from "@/lib/constants";

export type Project = Omit<
  ProjectRecord,
  "aiKnowledge" | "tags" | "abilityTags" | "relatedProjectIds" | "screenshots"
> & {
  aiKnowledge: string[];
  tags: string[];
  abilityTags: string[];
  relatedProjectIds: string[];
  screenshots: string[];
};

export function parseList(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export function serializeList(values: string[]): string {
  return JSON.stringify(values ?? []);
}

export function toProject(record: ProjectRecord): Project {
  const { aiKnowledge, tags, abilityTags, relatedProjectIds, screenshots, ...rest } =
    record;
  return {
    ...rest,
    aiKnowledge: parseList(aiKnowledge),
    tags: parseList(tags),
    abilityTags: parseList(abilityTags),
    relatedProjectIds: parseList(relatedProjectIds),
    screenshots: parseList(screenshots),
  };
}

export type ProjectFilter = {
  category?: Category | "all";
  status?: ProjectStatus | "all";
  sort?: "latest" | "popular";
};

export async function getPublishedProjects(
  filter: ProjectFilter = {},
): Promise<Project[]> {
  const { category = "all", status = "all", sort = "latest" } = filter;

  const records = await prisma.project.findMany({
    where: {
      isPublished: true,
      ...(category !== "all" ? { category } : {}),
      ...(status !== "all" ? { status } : {}),
    },
    orderBy:
      sort === "popular"
        ? [{ voteCount: "desc" }, { createdAt: "desc" }]
        : [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  return records.map(toProject);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const records = await prisma.project.findMany({
    where: { isPublished: true, isFeatured: true },
    orderBy: [{ voteCount: "desc" }, { createdAt: "desc" }],
    take: limit,
  });
  return records.map(toProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const record = await prisma.project.findUnique({ where: { slug } });
  if (!record || !record.isPublished) return null;
  return toProject(record);
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const records = await prisma.project.findMany({
    where: { isPublished: true },
    select: { tags: true },
  });

  const counter = new Map<string, number>();
  for (const record of records) {
    for (const tag of parseList(record.tags)) {
      counter.set(tag, (counter.get(tag) ?? 0) + 1);
    }
  }

  return [...counter.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export async function getPlatformStats(): Promise<{
  projectCount: number;
  voteCount: number;
  commentCount: number;
}> {
  const [projectCount, voteAgg, commentCount] = await Promise.all([
    prisma.project.count({ where: { isPublished: true } }),
    prisma.project.aggregate({
      where: { isPublished: true },
      _sum: { voteCount: true },
    }),
    prisma.comment.count({ where: { isVisible: true } }),
  ]);

  return {
    projectCount,
    voteCount: voteAgg._sum.voteCount ?? 0,
    commentCount,
  };
}

export async function getVisibleComments(limit = 20) {
  return prisma.comment.findMany({
    where: { isVisible: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
