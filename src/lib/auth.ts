import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import siteConfig from "../../site.config";

// 定义 siteConfig 类型以便 TypeScript 正确推断
interface SiteConfig {
  adminUsers: string[];
  [key: string]: any;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      authorization: {
        params: {
          // 添加更多的scope来允许操作仓库内容
          // 'repo' 权限允许完全访问仓库
          // 也可以使用 'public_repo' 如果只需要公共仓库的访问权
          scope: 'read:user user:email repo',
        },
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('Sign in attempt:', {
        user: user ? { id: user.id, name: user.name, email: user.email } : null,
        account: account ? { provider: account.provider, type: account.type } : null,
      });
      
      const isAuthorized = !!user.name && (siteConfig as SiteConfig).adminUsers.includes(user.name);
      
      console.log('Authorization result:', {
        userName: user.name,
        isAuthorized,
        adminUsers: (siteConfig as SiteConfig).adminUsers,
      });
      
      return isAuthorized;
    },
    async session({ session, user, token }) {
      // 将访问令牌添加到会话中，以便客户端可以使用
      if (token && token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async jwt({ token, account, user }) {
      // 在初始登录时保存访问令牌
      if (account) {
        // 保存访问令牌
        token.accessToken = account.access_token;
        // 可选：保存令牌类型
        token.tokenType = account.token_type;
      }
      return token;
    },
    // 添加 redirect 回调以避免循环重定向
    async redirect({ url, baseUrl }) {
      console.log('NextAuth redirect:', { url, baseUrl });
      
      // 如果 URL 包含 error=undefined，移除它
      if (url.includes('error=undefined')) {
        const cleanUrl = new URL(url);
        cleanUrl.searchParams.delete('error');
        return cleanUrl.toString();
      }
      
      // 避免重定向到登录页面自身
      if (url.startsWith(`${baseUrl}/login`)) {
        return baseUrl;
      }
      
      // 确保 URL 以 baseUrl 开头或是绝对路径
      if (url.startsWith(baseUrl) || url.startsWith('http')) {
        return url;
      }
      
      // 默认重定向到 baseUrl
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 