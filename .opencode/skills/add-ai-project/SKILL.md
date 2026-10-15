---
name: add-ai-project
description: 接入新的真实学生/助教作品到 opencode-web「AI 学习成果展示网站」：检查重名、写入 lib/static-projects.ts、放置封面到 public/projects/、复用 coverFramed 统一封面样式、验证作品列表/详情页/封面路径/在线体验链接，并运行 typecheck 与 build。Use when the user asks to 接入作品/新增项目/添加真实作品/add a real project to the AI learning platform. Triggers: 接入, 新增作品, 第三个作品, static-projects, 封面, 体验链接. 不自动 commit/push/部署。
metadata:
  audience: maintainers
  opencode/slash: "true"
---

# add-ai-project — 接入真实作品

## 适用场景

- 用户要求把一个新的真实作品（助教老师或学生）接入网站作品墙。
- 复用已验证的「静态数据 + 封面 + 展示样式 + 验证」流程，不重新设计。

## 开始前必须收集（缺一项先询问，不要猜测）

| 资料 | 说明 |
| --- | --- |
| 项目名称 | 写入 `title` |
| 作者身份 | 明确是「学生」还是「助教老师」，以及需要展示的昵称/称呼 |
| 项目简介 | 1–2 句，写入 `summary` |
| 项目状态 | 持续更新中（`ongoing`）或已完成（`completed`） |
| 真实封面截图 | 本地文件路径（PNG/JPG，不要 SVG） |
| 在线体验链接 | https URL，写入 `demoUrl` |
| 可选：学习经历 | 为什么设计 / 逻辑基础 / AI知识 / 学习收获 / 学生原话 / 未来扩展 |

作者身份说明：当前数据结构只有 `authorDisplay` 与 `authorIsAnonymous`，没有「学生/助教」的角色标识。不要自行新增字段、标签或视觉机制来区分角色；如用户要求区分，先与用户确认如何处理（这属于设计变更，不在本 Skill 范围）。

## 硬性规则

- 不编造作者姓名、学生原话、学习经历或项目功能。
- 缺少的资料使用现有占位约定，并列入「待人工补充」：
  - `authorDisplay`: `"待补充"`
  - `studentQuote`: `"（学生原话待作者补充）"`，`studentQuoteAuthor`: `null`
  - `whyDesigned` / `logicFoundation` / `learningOutcomes` / `futureExtensions`: `"内容整理中，稍后由作者补充。"`
  - `aiKnowledge`: `["待补充"]`
- 不修改现有项目数据、不修改页面/组件/首页/详情页/Header/Footer/数据库/schema，不新增依赖，不调整任何已确认设计。
- 不自动创建 GitHub 或 Vercel 项目；不自动 commit、push 或部署。

## 流程

1. 检查重复
   - 在 `lib/static-projects.ts` 中搜索标题与 slug，在 `lib/projects.ts` 及数据库中确认无同 slug 项目。
   - 搜索 `demoUrl`，确认体验链接未被其他项目使用。
   - slug 规则：小写 kebab-case、简短（如 `drift-rescue`、`tetris`）；`id` 使用 `static-<slug>`。

2. 放置封面
   - 将封面复制到 `public/projects/<slug>-cover.png`，网页路径为 `/projects/<slug>-cover.png`。
   - 列表页对「非 `.svg`」封面自动启用 `coverFramed` 统一展示框（见 `app/projects/page.tsx`），无需改代码；不要修改图片文件本身。

3. 写入数据
   - 在 `lib/static-projects.ts` 的 `STATIC_PROJECTS` 数组末尾追加一项，结构完全参照数组内已有项目（如 `drift-rescue`、`tetris`）。
   - `category` 取值见 `lib/constants.ts`（ai | code | web | game | agent）；`status` 为 `ongoing` 或 `completed`。
   - `voteCount` / `viewCount` 保持 0；`isFeatured` 与现有真实作品保持一致（`true`）；`updatedAt` 使用当天日期。
   - 数据库优先、静态 fallback 的读取逻辑（`lib/projects.ts`）不要改动。

4. 保持其他内容不变
   - 不触碰其他项目条目、按钮、标签、文字、首页排序与任何页面布局。

5. 验证（本地）
   - 启动或复用开发服务器：`npm run dev`（默认 http://localhost:3000）。
   - 列表出现：`curl -s http://localhost:3000/projects | grep '/projects/<slug>'`
   - 详情页 200：`curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/projects/<slug>`
   - 详情页 HTML 含封面路径与体验链接，且链接为 `<a ... target="_blank" ...>`。
   - 封面 200：`curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/projects/<slug>-cover.png`
   - 推荐：生产无数据库验证 —— `npm run build` 后用无效 `DATABASE_URL` 启动 `npx next start -p 3100`，重复以上检查（Vercel 无数据库）。

6. 必须运行并通过

   ```bash
   npm run typecheck
   npm run build
   ```

7. 报告
   - 修改了哪些文件；数据加入位置；列表/详情/封面/体验链接验证结果；typecheck 与 build 结果；待人工补充内容（作者、学习经历、学生原话等）。

## 参考

- 已接入示例：`lib/static-projects.ts` 中 `drift-rescue`（持续更新中）、`tetris`（已完成）。
- 数据读取与合并：`lib/projects.ts`（数据库优先，静态 fallback，按 slug 去重）。
- 展示框样式：`components/project/ProjectCard.tsx` 的 `coverFramed` 分支（仅列表页启用）。

## 示例

用户说：「把第三个助教老师作品『XXX』接入网站，封面在 `~/Desktop/xxx.png`，体验地址是 https://... ，状态：持续更新中。」

执行：确认作者展示方式 → 检查 slug/链接无重复 → 封面放入 `public/projects/xxx-cover.png` → 追加数据到 `STATIC_PROJECTS`（缺少的学习字段用占位） → 验证列表/详情/封面/链接 → 运行 typecheck 与 build → 报告结果与待补充项。不 commit、不 push、不部署。
