"use client";

import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import siteConfig from '../../site.config';

// 定义 siteConfig 类型以便 TypeScript 正确推断
interface SiteConfig {
  adminUsers: string[];
  [key: string]: any;
}

export default function AuthButton() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  
  // 检查用户是否是管理员
  const isAdmin = session?.user?.name && 
    (siteConfig as SiteConfig).adminUsers.includes(session.user.name);
  
  if (loading) {
    return (
      <button 
        className="px-3 py-2 bg-gray-100 text-gray-400 rounded-md text-sm"
        disabled
      >
        加载中...
      </button>
    );
  }
  
  if (session) {
    return (
      <div className="flex items-center space-x-2">
        {isAdmin && (
          <Link 
            href="/admin" 
            className="px-3 py-2 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200"
          >
            管理页面
          </Link>
        )}
        <button
          onClick={() => signOut()}
          className="px-3 py-2 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200"
        >
          退出登录
        </button>
      </div>
    );
  }
  
  return (
    <button
      onClick={() => signIn('github')}
      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
    >
      管理员登录
    </button>
  );
} 