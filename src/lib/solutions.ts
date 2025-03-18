import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Solution, SolutionFormData } from '../types';
import siteConfig from '../../site.config';
import { getFileContent, saveFileContent, deleteFile } from './github';
import { triggerNetlifyBuild, isProduction } from './netlify';

// 获取题解文件夹路径
const solutionsDirectory = path.join(process.cwd(), siteConfig.solutions.contentPath);

// GitHub仓库信息 - 添加到环境变量中
const GITHUB_OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER || '';
const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO || '';
const GITHUB_SOLUTIONS_PATH = process.env.NEXT_PUBLIC_GITHUB_SOLUTIONS_PATH || 'content/solutions';
const USE_GITHUB_API = process.env.NEXT_PUBLIC_USE_GITHUB_API === 'true';

// 确保目录存在
export function ensureSolutionsDirectoryExists() {
  if (!fs.existsSync(solutionsDirectory)) {
    fs.mkdirSync(solutionsDirectory, { recursive: true });
  }
}

// 获取所有题解
export async function getAllSolutions(): Promise<Solution[]> {
  try {
    ensureSolutionsDirectoryExists();
    
    // 读取目录中的所有文件
    const filenames = fs.readdirSync(solutionsDirectory);
    const solutions = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        // 从文件名中获取slug
        const slug = filename.replace(/\.md$/, '');
        
        // 获取题解数据
        const solution = getSolutionBySlug(slug);
        return solution;
      })
      .filter((solution): solution is Solution => solution !== null);
    
    // 按日期降序排序（最新的在前面）
    return solutions.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Error getting all solutions:', error);
    return [];
  }
}

// 通过slug获取单个题解
export function getSolutionBySlug(slug: string): Solution | null {
  try {
    ensureSolutionsDirectoryExists();
    
    const fullPath = path.join(solutionsDirectory, `${slug}.md`);
    
    // 如果文件不存在，返回null
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    // 读取文件内容
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // 使用gray-matter解析frontmatter元数据
    const { data, content } = matter(fileContents);
    
    // 验证必要的元数据
    if (!data.title || !data.date || !data.difficulty) {
      return null;
    }
    
    return {
      slug,
      title: data.title,
      date: data.date,
      difficulty: data.difficulty,
      excerpt: data.excerpt || '',
      content,
      tags: data.tags || [],
    };
  } catch (error) {
    console.error(`Error getting solution by slug "${slug}":`, error);
    return null;
  }
}

// 创建或更新题解
export async function saveSolution(formData: SolutionFormData, isEditing: boolean = false): Promise<{ success: boolean; error?: string }> {
  try {
    ensureSolutionsDirectoryExists();
    
    const { slug, title, difficulty, excerpt, content, tags } = formData;
    
    // 构建frontmatter
    const frontmatter = {
      title,
      date: new Date().toISOString(),
      difficulty,
      excerpt: excerpt || '',
      tags: tags || [],
    };
    
    // 将frontmatter和内容组合
    const fileContent = matter.stringify(content, frontmatter);
    
    // 文件路径
    const filePath = path.join(solutionsDirectory, `${slug}.md`);
    
    if (USE_GITHUB_API) {
      try {
        // GitHub中的路径
        const githubPath = `${GITHUB_SOLUTIONS_PATH}/${slug}.md`;
        
        let sha: string | undefined;
        
        // 如果是编辑，需要先获取文件SHA
        if (isEditing) {
          try {
            const fileData = await getFileContent(GITHUB_OWNER, GITHUB_REPO, githubPath);
            sha = fileData.sha;
          } catch (error) {
            console.warn(`File ${githubPath} not found in GitHub, will create it`);
          }
        }
        
        // 保存到GitHub
        await saveFileContent(
          GITHUB_OWNER,
          GITHUB_REPO,
          githubPath,
          fileContent,
          isEditing ? `更新题解: ${title}` : `新增题解: ${title}`,
          sha
        );
        
        // 同时保存到本地文件系统（作为缓存）
        fs.writeFileSync(filePath, fileContent);
        
        // 如果是生产环境，触发Netlify构建
        if (isProduction()) {
          console.log('正在触发Netlify构建...');
          await triggerNetlifyBuild();
        }
        
        return { success: true };
      } catch (error: any) {
        console.error('Error saving solution to GitHub:', error);
        
        // 尝试退回到本地保存
        fs.writeFileSync(filePath, fileContent);
        
        return { 
          success: false, 
          error: `GitHub API 操作失败: ${error.message || '未知错误'}. 已保存到本地，但未推送到 GitHub.` 
        };
      }
    } else {
      // 仅保存到本地文件系统
      fs.writeFileSync(filePath, fileContent);
      return { success: true };
    }
  } catch (error: any) {
    console.error('Error saving solution:', error);
    return { 
      success: false, 
      error: `保存题解失败: ${error.message || '未知错误'}` 
    };
  }
}

// 删除题解
export async function deleteSolution(slug: string): Promise<{ success: boolean; error?: string }> {
  try {
    ensureSolutionsDirectoryExists();
    
    const filePath = path.join(solutionsDirectory, `${slug}.md`);
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      return { success: false, error: '题解不存在' };
    }
    
    if (USE_GITHUB_API) {
      try {
        // GitHub中的路径
        const githubPath = `${GITHUB_SOLUTIONS_PATH}/${slug}.md`;
        
        // 先获取文件SHA
        try {
          const fileData = await getFileContent(GITHUB_OWNER, GITHUB_REPO, githubPath);
          
          // 从GitHub中删除
          await deleteFile(
            GITHUB_OWNER,
            GITHUB_REPO,
            githubPath,
            `删除题解: ${slug}`,
            fileData.sha
          );
          
          // 同时从本地文件系统删除
          fs.unlinkSync(filePath);
          
          // 如果是生产环境，触发Netlify构建
          if (isProduction()) {
            console.log('正在触发Netlify构建...');
            await triggerNetlifyBuild();
          }
          
          return { success: true };
        } catch (error: any) {
          // 如果GitHub中找不到文件，仅删除本地文件
          console.warn(`File ${githubPath} not found in GitHub, only deleting local file`);
          fs.unlinkSync(filePath);
          
          return { 
            success: true, 
            error: `警告: GitHub API 操作失败，但已从本地删除: ${error.message || '未知错误'}` 
          };
        }
      } catch (error: any) {
        console.error('Error deleting solution from GitHub:', error);
        
        // 尝试退回到仅本地删除
        fs.unlinkSync(filePath);
        
        return { 
          success: false, 
          error: `GitHub API 操作失败: ${error.message || '未知错误'}. 已从本地删除，但未从 GitHub 删除.` 
        };
      }
    } else {
      // 仅从本地文件系统删除
      fs.unlinkSync(filePath);
      return { success: true };
    }
  } catch (error: any) {
    console.error('Error deleting solution:', error);
    return { 
      success: false, 
      error: `删除题解失败: ${error.message || '未知错误'}` 
    };
  }
} 