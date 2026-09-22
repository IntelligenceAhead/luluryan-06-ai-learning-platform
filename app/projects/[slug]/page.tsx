import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EyeIcon, HeartIcon } from "@/components/ui/icons";
import { abilityLabel, categoryLabel, statusLabel } from "@/lib/constants";
import { getProjectBySlug } from "@/lib/projects";
import { displayAuthor, formatCount, formatDate, projectImages } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "项目未找到" };
  return {
    title: project.title,
    description: project.summary,
  };
}

function LearningBlock({
  title,
  children,
  eyebrow,
}: {
  title: string;
  children: React.ReactNode;
  eyebrow?: string;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      {eyebrow ? (
        <p className="mt-1 text-xs font-medium text-brand-600">{eyebrow}</p>
      ) : null}
      <div className="mt-3 text-sm leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const { cover, gallery } = projectImages(project);

  return (
    <div className="container-page py-10 sm:py-14">
      <Link
        href="/projects"
        className="text-sm font-medium text-brand-700 hover:text-brand-800"
      >
        ← 返回作品墙
      </Link>

      {/* 第一屏：先展示作品本身 */}
      <header className="mt-6">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand">{categoryLabel(project.category)}</Badge>
            <Badge
              variant={project.status === "completed" ? "success" : "accent"}
            >
              {statusLabel(project.status)}
            </Badge>
            {project.isFeatured ? <Badge variant="warm">精选</Badge> : null}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            {project.summary}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
            <span>作者：{displayAuthor(project)}</span>
            <span aria-hidden>·</span>
            <span>{formatDate(project.createdAt)}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-600 px-5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
              >
                体验这个项目 ↗
              </a>
            ) : (
              <span className="inline-flex h-11 items-center rounded-full bg-slate-100 px-5 text-sm text-muted">
                演示链接即将开放
              </span>
            )}
            <ButtonLink href="/message-board" variant="secondary">
              给这个项目留言
            </ButtonLink>
          </div>
        </div>

        {/* 大型截图 / Demo 预览区域 */}
        <div className="mt-8">
          <ProjectGallery
            images={gallery}
            title={project.title}
            category={project.category}
            cover={cover}
          />
        </div>

        <div className="mt-4 flex items-center gap-5 text-sm text-ink-soft">
          <span className="inline-flex items-center gap-1.5" title="浏览量">
            <EyeIcon />
            {formatCount(project.viewCount)} 次浏览
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-rose-500"
            title="喜欢"
          >
            <HeartIcon />
            {formatCount(project.voteCount)} 人喜欢
          </span>
        </div>
      </header>

      {/* 项目背后的学习 */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-10">
          <LearningBlock title="为什么设计这个项目" eyebrow="导师视角">
            <p>{project.whyDesigned}</p>
          </LearningBlock>

          <LearningBlock title="项目的逻辑基础">
            <p>{project.logicFoundation}</p>
          </LearningBlock>

          <LearningBlock title="涉及的 AI 知识">
            <ul className="flex flex-wrap gap-2">
              {project.aiKnowledge.map((item) => (
                <li
                  key={item}
                  className="rounded-lg bg-brand-50 px-3 py-1.5 text-sm text-brand-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </LearningBlock>

          <LearningBlock title="完成这个项目学到了什么">
            <p>{project.learningOutcomes}</p>
          </LearningBlock>

          <blockquote className="rounded-2xl border-l-4 border-brand-500 bg-brand-50/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
              学生原话 · 原样保留，不作改写
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink">
              “{project.studentQuote}”
            </p>
            <footer className="mt-3 text-sm text-muted">
              —— {project.studentQuoteAuthor ?? displayAuthor(project)}
            </footer>
          </blockquote>

          <LearningBlock title="项目还能如何扩展">
            <p>{project.futureExtensions}</p>
          </LearningBlock>
        </div>

        <aside className="space-y-6">
          <Card className="p-6">
            <p className="text-xs font-semibold text-muted">能力标签</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.abilityTags.map((ability) => (
                <Badge key={ability} variant="accent">
                  {abilityLabel(ability)}
                </Badge>
              ))}
            </div>
            <p className="mt-5 text-xs font-semibold text-muted">关键词</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-ink-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-base font-semibold text-ink">
              想看懂更多这样的项目？
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              到学习路径看看知识如何串联起来，也欢迎留下你的鼓励。
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <ButtonLink href="/learning-path" size="sm">
                看学习路径
              </ButtonLink>
              <ButtonLink
                href="/projects"
                variant="secondary"
                size="sm"
              >
                回到作品墙
              </ButtonLink>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
