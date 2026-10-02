import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "AI学习路径",
  description:
    "工具会变，能力留下——学生如何从跟着做，走向独立解决问题与独立创造。",
};

const STAGES = [
  {
    step: "01",
    title: "跟着做",
    subtitle: "先打开可能性",
    lines: ["接触真正有效的 AI 工具，在实际任务中快速上手。不是为“学会一个软件”，而是开始理解："],
    highlight: "AI原来可以帮我做到什么？",
  },
  {
    step: "02",
    title: "自己解决",
    subtitle: "从“学工具”变成“找办法”",
    lines: ["面对没有标准答案的问题：需要什么就去找，不会什么就去学。"],
    chain: ["有目标", "找方法", "选工具", "解决问题"],
  },
  {
    step: "03",
    title: "独立创造",
    subtitle: "从完成任务，到提出自己的问题",
    lines: ["发现生活、学习和兴趣中的机会，提出自己的想法，组合不同工具，把模糊的念头变成可以实现的东西。"],
    quote: ["“老师让我做什么？”", "“我想做这个，怎么把它实现？”"],
  },
];

const CREATIVE_STEPS = [
  "发现问题",
  "提出问题",
  "寻找可能",
  "调动工具",
  "动手验证",
  "产生新的想法",
];

const FUTURE_ABILITIES = [
  {
    step: "01",
    title: "快速学习",
    body: "面对不断出现的新 AI 工具，能够迅速理解、判断并上手。",
    number: "text-brand-600",
  },
  {
    step: "02",
    title: "驾驭工具",
    body: "不是被工具牵着走，而是根据自己的目标，判断应该使用什么。",
    number: "text-accent-700",
  },
  {
    step: "03",
    title: "独立创造",
    body: "发现问题，形成自己的想法，并有能力把想法一步步变成现实。",
    number: "text-emerald-700",
  },
];

export default function LearningPathPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
        <div className="container-page relative py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Badge variant="brand">AI学习路径</Badge>
              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
                工具会变，
                <span className="text-gradient">能力</span>留下。
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                AI时代，重要的不是记住多少工具，而是能快速理解新工具，让它服务于自己的目标，并最终把想法变成现实。
              </p>
            </div>

            {/* 轻量抽象视觉：工具 → 能力 → 创造 */}
            <div className="relative hidden lg:block" aria-hidden>
              <svg viewBox="0 0 360 200" className="h-full w-full" fill="none">
                <circle cx="292" cy="62" r="72" fill="#c7d2fe" opacity="0.25" />
                <path
                  d="M48 176 C120 168 150 130 190 100 C232 68 270 56 316 44"
                  stroke="#c7d2fe"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M107 149l5 3-5 3"
                  stroke="#a5b4fc"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M247 69l5 3-5 3"
                  stroke="#a5b4fc"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="190" cy="100" r="15" fill="#818cf8" opacity="0.10" />
                <circle cx="316" cy="44" r="19" fill="#06b6d4" opacity="0.10" />
                <circle cx="316" cy="44" r="24" stroke="#c7d2fe" strokeWidth="1" strokeDasharray="2 6" />
                <circle cx="48" cy="176" r="5" fill="#eef2ff" stroke="#a5b4fc" strokeWidth="1.5" />
                <circle cx="190" cy="100" r="8" fill="#e0e7ff" stroke="#818cf8" strokeWidth="1.5" />
                <circle cx="316" cy="44" r="12" fill="#cffafe" stroke="#06b6d4" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 核心成长路径 */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="核心成长路径"
          title="从跟着做，到独立创造"
        />

        <ol className="relative mt-12 space-y-10 lg:space-y-14">
          {STAGES.map((stage, index) => (
            <li key={stage.step} className="relative flex gap-6">
              {/* 成长连接线：连到下一个阶段 */}
              {index < STAGES.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute left-[27px] top-14 -bottom-10 w-0.5 rounded-full bg-brand-200 lg:-bottom-14"
                />
              ) : null}

              <div className="relative z-10 shrink-0">
                <span
                  className={
                    index === STAGES.length - 1
                      ? "flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-base font-bold text-white ring-8 ring-brand-100"
                      : "flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-base font-bold text-white ring-8 ring-canvas"
                  }
                >
                  {stage.step}
                </span>
                {index === STAGES.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute -inset-1.5 rounded-full border border-dashed border-brand-300"
                  />
                ) : null}
              </div>

              <div
                className={
                  index === STAGES.length - 1
                    ? "flex-1 rounded-2xl bg-brand-50/50 p-5 ring-1 ring-inset ring-brand-100 sm:p-6"
                    : "flex-1 pt-1"
                }
              >
                <p className="text-xs font-semibold tracking-wide text-brand-600">
                  {stage.subtitle}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-ink sm:text-2xl">
                  {stage.title}
                </h3>

                <div className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted sm:text-base">
                  {stage.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>

                {stage.highlight ? (
                  <p className="mt-3 text-base font-medium text-ink sm:text-lg">
                    {stage.highlight}
                  </p>
                ) : null}

                {stage.chain ? (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {stage.chain.map((item, chainIndex) => (
                      <span key={item} className="flex items-center gap-2">
                        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 sm:text-sm">
                          {item}
                        </span>
                        {chainIndex < stage.chain!.length - 1 ? (
                          <span aria-hidden className="text-brand-300">
                            →
                          </span>
                        ) : null}
                      </span>
                    ))}
                  </div>
                ) : null}

                {stage.quote ? (
                  <div className="mt-5 rounded-xl bg-surface px-4 py-4 ring-1 ring-inset ring-line">
                    <p className="text-sm text-muted">{stage.quote[0]}</p>
                    <p aria-hidden className="mt-2 text-brand-300">
                      ↓
                    </p>
                    <p className="mt-2 text-base font-semibold text-brand-700 sm:text-lg">
                      {stage.quote[1]}
                    </p>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 创意思维 + 最终留下来的能力（页面总结） */}
      <section className="border-y border-line bg-surface py-12 sm:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="创意思维"
            title="创造力，不只是“有一个好点子”。"
            description="真正的创造，往往从留意身边的问题开始。"
          />
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            我们希望学生逐渐养成一种习惯：看到一个问题时，不只是接受它，而是开始想——“有没有另一种可能？”
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
            {CREATIVE_STEPS.map((step, index) => (
              <span key={step} className="flex items-center gap-3">
                <span className="rounded-full bg-canvas px-3.5 py-1.5 text-xs font-medium text-ink-soft ring-1 ring-inset ring-line sm:text-sm">
                  {step}
                </span>
                {index < CREATIVE_STEPS.length - 1 ? (
                  <span aria-hidden className="text-brand-300">
                    →
                  </span>
                ) : null}
              </span>
            ))}
          </div>

          {/* 页面总结：最终留下来的三种能力 */}
          <div className="mt-10 border-t border-line pt-8">
            <div className="grid gap-6 sm:grid-cols-3">
              {FUTURE_ABILITIES.map((ability) => (
                <div key={ability.step}>
                  <p className={`text-xs font-bold ${ability.number}`}>
                    {ability.step}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-ink">
                    {ability.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {ability.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 结尾 */}
      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl">
            今天学会的工具可能会过时，
            <br className="hidden sm:block" />
            但学习、判断和创造的能力会留下。
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">
            从“我会不会用这个工具”，
            <br className="hidden sm:block" />
            到“我想做什么，以及怎样把它实现”。
          </p>
          <div className="mt-8">
            <ButtonLink href="/training" variant="secondary">
              了解我们如何进行项目制训练 →
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
