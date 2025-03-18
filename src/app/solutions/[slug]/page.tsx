import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import siteConfig from '../../../../site.config';
import { getAllSolutions, getSolutionBySlug } from '../../../lib/solutions';
import Markdown from '../../../components/Markdown';

interface Params {
  params: {
    slug: string;
  };
}

// 为所有题解生成静态路径
export async function generateStaticParams() {
  const solutions = await getAllSolutions();
  
  return solutions.map((solution) => ({
    slug: solution.slug,
  }));
}

// 动态生成页面元数据
export async function generateMetadata({ params }: Params) {
  const solution = await getSolutionBySlug(params.slug);
  
  if (!solution) {
    return {
      title: '未找到题解',
    };
  }
  
  return {
    title: solution.title,
    description: solution.excerpt || `${solution.title} - 难度：${siteConfig.solutions.difficultyLevels[solution.difficulty].label}`,
  };
}

export default async function SolutionPage({ params }: Params) {
  const solution = await getSolutionBySlug(params.slug);
  
  if (!solution) {
    notFound();
  }
  
  const difficultyInfo = siteConfig.solutions.difficultyLevels[solution.difficulty];
  
  // 获取标签的中文名称
  const getTagLabel = (tagId: string): string => {
    const tag = siteConfig.solutions.tags.find(t => t.id === tagId);
    return tag ? tag.label : tagId;
  };
  
  return (
    <article className="max-w-3xl mx-auto">
      <Link 
        href="/solutions" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        ← 返回所有题解
      </Link>
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{solution.title}</h1>
        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            更新于：{format(new Date(solution.date), 'yyyy年MM月dd日', { locale: zhCN })}
          </span>
          <span 
            className="px-2 py-1 rounded-full text-xs font-medium" 
            style={{ 
              backgroundColor: `${difficultyInfo.color}20`, 
              color: difficultyInfo.color 
            }}
          >
            {difficultyInfo.label}
          </span>
        </div>
        
        {/* 显示标签 */}
        {solution.tags && solution.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {solution.tags.map(tagId => (
              <span 
                key={tagId}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
              >
                {getTagLabel(tagId)}
              </span>
            ))}
          </div>
        )}
        
        {solution.excerpt && (
          <p className="text-lg text-gray-600 border-l-4 border-gray-200 pl-4 italic">
            {solution.excerpt}
          </p>
        )}
      </header>
      
      <div className="prose prose-blue max-w-none">
        <Markdown content={solution.content} />
      </div>
    </article>
  );
} 