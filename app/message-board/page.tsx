import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getVisibleComments } from "@/lib/projects";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "留言板",
  description: "给同学们留下鼓励，也把想法告诉我们。",
};

export default async function MessageBoardPage() {
  const comments = await getVisibleComments();

  return (
    <div className="container-page py-12 sm:py-16">
      <SectionHeading
        eyebrow="留言板"
        title="留下你的鼓励"
        description="你的每一条留言，都会被同学们看到。请友善表达，让这里成为互相支持的地方。"
      />

      <Card className="mt-8 border-l-4 border-warm-500 bg-warm-100/50 p-5">
        <p className="text-sm font-semibold text-warm-700">隐私提示</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          请勿填写学生真实姓名、学校、电话或其他联系方式。为保护学生隐私，
          平台不公开展示任何真实身份信息。
        </p>
      </Card>

      <Card className="mt-6 p-5 text-sm text-muted">
        留言发布功能将在下一阶段开放（先发后审，管理员可回复与隐藏）。
        当前页面展示已有留言。
      </Card>

      <div className="mt-8 space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-ink">
                {comment.nickname}
              </span>
              <span className="text-xs text-muted">
                {formatDate(comment.createdAt)}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {comment.content}
            </p>
            {comment.adminReply ? (
              <div className="mt-4 rounded-xl bg-brand-50 p-4">
                <p className="text-xs font-semibold text-brand-700">
                  管理员回复
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {comment.adminReply}
                </p>
              </div>
            ) : null}
          </Card>
        ))}

        {comments.length === 0 ? (
          <Card className="p-12 text-center text-sm text-muted">
            还没有留言，第一阶段先来占个位置吧。
          </Card>
        ) : null}
      </div>
    </div>
  );
}
