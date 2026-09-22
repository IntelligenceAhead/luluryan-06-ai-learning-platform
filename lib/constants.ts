export const CATEGORIES = [
  { value: "ai", label: "AI" },
  { value: "code", label: "编程" },
  { value: "web", label: "网站" },
  { value: "game", label: "游戏" },
  { value: "agent", label: "Agent" },
] as const;

export type Category = (typeof CATEGORIES)[number]["value"];

export const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((item) => [item.value, item.label]),
);

export const STATUSES = [
  { value: "ongoing", label: "进行中" },
  { value: "completed", label: "已完结" },
] as const;

export type ProjectStatus = (typeof STATUSES)[number]["value"];

export const STATUS_LABELS: Record<string, string> = Object.fromEntries(
  STATUSES.map((item) => [item.value, item.label]),
);

export const ABILITY_LABELS: Record<string, string> = {
  problem_solving: "问题解决",
  observation: "观察力",
  persistence: "坚持与迭代",
  creativity: "创造力",
  decomposition: "任务拆解",
  empathy: "换位思考",
  self_management: "自我管理",
  design_thinking: "设计思维",
  ownership: "主人翁意识",
};

export const abilityLabel = (key: string) => ABILITY_LABELS[key] ?? key;

export const categoryLabel = (key: string) => CATEGORY_LABELS[key] ?? key;

export const statusLabel = (key: string) => STATUS_LABELS[key] ?? key;

export const SITE = {
  name: "AI 项目制学习成果平台",
  shortName: "项目制学习",
  tagline: "这里展示的不只是学生做出来的东西，而是他们如何学习、思考与成长。",
  description:
    "把学生作品还原成学习故事：项目背后的学习内容、AI 知识与能力成长，让家长也看得懂。",
} as const;

export const NAV_ITEMS = [
  { href: "/projects", label: "学生作品" },
  { href: "/learning-path", label: "学习路径" },
  { href: "/training", label: "AI项目制训练班" },
  { href: "/message-board", label: "留言板" },
] as const;
