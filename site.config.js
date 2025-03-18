/**
 * 网站配置文件
 * 所有网站的配置信息都集中在这里，方便修改
 */
const siteConfig = {
  // 网站基本信息
  title: "算法题解",
  description: "余忆的个人网站",
  author: "余忆",
  bio: "白日梦想家 | 敲代码ing",
  siteUrl: "https://Krita623.github.io/github-website",
  
  // 社交链接
  social: {
    github: "https://github.com/Krita623",
    email: "17667847837@163.com",
    bilibili: "https://space.bilibili.com/11417944",
  },
  
  // 导航链接
  navLinks: [
    { href: "/", label: "首页" },
    { href: "/solutions", label: "题解" },
    { href: "/about", label: "关于我" },
  ],
  
  // 题解设置
  solutions: {
    // 主页显示的题解数量
    homepageLimit: 6,
    // 题解文件夹路径
    contentPath: "content/solutions",
    // 题解难度级别及对应颜色
    difficultyLevels: {
      easy: { label: "简单", color: "#4ade80" },
      medium: { label: "中等", color: "#fb923c" },
      hard: { label: "困难", color: "#f87171" },
    },
    // 预定义的算法标签
    tags: [
      { id: "array", label: "数组" },
      { id: "string", label: "字符串" },
      { id: "hash-table", label: "哈希表" },
      { id: "linked-list", label: "链表" },
      { id: "stack", label: "栈" },
      { id: "queue", label: "队列" },
      { id: "tree", label: "树" },
      { id: "graph", label: "图" },
      { id: "binary-search", label: "二分查找" },
      { id: "dynamic-programming", label: "动态规划" },
      { id: "greedy", label: "贪心算法" },
      { id: "backtracking", label: "回溯算法" },
      { id: "depth-first-search", label: "深度优先搜索" },
      { id: "breadth-first-search", label: "广度优先搜索" },
      { id: "sorting", label: "排序" },
      { id: "two-pointers", label: "双指针" },
      { id: "recursion", label: "递归" },
      { id: "sliding-window", label: "滑动窗口" },
      { id: "bit-manipulation", label: "位运算" },
      { id: "math", label: "数学" }
    ],
  },
  
  // 管理员 GitHub 用户名列表 (用于鉴权)
  adminUsers: [
    "Krita623"  // 确保这是你的GitHub用户名，区分大小写
  ],
};

module.exports = siteConfig; 
