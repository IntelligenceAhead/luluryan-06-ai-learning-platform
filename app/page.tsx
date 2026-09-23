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

const TRAINING_STEPS = [
  { step: "01", title: "把问题说清楚" },
  { step: "02", title: "一起头脑风暴" },
  { step: "03", title: "大胆失败" },
  { step: "04", title: "交给用户试试" },
  { step: "05", title: "发布出去" },
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
            description="像真正的项目团队一样，从一个问题出发，一路做到有人真正使用。"
          />

          <div className="relative hidden lg:block">
            {/* 统一项目路线：一条淡蓝紫细线从 01 连到 05，随 03 轻微下沉、04 回升 */}
            <svg
              viewBox="0 0 1000 64"
              preserveAspectRatio="none"
              className="absolute inset-x-0 top-0 z-10 h-16 w-full"
              fill="none"
              aria-hidden
            >
              <path
                d="M100 32 H300 C380 32 420 56 500 56 C580 56 620 44 700 44 H900"
                stroke="#c7d2fe"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path d="M196.5 28.5l5 3.5-5 3.5" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M396.5 40.5l5 3.5-5 3.5" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M596.5 46.5l5 3.5-5 3.5" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M796.5 34.5l5 3.5-5 3.5" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <ol className="relative grid grid-cols-5">
              {TRAINING_STEPS.map((step, index) => (
                <li
                  key={step.step}
                  className={
                    index === 2
                      ? "relative flex flex-col items-center gap-2 rounded-2xl bg-brand-50/50 px-4 py-3.5 text-center lg:mt-6"
                      : index === 3
                        ? "relative flex flex-col items-center gap-2 rounded-2xl bg-canvas/70 px-4 py-3.5 text-center lg:mt-3"
                        : "relative flex flex-col items-center gap-2 rounded-2xl bg-canvas/70 px-4 py-3.5 text-center"
                  }
                >
                  <span className="relative z-20">
                    <span
                      className={
                        index === TRAINING_STEPS.length - 1
                          ? "flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white ring-4 ring-brand-100"
                          : "flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white ring-4 ring-surface"
                      }
                    >
                      {step.step}
                    </span>
                    {index === TRAINING_STEPS.length - 1 ? (
                      <span
                        aria-hidden
                        className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-700 ring-2 ring-surface"
                      >
                        <svg
                          viewBox="0 0 10 10"
                          width="8"
                          height="8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <path d="M2.5 5.2l1.8 1.8 4-3.6" />
                        </svg>
                      </span>
                    ) : null}
                  </span>
                  <h3 className="text-sm font-semibold text-ink">{step.title}</h3>
                </li>
              ))}
            </ol>
          </div>

          {/* 移动端：纵向时间线 01 ↓ 05 */}
          <ol className="relative mt-10 flex flex-col gap-5 lg:hidden">
            <span
              aria-hidden
              className="absolute left-[17px] top-5 bottom-5 w-0.5 rounded-full bg-brand-200"
            />
            {TRAINING_STEPS.map((step, index) => (
              <li key={step.step} className="relative flex items-center gap-4">
                <span className="relative shrink-0">
                  <span
                    className={
                      index === TRAINING_STEPS.length - 1
                        ? "flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white ring-4 ring-brand-100"
                        : "flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white ring-4 ring-surface"
                    }
                  >
                    {step.step}
                  </span>
                  {index === TRAINING_STEPS.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-700 ring-2 ring-surface"
                    >
                      <svg
                        viewBox="0 0 10 10"
                        width="8"
                        height="8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M2.5 5.2l1.8 1.8 4-3.6" />
                      </svg>
                    </span>
                  ) : null}
                </span>
                <h3 className="text-base font-semibold text-ink">{step.title}</h3>
              </li>
            ))}
          </ol>

          <div className="mt-6 text-center">
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
