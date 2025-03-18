import React from 'react';
import siteConfig from '../../../site.config';

export const metadata = {
  title: '关于',
  description: '了解更多关于本站及作者的信息',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">关于本站</h1>
      
      <div className="prose prose-lg mb-8">
        <p>
          欢迎来到 {siteConfig.title}！这是一个专注于分享算法题解和编程知识的个人网站。
          作为一名{' '}
          <span className="font-medium">算法爱好者</span>，
          我希望通过这个平台记录学习过程并与他人分享。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">网站特点</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>详细的算法题解，包含思路分析和代码实现</li>
          <li>按难度分类的题目集合</li>
          <li>清晰的代码示例和图解</li>
          <li>不断更新的内容</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">关于作者</h2>
        <p>
          我是 {siteConfig.author}，一名热爱编程和算法的开发者。
          通过解决各种算法问题，我不断提升自己的编程能力和逻辑思维。
          创建这个网站的目的是记录自己的学习历程，同时也希望能帮助到其他学习算法的朋友。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">联系方式</h2>
        <p>
          如果你对网站内容有任何问题、建议或者想法，欢迎通过以下方式联系我：
        </p>
        
        <div className="flex items-center space-x-6 mt-4">
          <a 
            href={siteConfig.social.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:opacity-75"
            aria-label="GitHub"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          
          <a 
            href={`mailto:${siteConfig.social.email}`} 
            className="transition-all duration-300 hover:opacity-75"
            aria-label="Email"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
          
          <a 
            href={siteConfig.social.bilibili} 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:opacity-75 -mt-0.5"
            aria-label="Bilibili"
          >
            <svg width="27" height="27" viewBox="0 0 24 24" fill="#4B5563">
              <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 