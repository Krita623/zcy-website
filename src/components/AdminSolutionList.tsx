"use client";

import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Solution } from '../types';
import siteConfig from '../../site.config';

interface AdminSolutionListProps {
  solutions: Solution[];
}

export default function AdminSolutionList({ solutions }: AdminSolutionListProps) {
  console.log('AdminSolutionList rendering with solutions:', solutions.length);
  
  const handleDelete = async (slug: string) => {
    if (window.confirm('确定要删除这个题解吗？此操作不可恢复。')) {
      try {
        const response = await fetch(`/api/solutions?slug=${slug}`, {
          method: 'DELETE',
        });

        // 尝试解析响应，无论响应状态如何
        const result = await response.json().catch(() => ({}));
        
        if (!response.ok) {
          throw new Error(result.error || 'API 请求失败');
        }
        
        // 如果有警告但操作成功，显示警告
        if (result.warning) {
          console.warn('删除操作警告:', result.warning);
          alert(`题解已删除，但有警告: ${result.warning}`);
        } else if (result.message) {
          alert(result.message);
        } else {
          alert('题解已成功删除');
        }
        
        // 强制刷新页面以显示最新数据
        window.location.reload();
      } catch (error: any) {
        console.error('删除题解失败', error);
        
        // 提供更友好的错误消息
        if (error.message.includes('未获取GitHub授权')) {
          alert('删除题解失败: 您需要登录并授权访问GitHub仓库。请重新登录并确保授予足够的权限。');
        } else {
          alert(`删除题解失败: ${error.message || '未知错误'}`);
        }
      }
    }
  };

  // 获取标签的中文名称
  const getTagLabel = (tagId: string): string => {
    const tag = siteConfig.solutions.tags.find(t => t.id === tagId);
    return tag ? tag.label : tagId;
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {solutions.map((solution) => (
            <li key={solution.slug}>
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="truncate text-sm font-medium text-blue-600">
                        <Link href={`/solutions/${solution.slug}`}>
                          {solution.title}
                        </Link>
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <span className="truncate">
                          {format(new Date(solution.date), 'yyyy年MM月dd日', { locale: zhCN })}
                        </span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm text-gray-900">
                          难度：
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: `${solution.difficulty === 'easy' ? '#4ade80' : solution.difficulty === 'medium' ? '#fb923c' : '#f87171'}20`, 
                              color: solution.difficulty === 'easy' ? '#4ade80' : solution.difficulty === 'medium' ? '#fb923c' : '#f87171' 
                            }}
                          >
                            {solution.difficulty === 'easy' ? '简单' : solution.difficulty === 'medium' ? '中等' : '困难'}
                          </span>
                        </p>
                        {solution.excerpt && (
                          <p className="mt-2 text-sm text-gray-500 truncate">{solution.excerpt}</p>
                        )}
                        
                        {/* 显示标签 */}
                        {solution.tags && solution.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {solution.tags.map(tagId => (
                              <span 
                                key={tagId}
                                className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                              >
                                {getTagLabel(tagId)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link 
                    href={`/admin/${solution.slug}/edit`}
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    编辑
                  </Link>
                  <button 
                    onClick={() => handleDelete(solution.slug)}
                    className="inline-flex items-center rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-red-600/20 hover:bg-red-100"
                  >
                    删除
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 