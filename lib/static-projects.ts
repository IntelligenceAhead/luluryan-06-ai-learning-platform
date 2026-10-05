import type { Project } from "@/lib/projects";

/**
 * 静态 fallback 项目数据。
 *
 * 用途：生产环境（如 Vercel）没有 DATABASE_URL / SQLite 时，
 * 作品墙、首页与详情页从这里读取，保证真实作品仍然可见。
 *
 * 规则：
 * - 本地或未来接入在线数据库后，数据库记录优先；同 slug 时静态数据自动让位。
 * - 只放“已经确定接入”的真实作品；新增项目直接在数组末尾追加即可。
 * - 学习说明类字段未提供时使用中性的“待补充”占位，不编造内容。
 */
export const STATIC_PROJECTS: Project[] = [
  {
    id: "static-drift-rescue",
    slug: "drift-rescue",
    title: "漂流救援",
    authorDisplay: "待补充",
    authorIsAnonymous: false,
    category: "game",
    createdAt: new Date("2026-09-09T00:00:00+08:00"),
    updatedAt: new Date("2026-10-05T00:00:00+08:00"),
    status: "ongoing",
    demoUrl: "https://luluryan-06-tower-defense.vercel.app",
    coverImage: "/projects/drift-rescue-cover.png",
    screenshots: [],
    summary:
      "一款以河流漂浮物救援为主题的塔防策略游戏。玩家需要选择不同设备，在漂浮物进入漩涡前完成拦截。",
    excerpt: null,
    whyDesigned: "内容整理中，稍后由作者补充。",
    logicFoundation: "内容整理中，稍后由作者补充。",
    aiKnowledge: ["待补充"],
    learningOutcomes: "内容整理中，稍后由作者补充。",
    studentQuote: "（学生原话待作者补充）",
    studentQuoteAuthor: null,
    futureExtensions: "内容整理中，稍后由作者补充。",
    tags: ["游戏", "塔防", "Canvas"],
    abilityTags: [],
    relatedProjectIds: [],
    voteCount: 0,
    viewCount: 0,
    isFeatured: true,
    isPublished: true,
  },
];
