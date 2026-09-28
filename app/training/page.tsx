import type { Metadata } from "next";
import { ProjectLearningFlow } from "@/components/project/ProjectLearningFlow";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "AI项目制训练班",
  description:
    "以项目为载体的 AI 训练班：每周小课 → 课后挑战 → 思维拓展 → 项目开发 → 小组研发 → 成果展示。",
};

const LADDER = [
  {
    step: "01",
    title: "每周小课",
    body: "用一个具体问题引入一个核心概念，不讲空泛的理论。",
  },
  {
    step: "02",
    title: "课后挑战",
    body: "当周就把新知识用一次，形成自己的理解。",
  },
  {
    step: "03",
    title: "思维拓展",
    body: "讨论“还有没有别的解法”，训练开放的思维方式。",
  },
  {
    step: "04",
    title: "项目开发",
    body: "围绕真实问题，把想法做成能运行的作品。",
  },
  {
    step: "05",
    title: "小组研发",
    body: "分工、协作、互相评审，学会表达与倾听。",
  },
  {
    step: "06",
    title: "成果展示",
    body: "讲清楚做了什么、为什么这么做，以及学到什么。",
  },
];

const ABILITIES = [
  { title: "问题拆解", body: "把一个大目标拆成能一步步完成的小任务。" },
  { title: "持续迭代", body: "接受“第一版一定不完美”，并愿意改到更好。" },
  { title: "表达与协作", body: "把想法讲清楚，也能听懂并整合别人的意见。" },
  { title: "AI 素养", body: "理解 AI 能做什么、不能做什么，并学会校验它。" },
];

export default function TrainingPage() {
  return (
    <div>
      <section className="border-b border-line bg-surface">
        <div className="container-page py-16 sm:py-20">
          <Badge variant="brand">AI项目制训练班</Badge>
          <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            不是学几个工具，
            <br className="hidden sm:block" />
            而是获得能带走的能力
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            我们用项目驱动学习：每学一个概念，就立刻用它解决一个真实问题。
            孩子带走的不是一个做过的作品，而是一套可以反复使用的方法。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/projects" size="lg">
              看看学生作品
            </ButtonLink>
            <ButtonLink href="/message-board" variant="secondary" size="lg">
              咨询与留言
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 项目制学习 */}
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

      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="学习流程"
          title="每周一个循环，一步步向上走"
          description="六个环节形成稳定的节奏：输入 → 练习 → 思考 → 创造 → 协作 → 表达。"
        />
        <ol className="mt-10 space-y-4">
          {LADDER.map((item, index) => (
            <li key={item.step}>
              <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-sm font-bold text-white">
                  {item.step}
                </span>
                <div className="sm:w-40 sm:shrink-0">
                  <h3 className="text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
                {index < LADDER.length - 1 ? (
                  <span className="hidden text-line sm:block" aria-hidden>
                    ↓
                  </span>
                ) : null}
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="可以获得的能力"
            title="课程结束后，孩子真正带走的是什么"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ABILITIES.map((ability) => (
              <Card key={ability.title} className="p-6">
                <h3 className="text-lg font-semibold text-ink">
                  {ability.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {ability.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <Card className="bg-ink p-8 text-center sm:p-12">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            想了解孩子的学习进展？
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
            每个项目详情页都完整记录了“为什么设计、学到什么、还能怎么扩展”，
            即使不懂技术，也能看懂孩子的成长。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/projects" size="lg">
              从作品开始了解
            </ButtonLink>
            <ButtonLink
              href="/learning-path"
              variant="secondary"
              size="lg"
            >
              查看学习路径
            </ButtonLink>
          </div>
        </Card>
      </section>
    </div>
  );
}
