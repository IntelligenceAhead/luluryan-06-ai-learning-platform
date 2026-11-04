import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getVisibleComments } from "@/lib/projects";
import { formatDate } from "@/lib/utils";

export async function FeedbackSection() {
  const comments = await getVisibleComments();

  return (
    <section id="feedback" aria-label="交流与反馈" className="mt-16 scroll-mt-24 border-t border-line pt-12 sm:mt-20 sm:pt-16">
      <SectionHeading
        title="交流与反馈"
        description="这里欢迎一般性的公共交流：交流 AI 学习经验、分享项目创意，也欢迎对学生作品提出建议和鼓励。请友善表达，互相支持。"
      />

      <Card className="mt-8 border-l-4 border-warm-500 bg-warm-100/50 p-5">
        <p className="text-sm font-semibold text-warm-700">隐私提示</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          请勿填写学生真实姓名、学校、电话或其他联系方式。为保护学生隐私，
          平台不公开展示任何真实身份信息。
        </p>
      </Card>

      <Card className="mt-6 p-5 text-sm text-muted">
        留言发布功能尚未开放，当前区域仅展示已有留言。
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
            暂无留言。
          </Card>
        ) : null}
      </div>
    </section>
  );
}
