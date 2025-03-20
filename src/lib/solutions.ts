import matter from 'gray-matter';
import { Solution, SolutionFormData } from '../types';
import siteConfig from '../../site.config';
import { getFileContent, saveFileContent, deleteFile } from './github';
import { triggerNetlifyBuild, isProduction } from './netlify';

// GitHub仓库信息 - 添加到环境变量中
const GITHUB_OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER || '';
const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO || '';
const GITHUB_SOLUTIONS_PATH = process.env.NEXT_PUBLIC_GITHUB_SOLUTIONS_PATH || 'content/solutions';
const USE_GITHUB_API = process.env.NEXT_PUBLIC_USE_GITHUB_API === 'true';

// 重试配置
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1秒

// 延迟函数
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 带重试的API调用
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = MAX_RETRIES
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        console.warn(`Attempt ${attempt} failed, retrying in ${RETRY_DELAY}ms...`);
        await delay(RETRY_DELAY * attempt); // 指数退避
      }
    }
  }
  
  throw lastError;
}

// 验证GitHub配置
function validateGitHubConfig() {
  if (!GITHUB_OWNER || !GITHUB_REPO) {
    throw new Error('GitHub configuration is incomplete. Please check your environment variables.');
  }
}

// 获取所有题解
export async function getAllSolutions(): Promise<Solution[]> {
  try {
    validateGitHubConfig();
    
    console.log('Fetching solutions from GitHub...');
    
    // 使用GitHub API获取文件列表
    const response = await withRetry(async () => {
      const res = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_SOLUTIONS_PATH}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch solutions list: ${res.status} ${res.statusText}`);
      }

      return res;
    });

    const files = await response.json();
    console.log(`Found ${files.length} files in solutions directory`);
    
    const solutions: Solution[] = [];

    // 并行获取所有题解内容
    const solutionPromises = files
      .filter((file: any) => file.type === 'file' && file.name.endsWith('.md'))
      .map(async (file: any) => {
        try {
          console.log(`Processing solution file: ${file.name}`);
          const { content } = await withRetry(() => 
            getFileContent(
              GITHUB_OWNER,
              GITHUB_REPO,
              `${GITHUB_SOLUTIONS_PATH}/${file.name}`
            )
          );
          
          const { data, content: markdownContent } = matter(content);
          return {
            slug: file.name.replace(/\.md$/, ''),
            title: data.title || '',
            date: data.date || new Date().toISOString(),
            difficulty: data.difficulty || 'medium',
            excerpt: data.excerpt || '',
            content: markdownContent,
            tags: data.tags || [],
          };
        } catch (error) {
          console.error(`Error processing solution ${file.name}:`, error);
          return null;
        }
      });

    const results = await Promise.allSettled(solutionPromises);
    solutions.push(...results
      .filter((result): result is PromiseFulfilledResult<Solution> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value)
    );

    console.log(`Successfully processed ${solutions.length} solutions`);
    return solutions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching solutions:', error);
    return [];
  }
}

// 获取单个题解
export async function getSolutionBySlug(slug: string): Promise<Solution | null> {
  try {
    validateGitHubConfig();
    
    const { content } = await withRetry(() => 
      getFileContent(
        GITHUB_OWNER,
        GITHUB_REPO,
        `${GITHUB_SOLUTIONS_PATH}/${slug}.md`
      )
    );
    
    const { data, content: markdownContent } = matter(content);
    return {
      slug,
      title: data.title || '',
      date: data.date || new Date().toISOString(),
      difficulty: data.difficulty || 'medium',
      excerpt: data.excerpt || '',
      content: markdownContent,
      tags: data.tags || [],
    };
  } catch (error) {
    console.error('Error fetching solution:', error);
    return null;
  }
}

// 创建新题解
export async function createSolution(solution: SolutionFormData): Promise<boolean> {
  try {
    validateGitHubConfig();
    
    // 验证必填字段
    if (!solution.title || !solution.slug || !solution.content) {
      throw new Error('Missing required fields');
    }

    const content = `---
title: ${solution.title}
date: ${new Date().toISOString()}
difficulty: ${solution.difficulty}
excerpt: ${solution.excerpt || ''}
tags: ${JSON.stringify(solution.tags || [])}
---

${solution.content}`;

    await withRetry(() => 
      saveFileContent(
        GITHUB_OWNER,
        GITHUB_REPO,
        `${GITHUB_SOLUTIONS_PATH}/${solution.slug}.md`,
        content,
        `Add solution: ${solution.title}`
      )
    );

    // 触发Netlify重新构建
    if (typeof isProduction === 'function' && isProduction()) {
      await triggerNetlifyBuild();
    }

    return true;
  } catch (error) {
    console.error('Error creating solution:', error);
    return false;
  }
}

// 更新题解
export async function updateSolution(slug: string, solution: SolutionFormData): Promise<boolean> {
  try {
    validateGitHubConfig();
    
    // 验证必填字段
    if (!solution.title || !solution.content) {
      throw new Error('Missing required fields');
    }

    const { sha } = await withRetry(() => 
      getFileContent(
        GITHUB_OWNER,
        GITHUB_REPO,
        `${GITHUB_SOLUTIONS_PATH}/${slug}.md`
      )
    );

    const content = `---
title: ${solution.title}
date: ${new Date().toISOString()}
difficulty: ${solution.difficulty}
excerpt: ${solution.excerpt || ''}
tags: ${JSON.stringify(solution.tags || [])}
---

${solution.content}`;

    await withRetry(() => 
      saveFileContent(
        GITHUB_OWNER,
        GITHUB_REPO,
        `${GITHUB_SOLUTIONS_PATH}/${slug}.md`,
        content,
        `Update solution: ${solution.title}`,
        sha
      )
    );

    // 触发Netlify重新构建
    if (typeof isProduction === 'function' && isProduction()) {
      await triggerNetlifyBuild();
    }

    return true;
  } catch (error) {
    console.error('Error updating solution:', error);
    return false;
  }
}

// 删除题解
export async function deleteSolution(slug: string): Promise<boolean> {
  try {
    validateGitHubConfig();

    const { sha } = await withRetry(() => 
      getFileContent(
        GITHUB_OWNER,
        GITHUB_REPO,
        `${GITHUB_SOLUTIONS_PATH}/${slug}.md`
      )
    );

    await withRetry(() => 
      deleteFile(
        GITHUB_OWNER,
        GITHUB_REPO,
        `${GITHUB_SOLUTIONS_PATH}/${slug}.md`,
        `Delete solution: ${slug}`,
        sha
      )
    );

    // 触发Netlify重新构建
    if (typeof isProduction === 'function' && isProduction()) {
      await triggerNetlifyBuild();
    }

    return true;
  } catch (error) {
    console.error('Error deleting solution:', error);
    return false;
  }
} 