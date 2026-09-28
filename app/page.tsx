import Link from "next/link";
import Image from "next/image";
import { FeaturedProjectPreview } from "@/components/project/FeaturedProjectPreview";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";
import { getFeaturedProjects, getVisibleComments } from "@/lib/projects";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const REASONS = [
  {
    title: "真实问题，真实动力",
    body: "从生活中的小事出发，孩子解决的是自己想解决的问题，而不是练习题。",
  },
  {
    title: "过程被看见",
    body: "不只展示最终作品，更记录为什么做、怎么想、遇到了什么困难。",
  },
  {
    title: "能力可迁移",
    body: "拆解问题、持续迭代、表达想法——这些能力能带到任何学科和未来。",
  },
];

const IDEA_SPARKS = ["学习", "游戏", "生活", "音乐", "旅行", "运动", "自动化"];

const PROJECT_ORIGINS = [
  {
    step: "01",
    title: "我有一个想法",
    body: "从自己的兴趣、生活和好奇心出发。",
    variant: "brand",
  },
  {
    step: "02",
    title: "真的有人需要",
    body: "面对真实的市场需求，为真实的人解决问题。",
    variant: "accent",
  },
  {
    step: "03",
    title: "老师抛出一个问题",
    body: "从一个值得研究的方向出发，看看你能走多远。",
    variant: "warm",
  },
] as const;

const PROJECT_SOURCES = ["自己的创意", "真实需求", "研究挑战"];

const PROJECT_STEPS = [
  { step: "01", title: "定义问题" },
  { step: "02", title: "原型试错" },
  { step: "03", title: "用户测试" },
  { step: "04", title: "发布" },
  { step: "05", title: "真实检验" },
];

const GROWTH_STAGES = [
  { step: "01", title: "先跟着做", hint: "知道AI能帮我做什么" },
  { step: "02", title: "开始自己解决", hint: "遇到不会的，就去学" },
  { step: "03", title: "独立创造", hint: "从完成任务，到发起自己的项目" },
];

export default async function HomePage() {
  const [featured, comments] = await Promise.all([
    getFeaturedProjects(4),
    getVisibleComments(2),
  ]);

  const heroProject = featured[0];
  const gridProjects =
    featured.length > 3 ? featured.slice(1, 4) : featured.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
        <div
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-200/50 blur-3xl"
          aria-hidden
        />
        <div className="container-page relative py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Badge variant="brand">AI 项目制学习</Badge>
              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
                展示的不只是
                <span className="text-gradient">作品</span>，
                <br className="hidden sm:block" />
                而是孩子的学习故事
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {SITE.tagline}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/projects" size="lg">
                  浏览学生作品
                </ButtonLink>
                <ButtonLink href="/training" variant="secondary" size="lg">
                  了解训练班
                </ButtonLink>
              </div>
            </div>

            {heroProject ? (
              <FeaturedProjectPreview project={heroProject} />
            ) : (
              <Card className="flex aspect-[16/10] items-center justify-center p-8 text-center text-sm text-muted">
                还没有精选作品，去作品墙看看吧。
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* 精选作品 */}
      <section className="container-page py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="精选作品"
            title="看看同学们做出来了什么"
          />
          <Link
            href="/projects"
            className="text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            查看全部 →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gridProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 为什么用项目学 AI */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="为什么用项目学 AI"
            title="不是学几个工具，而是学会解决问题"
            description="AI 会不断更新，但解决问题的方法可以一直用下去。"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {REASONS.map((reason, index) => (
              <Card key={reason.title} className="p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-sm font-bold text-brand-700">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {reason.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 创新从发现开始 */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="创新，从发现开始"
              title="不是没有想法，只是还没开始留意。"
              description="学习中的麻烦、生活里的不方便、一次旅行、一个爱好，甚至一句“要是能这样就好了”，都可能成为下一个 AI 项目。"
            />

            <div className="mt-8 flex flex-wrap gap-2">
              {IDEA_SPARKS.map((spark) => (
                <span
                  key={spark}
                  className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-200"
                >
                  {spark}
                </span>
              ))}
            </div>

            <p className="mt-6 text-lg font-medium text-ink sm:text-xl">
              今天有什么事情，让你觉得“要是能这样就好了”？
            </p>

            <div className="mt-6">
              <span className="group inline-flex h-[48px] w-fit cursor-default items-center gap-2 rounded-2xl bg-gradient-to-b from-brand-500 to-brand-600 px-8 text-[17px] font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:h-[54px] sm:px-9 sm:text-lg">
                去创意实验室看看
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-[3px]"
                >
                  →
                </span>
              </span>
              <p className="mt-3 text-sm text-muted">内页筹备中，敬请期待</p>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/images/sections/01-innovation.png"
              alt="创意从发现开始——从日常的麻烦与好奇心里长出 AI 项目想法"
              width={1677}
              height={938}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-auto w-full rounded-3xl shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* 项目从哪里来 */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="项目从哪里来？"
          title="好项目，不只有一种开始。"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {PROJECT_ORIGINS.map((origin) => (
            <div
              key={origin.step}
              className={
                origin.variant === "brand"
                  ? "rounded-2xl bg-brand-50/60 p-6 ring-1 ring-inset ring-brand-100"
                  : origin.variant === "accent"
                    ? "rounded-2xl bg-accent-100/50 p-6 ring-1 ring-inset ring-accent-300"
                    : "rounded-2xl bg-warm-100/50 p-6 ring-1 ring-inset ring-warm-300"
              }
            >
              <span
                className={
                  origin.variant === "brand"
                    ? "text-sm font-bold text-brand-700"
                    : origin.variant === "accent"
                      ? "text-sm font-bold text-accent-700"
                      : "text-sm font-bold text-warm-700"
                }
              >
                {origin.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-ink">
                {origin.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {origin.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 项目制学习 */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="项目制学习"
            title="不是完成作业，是把一个项目真正做出来。"
            description="从真实问题出发，在真实反馈中迭代，最后交给真实世界检验。"
          />

          {/* 第一层：项目从哪里开始？ */}
          <div className="mx-auto mt-10 max-w-2xl">
            <p className="text-center text-xs font-semibold tracking-wide text-muted">
              一个项目，可以从很多地方开始。
            </p>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {PROJECT_SOURCES.map((source) => (
                <span
                  key={source}
                  className="justify-self-center rounded-full bg-surface px-3 py-2 text-xs font-medium text-ink-soft ring-1 ring-inset ring-line sm:px-4 sm:text-sm"
                >
                  {source}
                </span>
              ))}
            </div>

            {/* 三个来源汇聚到“项目开始” */}
            <svg
              viewBox="0 0 600 44"
              preserveAspectRatio="none"
              className="mt-1 h-11 w-full"
              fill="none"
              aria-hidden
            >
              <path d="M100 0 C100 18 300 24 300 42" stroke="#c7d2fe" strokeWidth="1.5" />
              <path d="M300 0 V42" stroke="#c7d2fe" strokeWidth="1.5" />
              <path d="M500 0 C500 18 300 24 300 42" stroke="#c7d2fe" strokeWidth="1.5" />
            </svg>

            <div className="flex justify-center">
              <span className="inline-flex items-center rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white ring-4 ring-brand-100">
                项目开始
              </span>
            </div>
          </div>

          {/* 项目开始 → 01 定义问题：桌面端折线明确落到 01 */}
          <div className="mt-2 hidden lg:block" aria-hidden>
            <svg
              viewBox="0 0 1000 52"
              preserveAspectRatio="none"
              className="h-[52px] w-full"
              fill="none"
            >
              <path
                d="M500 0 V12 Q500 24 488 24 H112 Q100 24 100 36 V44"
                stroke="#c7d2fe"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M95 38l5 6 5-6"
                stroke="#a5b4fc"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* 移动端：项目开始 → 01（纵向路径紧随其后） */}
          <div className="mt-3 flex justify-center lg:hidden" aria-hidden>
            <svg width="16" height="26" viewBox="0 0 16 26" fill="none" className="text-brand-300">
              <path
                d="M8 0v18M3 14l5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* 第二层：真实项目过程（桌面端横向路径） */}
          <div className="relative mt-4 hidden lg:block">
            <svg
              viewBox="0 0 1000 36"
              preserveAspectRatio="none"
              className="absolute inset-x-0 top-0 h-9 w-full"
              fill="none"
              aria-hidden
            >
              <path d="M100 18 H900" stroke="#c7d2fe" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M197 14.5l5 3.5-5 3.5" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M397 14.5l5 3.5-5 3.5" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M597 14.5l5 3.5-5 3.5" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M797 14.5l5 3.5-5 3.5" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <ol className="relative grid grid-cols-5">
              {PROJECT_STEPS.map((step, index) => (
                <li
                  key={step.step}
                  className="flex flex-col items-center gap-2.5 text-center"
                >
                  <span className="relative z-20">
                    <span
                      className={
                        index === PROJECT_STEPS.length - 1
                          ? "flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white ring-4 ring-brand-100"
                          : "flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white ring-4 ring-surface"
                      }
                    >
                      {step.step}
                    </span>
                    {index === PROJECT_STEPS.length - 1 ? (
                      <span
                        aria-hidden
                        className="absolute -inset-2 rounded-full border border-dashed border-brand-300"
                      />
                    ) : null}
                  </span>
                  <h3
                    className={
                      index === PROJECT_STEPS.length - 1
                        ? "text-sm font-semibold text-brand-700"
                        : "text-sm font-semibold text-ink"
                    }
                  >
                    {step.title}
                  </h3>
                </li>
              ))}
            </ol>
          </div>

          {/* 移动端：纵向项目路径 */}
          <ol className="relative mt-6 flex flex-col gap-5 lg:hidden">
            <span
              aria-hidden
              className="absolute left-[17px] top-5 bottom-5 w-0.5 rounded-full bg-brand-200"
            />
            {PROJECT_STEPS.map((step, index) => (
              <li key={step.step} className="relative flex items-center gap-4">
                <span className="relative shrink-0">
                  <span
                    className={
                      index === PROJECT_STEPS.length - 1
                        ? "flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white ring-4 ring-brand-100"
                        : "flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white ring-4 ring-surface"
                    }
                  >
                    {step.step}
                  </span>
                  {index === PROJECT_STEPS.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute -inset-2 rounded-full border border-dashed border-brand-300"
                    />
                  ) : null}
                </span>
                <h3
                  className={
                    index === PROJECT_STEPS.length - 1
                      ? "text-base font-semibold text-brand-700"
                      : "text-base font-semibold text-ink"
                  }
                >
                  {step.title}
                </h3>
              </li>
            ))}
          </ol>

          {/* 项目管理贯穿 01—05 全过程（辅助层，不占节点） */}
          <div className="mt-8">
            <span aria-hidden className="block h-px w-full bg-line" />
            <div className="mt-4 text-center">
              <p className="text-xs font-medium tracking-wide text-muted">
                项目管理贯穿全过程
              </p>
              <p className="mt-1 text-[11px] tracking-wide text-muted">
                计划 · 分工 · 协作 · 进度 · 复盘
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <span className="group inline-flex h-10 w-fit cursor-default items-center gap-2 rounded-full bg-brand-600 px-5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700">
              看看一个项目是怎么做出来的
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-[3px]"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* AI项目制训练班 */}
      <section className="container-page py-16 sm:py-20">
        {/* 上半部分：左侧文字 / 右侧成长图片（图片为辅助视觉） */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <SectionHeading eyebrow="AI项目制训练班" title="会用AI，只是开始。" />
            <p className="mt-3 max-w-2xl text-base font-medium text-ink-soft sm:text-lg">
              真正的目标，是越来越能自己把想法做出来。
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              从老师带着做，到自己解决问题，再到独立发起项目。学习的重点不是记住某个工具，而是逐渐获得创造的能力。
            </p>
          </div>

          <div>
            <Image
              src="/images/sections/05-training.png"
              alt="AI 项目制训练班的成长过程——从老师带着做，到自己解决问题，再到独立创造"
              width={1677}
              height={938}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-auto w-full rounded-3xl shadow-sm"
            />
          </div>
        </div>

        {/* 桌面端：三个成长阶段，逐渐独立 */}
        <div className="relative mt-12 hidden lg:block">
          <svg
            viewBox="0 0 1000 36"
            preserveAspectRatio="none"
            className="absolute inset-x-0 top-0 h-9 w-full"
            fill="none"
            aria-hidden
          >
            <path d="M167 18 H833" stroke="#c7d2fe" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M328.5 14.5l5 3.5-5 3.5" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M661.5 14.5l5 3.5-5 3.5" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <ol className="relative grid grid-cols-3">
            {GROWTH_STAGES.map((stage, index) => (
              <li
                key={stage.step}
                className="flex flex-col items-center gap-2.5 text-center"
              >
                <span className="relative z-20">
                  <span
                    className={
                      index === GROWTH_STAGES.length - 1
                        ? "flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white ring-4 ring-brand-100"
                        : "flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white ring-4 ring-canvas"
                    }
                  >
                    {stage.step}
                  </span>
                </span>
                <h3
                  className={
                    index === GROWTH_STAGES.length - 1
                      ? "text-sm font-semibold text-brand-700"
                      : "text-sm font-semibold text-ink"
                  }
                >
                  {stage.title}
                </h3>
                <p className="max-w-[16rem] text-xs leading-relaxed text-muted">
                  {stage.hint}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* 移动端：纵向三个阶段 */}
        <ol className="relative mt-10 flex flex-col gap-6 lg:hidden">
          {GROWTH_STAGES.map((stage, index) => (
            <li key={stage.step} className="relative flex items-start gap-4">
              <span className="relative z-10 shrink-0">
                <span
                  className={
                    index === GROWTH_STAGES.length - 1
                      ? "flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white ring-4 ring-brand-100"
                      : "flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white ring-4 ring-canvas"
                  }
                >
                  {stage.step}
                </span>
              </span>
              <div>
                <h3
                  className={
                    index === GROWTH_STAGES.length - 1
                      ? "text-base font-semibold text-brand-700"
                      : "text-base font-semibold text-ink"
                  }
                >
                  {stage.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {stage.hint}
                </p>
              </div>

              {index < GROWTH_STAGES.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute left-[17px] top-10 h-[calc(100%-1rem)] w-0.5 rounded-full bg-brand-200"
                />
              ) : null}
            </li>
          ))}
        </ol>

        {/* 收束句 */}
        <p className="mt-12 text-center text-lg font-medium leading-relaxed text-ink sm:text-xl">
          老师逐渐退后，学生逐渐走到前面。
        </p>

        {/* CTA */}
        <div className="mt-6 text-center">
          <ButtonLink href="/training">了解AI项目制训练班 →</ButtonLink>
        </div>
      </section>

      {/* 梦想孵化器 · 首页入口 */}
      <section className="container-page py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 via-surface to-accent-100/60 px-6 py-11 ring-1 ring-inset ring-brand-100 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 right-24 h-56 w-56 rounded-full bg-accent-100/70 blur-3xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Badge variant="brand">梦想孵化器</Badge>
              <h2 className="mt-4 max-w-lg text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl">
                一个好想法，值得走得更远。
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                课程会结束，但有些项目才刚刚开始。
                <br className="hidden sm:block" />
                在这里，找到伙伴、遇见导师，让一个想法继续生长。
              </p>

              <p className="mt-5 text-sm font-medium text-brand-700">
                找到伙伴 · 导师同行 · 挑战更大的项目
              </p>

              <div className="mt-6">
                <span className="group inline-flex h-12 w-fit cursor-default items-center gap-2 rounded-full bg-brand-600 px-7 text-base font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md">
                  进入梦想孵化器
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-[3px]"
                  >
                    →
                  </span>
                </span>
              </div>
            </div>

            {/* 右侧：正在形成的创意网络（无人物插画） */}
            <div className="relative hidden lg:block" aria-hidden>
              <svg viewBox="0 0 340 260" className="h-full w-full" fill="none">
                {/* 连接线：由淡到清晰，逐渐向核心汇聚 */}
                <path d="M48 232 L96 182" stroke="#c7d2fe" strokeWidth="1.25" opacity="0.55" strokeLinecap="round" />
                <path d="M48 232 L142 214" stroke="#c7d2fe" strokeWidth="1.25" opacity="0.45" strokeLinecap="round" />
                <path d="M142 214 L180 140" stroke="#c7d2fe" strokeWidth="1.25" opacity="0.6" strokeLinecap="round" />
                <path d="M96 182 L222 102" stroke="#a5b4fc" strokeWidth="1.25" opacity="0.75" strokeLinecap="round" />
                <path d="M180 140 L222 102" stroke="#a5b4fc" strokeWidth="1.5" opacity="0.85" strokeLinecap="round" />

                {/* 从核心继续向更远处生长 */}
                <path d="M222 102 L300 46" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />

                {/* 核心与终点的柔光 */}
                <circle cx="222" cy="102" r="17" fill="#06b6d4" opacity="0.10" />
                <circle cx="300" cy="46" r="18" fill="#6366f1" opacity="0.10" />
                <circle cx="300" cy="46" r="24" stroke="#c7d2fe" strokeWidth="1" strokeDasharray="2 6" />

                {/* 节点：从最初的小而淡，到逐渐明显 */}
                <circle cx="48" cy="232" r="3.5" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="1.25" opacity="0.75" />
                <circle cx="96" cy="182" r="4.5" fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="1.25" opacity="0.85" />
                <circle cx="142" cy="214" r="4" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="1.25" opacity="0.8" />
                <circle cx="180" cy="140" r="6" fill="#e0e7ff" stroke="#818cf8" strokeWidth="1.5" />
                <circle cx="222" cy="102" r="10" fill="#cffafe" stroke="#06b6d4" strokeWidth="1.5" />
                <circle cx="300" cy="46" r="11" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 参与入口 */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="参与"
              title="喜欢一个作品，就留下你的鼓励"
              description="看到打动你的项目，点个喜欢，或者到留言板写句话，都是对同学们最好的认可。"
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects">去看看作品</ButtonLink>
              <ButtonLink href="/message-board" variant="secondary">
                去留言板
              </ButtonLink>
            </div>
          </div>

          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="p-5">
                <p className="text-sm leading-relaxed text-ink-soft">
                  “{comment.content}”
                </p>
                <p className="mt-3 text-xs text-muted">
                  {comment.nickname} · {formatDate(comment.createdAt)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
