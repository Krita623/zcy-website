import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import siteConfig from '../../../site.config';
import { getAllSolutions } from '../../lib/solutions';
import AdminSolutionList from '../../components/AdminSolutionList';

// 禁用页面缓存，确保每次访问都获取最新数据
export const dynamic = 'force-dynamic';

// 定义 siteConfig 类型以便 TypeScript 正确推断
interface SiteConfig {
  adminUsers: string[];
  [key: string]: any;
}

export const metadata = {
  title: '管理面板',
};

export default async function AdminPage() {
  // 服务端获取会话
  const session = await getServerSession(authOptions);
  
  // 检查用户是否已登录和是否是管理员
  if (!session?.user?.name || !(siteConfig as SiteConfig).adminUsers.includes(session.user.name)) {
    redirect('/login');
  }
  
  // 获取所有题解
  const solutions = await getAllSolutions();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">管理题解</h1>
        <Link
          href="/admin/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          新建题解
        </Link>
      </div>
      
      {solutions.length > 0 ? (
        <AdminSolutionList solutions={solutions} />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-500">暂无题解</h3>
          <p className="mt-2 text-gray-400">点击右上角按钮创建新题解</p>
        </div>
      )}
    </div>
  );
} 