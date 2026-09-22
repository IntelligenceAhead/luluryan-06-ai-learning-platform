import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "隐私说明",
  description: "我们如何保护学生隐私，以及平台收集与展示信息的边界。",
};

const SECTIONS = [
  {
    title: "我们是谁",
    body: "这是一个用于展示 AI 项目制学习成果的平台。它的目的不是评选“最强的作品”，而是把每个项目背后的学习过程讲清楚，让学生被看见，也让家长看得懂。",
  },
  {
    title: "我们不展示什么",
    body: "平台不公开、不存储学生真实姓名、学校、联系方式等敏感个人信息。作品作者默认显示昵称；导师可将作者设为匿名。",
  },
  {
    title: "学生原话",
    body: "“完成这个项目学到了什么”一栏保存的是学生本人的原话，平台不会用 AI 改写或润色，以保证表达真实、归属清晰。",
  },
  {
    title: "留言与互动",
    body: "留言需要昵称与内容，请勿填写真实姓名或联系方式。留言采用先发后审，并配有基本的频率限制与敏感内容过滤；管理员可以回复或隐藏不当内容。",
  },
  {
    title: "喜欢",
    body: "“喜欢”完全匿名，不与任何学生或访问者身份关联，也不会形成任何排名。它只是一种鼓励，表达对作品的认可。",
  },
  {
    title: "数据用途",
    body: "平台数据仅用于展示学习成果与改进教学，不用于广告或向第三方出售。如需更正或删除内容，请联系课程导师。",
  },
];

export default function PrivacyPage() {
  return (
    <div className="container-page py-12 sm:py-16">
      <SectionHeading
        eyebrow="关于 / 隐私"
        title="隐私说明"
        description="保护学生，是我们在设计这个平台时最先考虑的事情。"
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Card key={section.title} className="p-6">
            <h2 className="text-lg font-semibold text-ink">
              {section.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {section.body}
            </p>
          </Card>
        ))}
      </div>

      <p className="mt-10 text-xs text-muted">
        本页为第一阶段占位说明，最终条款将在正式对外发布前完善。
      </p>
    </div>
  );
}
