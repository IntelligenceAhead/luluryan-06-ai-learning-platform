import Link from "next/link";
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

const IDEA_STEPS = [
  {
    step: "01",
    title: "先别急着找项目",
    body: "看看自己每天在做什么，什么地方麻烦、无聊、不方便，或者特别有兴趣。",
  },
  {
    step: "02",
    title: "多问一句“能不能？”",
    body: "能不能让 AI 帮我整理？能不能做成游戏？能不能自动完成？能不能换一种玩法？",
  },
  {
    step: "03",
    title: "把脑洞记下来",
    body: "不急着判断好不好。先把那些奇怪、有趣、甚至看起来没什么用的想法留下来。",
  },
  {
    step: "04",
    title: "挑一个，做出来",
    body: "不用一开始就做得很大。先做一个能运行的小版本，再慢慢增加自己的想法。",
  },
  {
    step: "05",
    title: "然后，你会开始停不下来",
    body: "当你做过几个项目以后，会发现生活里到处都是题目：学习、旅行、运动、音乐、游戏、家庭生活……都可能成为下一个 AI 项目。",
  },
];

const IDEA_SPARKS = ["学习", "游戏", "生活", "音乐", "旅行", "运动", "自动化"];

const TRAINING_STEPS = [
  {
    step: "01",
    title: "AI 到底是什么？",
    body: "不只学工具，看看 AI 到底在做什么。",
  },
  {
    step: "02",
    title: "不用交的作业",
    body: "没有标准答案，试着把刚学的东西玩出点新花样。",
  },
  {
    step: "03",
    title: "重新看看这个世界",
    body: "发现身边的问题：有没有什么可以用 AI 重新做一遍？",
  },
  {
    step: "04",
    title: "真实世界在召唤",
    body: "找一个真实的问题，把自己的想法做成真的。",
  },
  {
    step: "05",
    title: "假期，一起组队吧！",
    body: "找到伙伴，分工、碰撞，一起完成更大的挑战。",
  },
  {
    step: "06",
    title: "项目孵化器",
    body: "让作品被看见、被体验，也从大家的反馈中继续长大。",
  },
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
        <SectionHeading
          eyebrow="创新，从发现开始"
          title="不是没有想法，只是还没开始留意。"
          description="一个不方便的瞬间、一道总是做错的题、一次旅行、一项爱好，甚至一句“要是能这样就好了”——都可能变成一个 AI 项目的开始。我们希望同学慢慢养成一种习惯：发现问题，产生想法，然后动手把它做出来。"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {IDEA_STEPS.map((step, index) => (
            <div
              key={step.step}
              className="flex gap-4 rounded-2xl bg-surface p-5 ring-1 ring-inset ring-line"
            >
              <span className="text-sm font-bold text-brand-600">
                {step.step}
              </span>
              <div>
                <h3 className="font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </div>
          ))}

          {/* 第五格之后的余位：让“一个想法带出更多想法”有一个落脚点 */}
          <div className="flex flex-col justify-center gap-4 rounded-2xl bg-brand-50/60 p-5 ring-1 ring-inset ring-brand-100">
            <p className="text-sm leading-relaxed text-brand-800">
              一个想法会带出更多想法。试着从身边找一找：
            </p>
            <div className="flex flex-wrap gap-1.5">
              {IDEA_SPARKS.map((spark) => (
                <span
                  key={spark}
                  className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-200"
                >
                  {spark}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-lg font-medium leading-relaxed text-ink sm:text-xl">
          从“老师，我不知道做什么”，<br className="hidden sm:block" />
          到“老师，我又想到一个项目”。
        </p>
      </section>

      {/* 训练班体系 */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="我们的 AI 学习方式"
            title="学一点，玩一下，最后做个真的。"
            description="AI 不只是用来学的。理解它、试试它，然后用它解决一个你真正感兴趣的问题。"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRAINING_STEPS.map((step) => (
              <div
                key={step.step}
                className="flex gap-4 rounded-2xl bg-canvas p-5 ring-1 ring-inset ring-line"
              >
                <span className="text-sm font-bold text-brand-600">
                  {step.step}
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/training">看看完整学习方式</ButtonLink>
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
