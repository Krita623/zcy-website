import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '../../site.config';
import SolutionCard from '../components/SolutionCard';
import { getAllSolutions } from '../lib/solutions';

// 禁用页面缓存，确保每次访问都获取最新数据
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // 获取最近的题解，限制数量
  const solutions = await getAllSolutions();
  const recentSolutions = solutions.slice(0, siteConfig.solutions.homepageLimit);

  return (
    <div className="space-y-8">
      {/* 英雄区域 - 极简设计 */}
      <section className="pt-6 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6 border-2 border-gray-200 shadow-md">
            <Image 
              src="/profile.jpg" 
              alt={siteConfig.author} 
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-800">{siteConfig.author}</h1>
          <p className="text-2xl md:text-3xl text-gray-500 mb-8">
            {siteConfig.bio}
          </p>
          
          <div className="flex justify-center space-x-4">
            <a 
              href="#recent-solutions" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm text-base font-medium"
            >
              查看题解
            </a>
            <Link 
              href="/about" 
              className="px-6 py-3 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-300 text-base font-medium"
            >
              关于我
            </Link>
          </div>
        </div>
      </section>

      {/* 最近题解区域 */}
      <section id="recent-solutions">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">最近题解</h2>
          <Link href="/solutions" className="text-blue-600 hover:underline">
            查看全部 →
          </Link>
        </div>
        
        {recentSolutions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentSolutions.map((solution) => (
              <SolutionCard key={solution.slug} solution={solution} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10">暂无题解</p>
        )}
      </section>
    </div>
  );
} 