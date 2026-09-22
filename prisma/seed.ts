import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const json = (value: unknown) => JSON.stringify(value);

const projects = [
  {
    slug: "ai-plant-doctor",
    title: "AI植物医生",
    authorDisplay: "小宇",
    authorIsAnonymous: false,
    category: "agent",
    status: "completed",
    demoUrl: "https://example.com/plant-doctor",
    coverImage: "/projects/ai-plant-doctor-cover.svg",
    screenshots: [
      "/projects/ai-plant-doctor-1.svg",
      "/projects/ai-plant-doctor-2.svg",
    ],
    summary: "拍一张叶子照片，AI 帮你判断植物是否生病，并给出照顾建议。",
    excerpt: "从不会养花，到给植物做一位会看病的 AI 助手。",
    whyDesigned:
      "我们希望孩子第一次接触 AI 时，解决的不是抽象问题，而是家里真实会发生的事。植物生病是孩子能观察、能验证、能持续跟踪的日常场景，天然适合训练“发现问题—收集证据—反复改进”的学习习惯。",
    logicFoundation:
      "项目把“看病”拆成三步：先观察叶片颜色与斑点（图像识别），再对照常见病因（分类判断），最后给出护理建议（规则 + 提示词）。核心不是模型多强，而是让孩子理解“AI 的结论来自数据与规则”，并学会用人类常识去检验它。",
    aiKnowledge: ["图像识别", "提示词工程", "分类与标签"],
    learningOutcomes:
      "掌握了如何给图片和标签建立对应关系；学会用清晰的提示词描述问题；理解 AI 会出错，需要用真实案例校验；能独立整理一份“植物护理清单”。",
    studentQuote:
      "一开始 AI 说我家的绿萝是缺水，但它其实是浇水太多了。后来我拍了很多张不同状态的叶子，它才慢慢变准。我发现 AI 不是一次就对的，是要慢慢教的。",
    studentQuoteAuthor: "小宇",
    futureExtensions:
      "接入更多植物种类、增加生长记录时间线、加入社区分享，让同学互相帮忙诊断。",
    tags: ["视觉", "Python", "生活应用"],
    abilityTags: ["problem_solving", "observation", "persistence"],
    relatedProjectIds: [],
    voteCount: 42,
    viewCount: 1280,
    isFeatured: true,
    isPublished: true,
  },
  {
    slug: "campus-guide-game",
    title: "校园迷宫向导",
    authorDisplay: "匿名同学",
    authorIsAnonymous: true,
    category: "game",
    status: "ongoing",
    demoUrl: "https://example.com/campus-guide",
    coverImage: "/projects/campus-guide-game-cover.svg",
    screenshots: [
      "/projects/campus-guide-game-1.svg",
      "/projects/campus-guide-game-2.svg",
    ],
    summary: "用游戏的方式帮新生找到校园里的每个角落。",
    excerpt: "把地图变成关卡，把问路变成一次冒险。",
    whyDesigned:
      "新生入学最焦虑的事之一就是“找不到地方”。我们让孩子站在“服务他人”的角度设计产品，既是编程练习，也是换位思考的训练。",
    logicFoundation:
      "把校园地图抽象成由节点和路径组成的图，用寻路算法计算最短路线，再用游戏化关卡包装。孩子需要先想清楚“路是怎么连起来的”，才能让角色走对。",
    aiKnowledge: ["路径搜索算法", "状态机", "游戏逻辑设计"],
    learningOutcomes:
      "理解了“地图=点和线”的抽象方式；能用条件判断描述规则；学会把复杂任务拆成小关卡逐步实现；第一次体会到为别人做东西的成就感。",
    studentQuote:
      "我最喜欢做第三关，因为那时候我终于搞懂了为什么要先算最短的路，不然角色会一直绕圈子。",
    studentQuoteAuthor: "一位五年级同学",
    futureExtensions:
      "加入语音导览、真实校园 AR 指引、让其他同学自己设计新关卡。",
    tags: ["游戏", "算法", "校园"],
    abilityTags: ["creativity", "decomposition", "empathy"],
    relatedProjectIds: [],
    voteCount: 27,
    viewCount: 864,
    isFeatured: true,
    isPublished: true,
  },
  {
    slug: "homework-helper-web",
    title: "作业小管家",
    authorDisplay: "小满",
    authorIsAnonymous: false,
    category: "web",
    status: "ongoing",
    demoUrl: "https://example.com/homework-helper",
    coverImage: "/projects/homework-helper-web-cover.svg",
    screenshots: [
      "/projects/homework-helper-web-1.svg",
      "/projects/homework-helper-web-2.svg",
    ],
    summary: "一个帮自己记录作业、提醒截止日期的小网站。",
    excerpt: "从“总忘作业”，到亲手做一个不会忘的清单。",
    whyDesigned:
      "与其反复提醒孩子别忘作业，不如让他自己造一个工具。当孩子成为“产品的作者”，责任感会自然发生，这比说教有效得多。",
    logicFoundation:
      "核心是“数据结构 + 状态更新”：每条作业有标题、截止时间和完成状态；完成时更新状态并重新排序。孩子要理解数据如何被保存和读取，界面只是数据的一层表达。",
    aiKnowledge: ["数据结构", "前端交互", "AI 分类建议"],
    learningOutcomes:
      "学会设计一张表来存放信息；理解新增、删除、修改三种基本操作；尝试用 AI 给作业自动分类，思考 AI 建议是否靠谱。",
    studentQuote:
      "我以前总是忘记交作业，现在这个网站会提醒我。虽然它长得不好看，但是是我自己做的，我每天都会打开它。",
    studentQuoteAuthor: "小满",
    futureExtensions:
      "增加家长共享视图、学习时长统计、把作业数据和日历打通。",
    tags: ["网站", "JavaScript", "效率工具"],
    abilityTags: ["self_management", "design_thinking", "ownership"],
    relatedProjectIds: [],
    voteCount: 18,
    viewCount: 542,
    isFeatured: true,
    isPublished: true,
  },
  {
    slug: "medicine-box-reminder",
    title: "奶奶的药盒提醒",
    authorDisplay: "小禾",
    authorIsAnonymous: false,
    category: "agent",
    status: "ongoing",
    demoUrl: "https://example.com/medicine-box",
    coverImage: "/projects/medicine-box-reminder-cover.svg",
    screenshots: [
      "/projects/medicine-box-reminder-1.svg",
      "/projects/medicine-box-reminder-2.svg",
    ],
    summary: "为奶奶做一个会按时提醒吃药的温暖小助手。",
    excerpt: "从担心奶奶忘记吃药，到亲手做出一个贴心提醒。",
    whyDesigned:
      "孩子第一次想为家人做点实实在在的事。提醒吃药看似简单，却包含时间判断、重复规则和“怎样提醒才不烦人”的人情考量，非常适合练习把同理心翻译成具体功能。",
    logicFoundation:
      "把“按时吃药”抽象成“时间点 + 状态”：每个药品有提醒时间与是否已服用的状态，到点触发提醒，确认后更新状态。孩子要理解条件判断与状态记录，再决定提醒的语气与方式。",
    aiKnowledge: ["时间与状态逻辑", "语音合成", "提示词工程"],
    learningOutcomes:
      "学会用条件判断描述“什么时候提醒”；理解状态记录为什么重要；尝试让提醒的语气更友好；第一次完整地把家人的需求做成产品。",
    studentQuote:
      "做的时候我一直在想，如果提醒太吵奶奶会更烦，所以我把它改成先说一句关心的话，再提醒吃药。原来做东西要站在用的人的角度想。",
    studentQuoteAuthor: "小禾",
    futureExtensions:
      "加入家人共享提醒、用药记录导出、识别药盒照片自动填写信息。",
    tags: ["生活应用", "Agent", "时间逻辑"],
    abilityTags: ["empathy", "problem_solving", "ownership"],
    relatedProjectIds: [],
    voteCount: 31,
    viewCount: 733,
    isFeatured: true,
    isPublished: true,
  },
];

const comments = [
  {
    nickname: "一位家长",
    content:
      "看了孩子的项目说明，第一次真正明白他在课上学到了什么，谢谢老师把这些记录下来。",
  },
  {
    nickname: "同学小林",
    content: "植物医生那个太酷了！我也想做一个帮奶奶管理用药提醒的项目。",
  },
  {
    nickname: "路过的大朋友",
    content: "希望能看到更多“过程”而不是只有结果，这个平台做得很好。",
  },
];

async function main() {
  await prisma.vote.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.project.deleteMany();

  for (const project of projects) {
    await prisma.project.create({
      data: {
        ...project,
        aiKnowledge: json(project.aiKnowledge),
        tags: json(project.tags),
        abilityTags: json(project.abilityTags),
        relatedProjectIds: json(project.relatedProjectIds),
        screenshots: json(project.screenshots),
      },
    });
  }

  for (const comment of comments) {
    await prisma.comment.create({ data: comment });
  }

  const count = await prisma.project.count();
  console.log(`Seeded ${count} projects and ${comments.length} comments.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
