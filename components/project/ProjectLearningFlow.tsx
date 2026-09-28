const PROJECT_SOURCES = ["自己的创意", "真实需求", "研究挑战"];

const PROJECT_STEPS = [
  { step: "01", title: "定义问题" },
  { step: "02", title: "原型试错" },
  { step: "03", title: "用户测试" },
  { step: "04", title: "发布" },
  { step: "05", title: "真实检验" },
];

/**
 * 「项目制学习」流程视觉：项目来源 → 项目开始 → 01–05 → 项目管理贯穿。
 * 原样迁移自首页，颜色、结构、节点与连接线均未改动。
 */
export function ProjectLearningFlow() {
  return (
    <>
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
    </>
  );
}
