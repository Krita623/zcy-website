import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import siteConfig from '../../../../site.config';
import SolutionForm from '../../../components/SolutionForm';

// 定义 siteConfig 类型以便 TypeScript 正确推断
interface SiteConfig {
  adminUsers: string[];
  [key: string]: any;
}

export const metadata = {
  title: '创建新题解',
};

export default async function NewSolutionPage() {
  // 服务端获取会话
  const session = await getServerSession(authOptions);
  
  // 检查用户是否已登录和是否是管理员
  if (!session?.user?.name || !(siteConfig as SiteConfig).adminUsers.includes(session.user.name)) {
    redirect('/login');
  }
  
  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">创建新题解</h1>
        <p className="text-gray-600 mt-2">添加一个新的算法题解</p>
      </div>
      
      <SolutionForm isEditing={false} />
    </div>
  );
} 