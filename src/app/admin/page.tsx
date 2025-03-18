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
    redirect('/');
  }
  
  // 获取所有题解
  const solutions = await getAllSolutions();
  
  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">管理面板</h1>
        <p className="text-gray-600 mt-2">管理您的题解内容</p>
      </div>
      
      <div className="flex justify-end">
        <Link 
          href="/admin/new" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          创建新题解
        </Link>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">所有题解</h2>
        
        {solutions.length > 0 ? (
          <AdminSolutionList solutions={solutions} />
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium text-gray-500">还没有题解</h3>
            <p className="mt-2 text-gray-400 mb-6">创建您的第一个题解以开始</p>
            <Link 
              href="/admin/new" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              创建题解
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 