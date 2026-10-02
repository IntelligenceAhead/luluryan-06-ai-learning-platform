import Link from "next/link";
import { NAV_ITEMS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-sm font-bold text-white">
              AI
            </span>
            <span className="text-sm font-semibold text-ink">
              {SITE.name}
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            {SITE.tagline}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">浏览</h3>
          <ul className="mt-4 space-y-2.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-brand-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">关于</h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link
                href="/privacy"
                className="text-sm text-muted transition-colors hover:text-brand-700"
              >
                隐私说明
              </Link>
            </li>
            <li>
              <Link
                href="/training"
                className="text-sm text-muted transition-colors hover:text-brand-700"
              >
                课程体系
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <p>仅展示学习过程与学生AI作品，不公开任何学生真实姓名与联系方式。</p>
        </div>
      </div>
    </footer>
  );
}
