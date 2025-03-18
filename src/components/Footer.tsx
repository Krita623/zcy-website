import React from 'react';
import Link from 'next/link';
import siteConfig from '../../site.config';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">
              &copy; {currentYear} {siteConfig.author}. 保留所有权利。
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href={siteConfig.social.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              GitHub
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>使用 Next.js 构建并托管在 Netlify 上</p>
        </div>
      </div>
    </footer>
  );
} 
