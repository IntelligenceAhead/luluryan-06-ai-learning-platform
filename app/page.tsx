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

          {/* 少量背景光点，呼应生长与连接 */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-[44%] top-14 hidden h-2 w-2 rounded-full bg-brand-300/60 lg:block"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute left-[52%] top-2/3 hidden h-1.5 w-1.5 rounded-full bg-accent-300/70 lg:block"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute left-[47%] bottom-12 hidden h-1.5 w-1.5 rounded-full bg-brand-200 lg:block"
          />

          <div className="relative grid gap-8 lg:grid-cols-[44fr_56fr] lg:items-center">
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

            {/* 右侧：与背景融合的成长视觉，向右延伸到模块边缘 */}
            <div className="lg:-mr-14">
              <Image
                src="/images/sections/06-dream-incubator.png"
                alt="梦想孵化器——一个想法被孵化、获得支持，逐渐生长的过程"
                width={1672}
                height={941}
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="h-auto w-full [mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)] lg:[mask-image:radial-gradient(ellipse_85%_88%_at_70%_50%,black_50%,transparent_95%)]"
              />
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
