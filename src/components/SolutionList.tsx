import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import siteConfig from '../../site.config';
import { Solution } from '../types';

interface SolutionListProps {
  solutions: Solution[];
}

export default function SolutionList({ solutions }: SolutionListProps) {
  // 获取标签的中文名称
  const getTagLabel = (tagId: string): string => {
    const tag = siteConfig.solutions.tags.find(t => t.id === tagId);
    return tag ? tag.label : tagId;
  };
  
  return (
    <div className="space-y-6">
      {solutions.map((solution) => {
        const difficultyInfo = siteConfig.solutions.difficultyLevels[solution.difficulty];
        
        return (
          <article key={solution.slug} className="border rounded-lg overflow-hidden hover:shadow-sm transition">
            <Link href={`/solutions/${solution.slug}`} className="block p-6">
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">{solution.title}</h2>
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
                  
                  {solution.excerpt && (
                    <p className="text-gray-600 mb-4">{solution.excerpt}</p>
                  )}
                  
                  {/* 显示标签 */}
                  {solution.tags && solution.tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1">
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
                  
                  <div className="text-sm text-gray-500">
                    更新于：{format(new Date(solution.date), 'yyyy年MM月dd日', { locale: zhCN })}
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-6 md:shrink-0">
                  <span className="inline-flex items-center px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full">
                    查看详情 →
                  </span>
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
} 