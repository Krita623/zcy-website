/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 注释掉静态导出设置
  // output: 'export',
  // distDir: 'out',
  images: {
    unoptimized: true,
  },

  // 添加公共环境变量配置
  publicRuntimeConfig: {
    // 在客户端和服务端都可用
    NEXT_PUBLIC_GITHUB_OWNER: process.env.NEXT_PUBLIC_GITHUB_OWNER,
    NEXT_PUBLIC_GITHUB_REPO: process.env.NEXT_PUBLIC_GITHUB_REPO,
    NEXT_PUBLIC_GITHUB_SOLUTIONS_PATH: process.env.NEXT_PUBLIC_GITHUB_SOLUTIONS_PATH,
    NEXT_PUBLIC_USE_GITHUB_API: process.env.NEXT_PUBLIC_USE_GITHUB_API,
    // 添加Netlify构建钩子
    NEXT_PUBLIC_NETLIFY_BUILD_HOOK: process.env.NEXT_PUBLIC_NETLIFY_BUILD_HOOK,
  }
};

module.exports = nextConfig;
