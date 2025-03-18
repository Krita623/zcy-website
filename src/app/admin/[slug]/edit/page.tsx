import React from 'react';
import { redirect, notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import siteConfig from '../../../../../site.config';
import { getSolutionBySlug } from '../../../../lib/solutions';
import SolutionForm from '../../../../components/SolutionForm';

// 定义 siteConfig 类型以便 TypeScript 正确推断
interface SiteConfig {
  adminUsers: string[];
  [key: string]: any;
}

export const metadata = {
  title: '编辑题解',
};

interface Params {
  params: {
    slug: string;
  };
}

export default async function EditSolutionPage({ params }: Params) {
  // 服务端获取会话
  const session = await getServerSession(authOptions);
  
  // 检查用户是否已登录和是否是管理员
  if (!session?.user?.name || !(siteConfig as SiteConfig).adminUsers.includes(session.user.name)) {
    redirect('/');
  }
  
  // 获取题解内容
  const solution = await getSolutionBySlug(params.slug);
  
  if (!solution) {
    notFound();
  }
  
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">编辑题解</h1>
        <p className="text-gray-600 mt-2">修改您的题解内容</p>
      </div>
      
      <SolutionForm 
        initialData={solution} 
        isEditing={true} 
      />
    </div>
  );
} 