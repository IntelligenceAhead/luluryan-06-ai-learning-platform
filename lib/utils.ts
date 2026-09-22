export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatDateShort(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
  }).format(date);
}

export function displayAuthor(project: {
  authorDisplay: string;
  authorIsAnonymous: boolean;
}): string {
  return project.authorIsAnonymous ? "匿名同学" : project.authorDisplay;
}

export function formatCount(value: number): string {
  return new Intl.NumberFormat("zh-CN").format(value);
}

/**
 * 项目展示图的统一取用逻辑：
 * 优先使用 coverImage，其次使用 screenshots，方便后续替换为真实截图。
 */
export function projectImages(project: {
  coverImage?: string | null;
  screenshots?: string[];
}): { cover: string | null; gallery: string[] } {
  const screenshots = project.screenshots ?? [];
  const cover = project.coverImage ?? screenshots[0] ?? null;
  const gallery = screenshots.length > 0 ? screenshots : cover ? [cover] : [];
  return { cover, gallery };
}
