import type { Project as ProjectRecord } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { STATIC_PROJECTS } from "@/lib/static-projects";
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

/** 与数据库查询一致的排序，保证“数据库项目 + 静态项目”混排结果稳定。 */
function sortProjects(
  projects: Project[],
  sort: NonNullable<ProjectFilter["sort"]>,
): Project[] {
  return [...projects].sort((a, b) => {
    if (sort === "popular") {
      if (b.voteCount !== a.voteCount) return b.voteCount - a.voteCount;
    } else if (a.isFeatured !== b.isFeatured) {
      return Number(b.isFeatured) - Number(a.isFeatured);
    }
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

export async function getPublishedProjects(
  filter: ProjectFilter = {},
): Promise<Project[]> {
  const { category = "all", status = "all", sort = "latest" } = filter;

  let fromDb: Project[] = [];
  try {
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

    fromDb = records.map(toProject);
  } catch {
    fromDb = [];
  }

  const seen = new Set(fromDb.map((project) => project.slug));
  const fallbacks = STATIC_PROJECTS.filter(
    (project) =>
      project.isPublished &&
      !seen.has(project.slug) &&
      (category === "all" || project.category === category) &&
      (status === "all" || project.status === status),
  );

  return sortProjects([...fromDb, ...fallbacks], sort);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  let fromDb: Project[] = [];
  try {
    const records = await prisma.project.findMany({
      where: { isPublished: true, isFeatured: true },
      orderBy: [{ voteCount: "desc" }, { createdAt: "desc" }],
      take: limit,
    });
    fromDb = records.map(toProject);
  } catch {
    fromDb = [];
  }

  const seen = new Set(fromDb.map((project) => project.slug));
  const fallbacks = STATIC_PROJECTS.filter(
    (project) =>
      project.isPublished && project.isFeatured && !seen.has(project.slug),
  );

  return sortProjects([...fromDb, ...fallbacks], "popular").slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const record = await prisma.project.findUnique({ where: { slug } });
    if (record) return record.isPublished ? toProject(record) : null;
  } catch {
    // 无数据库环境（如生产静态部署）：回退到静态项目数据
  }

  const fallback = STATIC_PROJECTS.find((project) => project.slug === slug);
  return fallback && fallback.isPublished ? fallback : null;
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  try {
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
  } catch {
    return [];
  }
}

export async function getPlatformStats(): Promise<{
  projectCount: number;
  voteCount: number;
  commentCount: number;
}> {
  try {
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
  } catch {
    return {
      projectCount: 0,
      voteCount: 0,
      commentCount: 0,
    };
  }
}

export async function getVisibleComments(limit = 20) {
  try {
    return await prisma.comment.findMany({
      where: { isVisible: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}
