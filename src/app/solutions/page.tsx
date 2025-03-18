import React from 'react';
import Link from 'next/link';
import { getAllSolutions } from '../../lib/solutions';
import SolutionList from '../../components/SolutionList';

export const metadata = {
  title: '题解列表',
  description: '浏览所有编程题解，包括算法、数据结构等各种类型的题目',
};

export default async function SolutionsPage() {
  const solutions = await getAllSolutions();
  
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">所有题解</h1>
        <p className="text-gray-600 mt-2">
          浏览我的编程题解收集，按时间排序。
        </p>
      </div>
      
      {solutions.length > 0 ? (
        <SolutionList solutions={solutions} />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-500">暂无题解</h3>
          <p className="mt-2 text-gray-400">题解将很快添加</p>
        </div>
      )}
    </div>
  );
} 