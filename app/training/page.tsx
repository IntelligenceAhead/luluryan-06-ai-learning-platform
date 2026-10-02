import type { Metadata } from "next";
import { ProjectLearningFlow } from "@/components/project/ProjectLearningFlow";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "项目制训练班",
  description:
    "导师给方向，但不替学生完成——通过项目制训练，让学生真正学会解决问题并完成项目。",
};

const MENTOR_STEPS = [
  {
    step: "01",
    title: "给方向",
    body: "导师帮助学生理解问题、明确目标。",
  },
  {
    step: "02",
    title: "先动手",
    body: "学生先尝试，不等“全部学会”才开始。",
  },
  {
    step: "03",
    title: "遇到问题",
    body: "真正需要学习的知识和方法开始出现。",
  },
  {
    step: "04",
    title: "关键指导",
    body: "导师在关键节点提供知识、方法和思路。",
  },
  {
    step: "05",
    title: "再去解决",
    body: "学生带着新的理解，自己继续尝试。",
  },
  {
    step: "06",
    title: "达成目标",
    body: "把问题真正解决，把项目真正完成。",
  },
];

const TRAINING_FORMATS = [
  "每周小课",
  "课后实践",
  "项目研发",
  "小组协作",
  "成果展示",
];

export default function TrainingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line bg-surface">
        <div className="container-page py-16 sm:py-20">
          <Badge variant="brand">项目制训练班</Badge>
          <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            真正的学习，
            <br className="hidden sm:block" />
            发生在解决问题的时候。
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            我们不把知识全部讲完，再让学生开始项目。学生先进入真实任务，在尝试、遇到问题、寻找方法和不断调整的过程中学习。
          </p>
          <p className="mt-6 max-w-2xl border-l-4 border-brand-500 pl-4 text-base font-semibold leading-relaxed text-ink sm:text-lg">
            导师给方向，但不替学生完成。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/projects" size="lg">
              看看学生AI作品
            </ButtonLink>
            <ButtonLink href="/message-board" variant="secondary" size="lg">
              咨询与留言
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 项目制学习（完整保留） */}
      <section className="border-b border-line bg-surface py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="项目制学习"
            title="一个项目，是怎么做出来的？"
            description="不是完成一次作业，而是经历一个项目真正发生的过程。"
          />
          <ProjectLearningFlow />
        </div>
      </section>

      {/* 导师如何参与 */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="导师如何参与"
          title="老师不是一直站在前面。"
          description="项目往前走，老师慢慢退后。"
        />

        {/* 桌面端：横向连续流程 01 → 06 */}
        <div className="relative mt-12 hidden lg:block">
          <svg
            viewBox="0 0 1000 36"
            preserveAspectRatio="none"
            className="absolute inset-x-0 top-0 h-9 w-full"
            fill="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="mentor-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a5b4fc" />
                <stop offset="100%" stopColor="#67e8f9" />
              </linearGradient>
            </defs>
            <path
              d="M83 18 H917"
              stroke="url(#mentor-line)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path d="M164 14.5l5 3.5-5 3.5" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M330 14.5l5 3.5-5 3.5" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M497 14.5l5 3.5-5 3.5" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M664 14.5l5 3.5-5 3.5" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M830 14.5l5 3.5-5 3.5" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <ol className="relative grid grid-cols-6">
            {MENTOR_STEPS.map((step, index) => (
              <li
                key={step.step}
                className="flex flex-col items-center gap-2.5 text-center"
              >
                <span className="relative z-20">
                  <span
                    className={
                      index === MENTOR_STEPS.length - 1
                        ? "flex h-9 w-9 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white ring-4 ring-accent-100"
                        : "flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white ring-4 ring-canvas"
                    }
                  >
                    {step.step}
                  </span>
                  {index === MENTOR_STEPS.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute -inset-2 rounded-full border border-dashed border-accent-300"
                    />
                  ) : null}
                </span>
                <h3
                  className={
                    index === MENTOR_STEPS.length - 1
                      ? "text-sm font-semibold text-accent-700"
                      : "text-sm font-semibold text-ink"
                  }
                >
                  {step.title}
                </h3>
                <p className="max-w-[9rem] text-xs leading-relaxed text-muted">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* 移动端：纵向连续流程 */}
        <ol className="relative mt-10 flex flex-col gap-6 lg:hidden">
          {MENTOR_STEPS.map((step, index) => (
            <li key={step.step} className="relative flex items-start gap-4">
              <span className="relative z-10 shrink-0">
                <span
                  className={
                    index === MENTOR_STEPS.length - 1
                      ? "flex h-9 w-9 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white ring-4 ring-accent-100"
                      : "flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white ring-4 ring-canvas"
                  }
                >
                  {step.step}
                </span>
                {index === MENTOR_STEPS.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute -inset-2 rounded-full border border-dashed border-accent-300"
                  />
                ) : null}
              </span>
              <div>
                <h3
                  className={
                    index === MENTOR_STEPS.length - 1
                      ? "text-base font-semibold text-accent-700"
                      : "text-base font-semibold text-ink"
                  }
                >
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>

              {index < MENTOR_STEPS.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute left-[17px] top-10 h-[calc(100%-1rem)] w-0.5 rounded-full bg-brand-200"
                />
              ) : null}
            </li>
          ))}
        </ol>

        <div className="mt-12 text-center">
          <p className="text-lg font-medium leading-relaxed text-ink sm:text-xl">
            知识不是被一次性灌输，
            <br className="hidden sm:block" />
            而是在项目真正需要的时候进入。
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            导师提供方向和支持，真正完成项目的人始终是学生自己。
          </p>
        </div>
      </section>

      {/* 训练方式 */}
      <section className="border-y border-line bg-surface py-12 sm:py-14">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-wide text-brand-600">
              训练方式
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              学习、实践和项目不是彼此分开的，而是在整个训练过程中不断交替发生。
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-medium text-ink-soft sm:text-base">
              {TRAINING_FORMATS.map((format, index) => (
                <span key={format} className="flex items-center gap-3">
                  <span>{format}</span>
                  {index < TRAINING_FORMATS.length - 1 ? (
                    <span aria-hidden className="text-brand-300">
                      ·
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 结尾 */}
      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl">
            不是替学生把项目做完，
            <br className="hidden sm:block" />
            而是陪他们学会自己把项目做出来。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/projects">看看学生做出来的作品 →</ButtonLink>
            <ButtonLink href="/learning-path" variant="secondary">
              了解AI学习路径 →
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
