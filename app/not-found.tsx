import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
        没有找到这个页面
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted">
        它可能还没有发布，或者链接已经失效。回到作品墙继续逛逛吧。
      </p>
      <div className="mt-8">
        <ButtonLink href="/projects">返回作品墙</ButtonLink>
      </div>
    </div>
  );
}
