import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import siteConfig from '../../site.config';
import { Solution } from '../types';

interface SolutionCardProps {
  solution: Solution;
}

export default function SolutionCard({ solution }: SolutionCardProps) {
  const difficultyInfo = siteConfig.solutions.difficultyLevels[solution.difficulty];
  
  // 获取标签的中文名称
  const getTagLabel = (tagId: string): string => {
    const tag = siteConfig.solutions.tags.find(t => t.id === tagId);
    return tag ? tag.label : tagId;
  };
  
  return (
    <Link 
      href={`/solutions/${solution.slug}`} 
      className="block bg-white border rounded-lg overflow-hidden hover:shadow-md transition duration-200"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{solution.title}</h3>
          <span
            className="ml-2 shrink-0 px-2 py-1 rounded-full text-xs font-medium"
            style={{ 
              backgroundColor: `${difficultyInfo.color}20`, 
              color: difficultyInfo.color 
            }}
          >
            {difficultyInfo.label}
          </span>
        </div>
        
        {solution.excerpt && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{solution.excerpt}</p>
        )}
        
        {/* 显示标签 */}
        {solution.tags && solution.tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {solution.tags.slice(0, 3).map(tagId => (
              <span 
                key={tagId}
                className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
              >
                {getTagLabel(tagId)}
              </span>
            ))}
            {solution.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{solution.tags.length - 3}...</span>
            )}
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          {format(new Date(solution.date), 'yyyy年MM月dd日', { locale: zhCN })}
        </div>
      </div>
    </Link>
  );
} 