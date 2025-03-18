"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import siteConfig from '../../site.config';
import AuthButton from './AuthButton';

export default function Header() {
  const pathname = usePathname();
  
  // 检查当前路径是否激活
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600 mb-4 sm:mb-0">
          {siteConfig.title}
        </Link>
        
        <nav className="flex items-center space-x-4">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-md text-base font-medium transition ${
                isActive(link.href)
                  ? 'bg-blue-100 text-blue-800' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="pl-2 ml-2 border-l">
            <AuthButton />
          </div>
        </nav>
      </div>
    </header>
  );
} 