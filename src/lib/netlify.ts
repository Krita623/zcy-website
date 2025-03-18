import getConfig from 'next/config';

// 获取Next.js配置
const { publicRuntimeConfig } = getConfig() || {
  publicRuntimeConfig: {}
};

// 触发Netlify构建的函数
export async function triggerNetlifyBuild(): Promise<boolean> {
  try {
    // 从环境变量获取Netlify构建钩子URL
    const netlifyBuildHook = publicRuntimeConfig?.NEXT_PUBLIC_NETLIFY_BUILD_HOOK 
      || process.env.NEXT_PUBLIC_NETLIFY_BUILD_HOOK;
    
    if (!netlifyBuildHook) {
      console.warn('Netlify构建钩子未配置，跳过构建触发');
      return false;
    }
    
    console.log('正在触发Netlify构建...');
    
    const response = await fetch(netlifyBuildHook, {
      method: 'POST',
    });
    
    if (response.ok) {
      console.log('Netlify构建已成功触发');
      return true;
    } else {
      console.error('触发Netlify构建失败', await response.text());
      return false;
    }
  } catch (error) {
    console.error('触发Netlify构建时发生错误:', error);
    return false;
  }
}

// 判断是否为生产环境
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
} 