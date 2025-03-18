"use client";

import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import siteConfig from '../../../site.config';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  
  // 从 URL 中获取错误消息和回调 URL
  const error = searchParams.get('error');
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  
  useEffect(() => {
    // 页面加载时记录完整信息
    console.log('Login page loaded:', {
      pathname,
      fullUrl: typeof window !== 'undefined' ? window.location.href : 'SSR',
      sessionStatus: status,
      hasSession: !!session,
      // 使用更安全的方式处理 searchParams
      params: Object.fromEntries(Array.from(searchParams.entries())),
      referrer: typeof document !== 'undefined' ? document.referrer : 'SSR'
    });
    
    // 错误处理和调试信息
    if (error) {
      console.log('Error detected:', error);
      // 将 URLSearchParams 转换为对象 - 安全方式
      const paramsObj: Record<string, string> = {};
      Array.from(searchParams.entries()).forEach(([key, value]) => {
        paramsObj[key] = value;
      });
      console.log('All search params:', paramsObj);
      
      const debugData = {
        error,
        params: paramsObj,
        url: typeof window !== 'undefined' ? window.location.href : 'SSR',
        timestamp: new Date().toISOString(),
        sessionStatus: status,
        referrer: typeof document !== 'undefined' ? document.referrer : 'SSR'
      };
      
      setDebugInfo(JSON.stringify(debugData, null, 2));
    }
    
    // 如果用户已登录，且没有错误，自动重定向到首页或回调地址
    // 注释掉这段代码，可能是导致重定向循环的原因之一
    /*
    if (session && !error && status === 'authenticated') {
      router.push(callbackUrl);
    }
    */
  }, [error, searchParams, session, status, pathname, router, callbackUrl]);
  
  // 处理 GitHub 登录
  const handleGitHubLogin = async () => {
    setIsLoading(true);
    try {
      console.log('Initiating GitHub sign in...');
      // 使用更明确的参数
      await signIn('github', { 
        callbackUrl,
        redirect: true
      });
    } catch (error) {
      console.error('登录出错:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 添加一个使用不同参数的替代登录方法
  const handleAlternativeLogin = async () => {
    setIsLoading(true);
    try {
      console.log('Using alternative login...');
      // 直接使用 window.location.href 而不是 signIn 函数
      window.location.href = '/api/auth/signin/github';
    } catch (error) {
      console.error('替代登录出错:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 获取错误显示信息
  const getErrorMessage = (errorType: string | null): string => {
    if (!errorType) return '未知错误';
    
    switch(errorType) {
      case 'AccessDenied':
        return '您没有访问权限。只有授权的 GitHub 用户可以登录。';
      case 'undefined':
        return '登录页面加载出错。请尝试点击下方的登录按钮手动登录，或清除错误后重试。';
      case 'Configuration':
        return '系统配置错误，请联系管理员。';
      case 'OAuthSignin':
        return 'OAuth 签名过程中出错，请重试。';
      case 'OAuthCallback':
        return 'OAuth 回调过程中出错，请检查应用设置。';
      default:
        return `登录时发生错误 (${errorType})，请重试。`;
    }
  };
  
  // 清除错误参数的函数
  const clearErrorAndRetry = () => {
    // 移除 URL 中的 error 参数
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('error');
      window.history.replaceState({}, '', url.toString());
      // 重载页面
      window.location.reload();
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{siteConfig.title} 管理登录</h1>
          <p className="mt-2 text-gray-600">
            请使用 GitHub 账号登录管理题解内容
          </p>
        </div>
        
        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-md">
            <p>{getErrorMessage(error)}</p>
            {error === 'undefined' && (
              <div className="mt-2 space-y-2">
                <button 
                  onClick={clearErrorAndRetry}
                  className="text-blue-600 hover:underline"
                >
                  清除错误并重试
                </button>
                <div>
                  <p className="text-xs text-gray-600 mb-1">如果仍然遇到问题，请尝试：</p>
                  <button
                    onClick={handleAlternativeLogin}
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    使用替代登录方式
                  </button>
                </div>
              </div>
            )}
            {process.env.NODE_ENV === 'development' && debugInfo && (
              <details className="mt-2 text-xs">
                <summary>调试信息</summary>
                <pre className="mt-1 p-2 bg-gray-800 text-white rounded overflow-x-auto">
                  {debugInfo}
                </pre>
              </details>
            )}
          </div>
        )}
        
        <div className="space-y-3">
          <button
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className="flex items-center justify-center w-full px-4 py-3 space-x-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
            </svg>
            <span>{isLoading ? '登录中...' : '使用 GitHub 登录'}</span>
          </button>
          
          <div className="text-center pt-4">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              返回主页
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-center text-gray-500">
          <p>只有授权的管理员可以登录管理系统</p>
        </div>
      </div>
    </div>
  );
} 