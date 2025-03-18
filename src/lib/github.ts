import { getSession } from 'next-auth/react';
import getConfig from 'next/config';

// 获取Next.js配置
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig() || {
  serverRuntimeConfig: {},
  publicRuntimeConfig: {}
};

// GitHub API 基础URL
const GITHUB_API_URL = 'https://api.github.com';

// 从配置中获取GitHub仓库信息
const GITHUB_OWNER = publicRuntimeConfig?.NEXT_PUBLIC_GITHUB_OWNER || process.env.NEXT_PUBLIC_GITHUB_OWNER;
const GITHUB_REPO = publicRuntimeConfig?.NEXT_PUBLIC_GITHUB_REPO || process.env.NEXT_PUBLIC_GITHUB_REPO;

interface GitHubFileResponse {
  content: string;
  sha: string;
  name?: string;
  path?: string;
  size?: number;
  url?: string;
  html_url?: string;
  git_url?: string;
  download_url?: string;
  type?: string;
  _links?: {
    self: string;
    git: string;
    html: string;
  };
}

// 错误处理助手
class GitHubAPIError extends Error {
  status: number;
  response: any;

  constructor(message: string, status: number, response: any) {
    super(message);
    this.name = 'GitHubAPIError';
    this.status = status;
    this.response = response;
  }
}

// 获取访问令牌的函数
async function getAccessToken(): Promise<string | null> {
  // 客户端环境下通过会话获取
  if (typeof window !== 'undefined') {
    const session = await getSession();
    return session?.accessToken || null;
  }
  
  // 导入服务端会话相关模块
  // 注意：这些导入和使用只会在服务端执行
  try {
    const { getServerSession } = await import('next-auth');
    const { authOptions } = await import('../lib/auth');
    const session = await getServerSession(authOptions);
    return session?.accessToken || null;
  } catch (error) {
    console.error('Error getting server session:', error);
    return null;
  }
}

// 获取GitHub存储库文件内容
export async function getFileContent(
  owner: string = GITHUB_OWNER,
  repo: string = GITHUB_REPO,
  path: string,
  branch: string = 'main'
): Promise<{ content: string; sha: string }> {
  try {
    // 获取OAuth访问令牌
    const token = await getAccessToken();
    
    console.log("GitHub API Debug - Read - Owner:", owner);
    console.log("GitHub API Debug - Read - Repo:", repo);
    console.log("GitHub API Debug - Read - Path:", path);
    console.log("GitHub API Debug - Read - Token exists:", !!token);

    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (token) {
      headers['Authorization'] = `token ${token}`;
    } else {
      console.warn('No GitHub token found. Authentication required for operation.');
      throw new Error('未获取GitHub授权。请确保您已登录并授权应用使用GitHub API。');
    }

    const apiUrl = `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    console.log("GitHub API Debug - Read - API URL:", apiUrl);

    const response = await fetch(
      apiUrl,
      { headers }
    );
    
    const responseText = await response.text();
    console.log("GitHub API Debug - Read - Response Status:", response.status);
    
    // 响应太长可能影响控制台输出，只记录一部分
    if (responseText.length > 500) {
      console.log("GitHub API Debug - Read - Response Text (truncated):", 
        responseText.substring(0, 500) + "...");
    } else {
      console.log("GitHub API Debug - Read - Response Text:", responseText);
    }
    
    // 尝试解析响应为JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse read response as JSON:", e);
      throw new Error(`Failed to parse GitHub API read response: ${responseText}`);
    }

    if (!response.ok) {
      console.error("GitHub API Read Error:", data);
      throw new GitHubAPIError(
        `Failed to get file content: ${data?.message || 'Unknown error'}`,
        response.status,
        data
      );
    }

    if (!data.content || !data.sha) {
      throw new Error(`File content or SHA missing in GitHub response: ${JSON.stringify(data)}`);
    }
    
    // GitHub API返回的内容是Base64编码的
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    
    return {
      content,
      sha: data.sha,
    };
  } catch (error: any) {
    console.error('Error getting file content from GitHub:', error);
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new Error(`Failed to get file content from GitHub: ${error.message || 'Unknown error'}`);
  }
}

// 将内容保存到GitHub存储库文件
export async function saveFileContent(
  owner: string = GITHUB_OWNER,
  repo: string = GITHUB_REPO,
  path: string,
  content: string,
  message: string,
  sha?: string,
  branch: string = 'main'
): Promise<{ sha: string; content: string }> {
  try {
    // 获取OAuth访问令牌
    const token = await getAccessToken();
    
    console.log("GitHub API Debug - Owner:", owner);
    console.log("GitHub API Debug - Repo:", repo);
    console.log("GitHub API Debug - Path:", path);
    console.log("GitHub API Debug - Token exists:", !!token);

    if (!token) {
      throw new Error('未获取GitHub授权。请确保您已登录并授权应用使用GitHub API。');
    }

    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
    };

    // 将内容编码为Base64
    const contentBase64 = Buffer.from(content, 'utf-8').toString('base64');

    const body: Record<string, any> = {
      message,
      content: contentBase64,
      branch,
    };

    // 如果提供了SHA，这是更新现有文件
    if (sha) {
      body.sha = sha;
    }

    const apiUrl = `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`;
    console.log("GitHub API Debug - API URL:", apiUrl);
    console.log("GitHub API Debug - Request Body:", JSON.stringify(body));

    const response = await fetch(
      apiUrl,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      }
    );

    const responseText = await response.text();
    console.log("GitHub API Debug - Response Status:", response.status);
    console.log("GitHub API Debug - Response Text:", responseText);

    // 尝试解析响应为JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse response as JSON:", e);
      // 如果响应不是合法的JSON但状态码是成功的，我们认为操作成功了
      if (response.ok) {
        return {
          sha: sha || 'unknown',
          content: content,
        };
      }
      throw new Error(`Failed to parse GitHub API response: ${responseText}`);
    }

    if (!response.ok) {
      console.error("GitHub API Error:", data);
      throw new GitHubAPIError(
        `Failed to save file: ${data.message || 'Unknown error'}`,
        response.status,
        data
      );
    }

    // 安全地访问嵌套属性
    const resultSha = data?.content?.sha || sha || 'unknown';
    const resultContent = data?.content?.content 
      ? Buffer.from(data.content.content, 'base64').toString('utf-8')
      : content;
    
    return {
      sha: resultSha,
      content: resultContent,
    };
  } catch (error: any) {
    console.error('Error saving file to GitHub:', error);
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new Error(`Failed to save file to GitHub: ${error.message || 'Unknown error'}`);
  }
}

// 删除GitHub存储库文件
export async function deleteFile(
  owner: string = GITHUB_OWNER,
  repo: string = GITHUB_REPO,
  path: string,
  message: string,
  sha: string,
  branch: string = 'main'
): Promise<boolean> {
  try {
    // 获取OAuth访问令牌
    const token = await getAccessToken();
    
    console.log("GitHub API Debug - Delete - Owner:", owner);
    console.log("GitHub API Debug - Delete - Repo:", repo);
    console.log("GitHub API Debug - Delete - Path:", path);
    console.log("GitHub API Debug - Delete - Token exists:", !!token);

    if (!token) {
      throw new Error('未获取GitHub授权。请确保您已登录并授权应用使用GitHub API。');
    }

    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
    };

    const body = {
      message,
      sha,
      branch,
    };
    
    const apiUrl = `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`;
    console.log("GitHub API Debug - Delete - API URL:", apiUrl);
    console.log("GitHub API Debug - Delete - Body:", JSON.stringify(body));

    const response = await fetch(
      apiUrl,
      {
        method: 'DELETE',
        headers,
        body: JSON.stringify(body),
      }
    );
    
    const responseText = await response.text();
    console.log("GitHub API Debug - Delete - Response Status:", response.status);
    console.log("GitHub API Debug - Delete - Response Text:", responseText);
    
    // 如果响应成功但没有内容或不是JSON，仍然认为是成功的
    if (response.ok && (!responseText || responseText.trim() === '')) {
      return true;
    }
    
    // 尝试解析响应为JSON
    let data;
    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch (e) {
      console.error("Failed to parse delete response as JSON:", e);
      // 如果响应不是合法的JSON但状态码是成功的，我们认为操作成功了
      if (response.ok) {
        return true;
      }
      throw new Error(`Failed to parse GitHub API delete response: ${responseText}`);
    }

    if (!response.ok) {
      console.error("GitHub API Delete Error:", data);
      throw new GitHubAPIError(
        `Failed to delete file: ${data?.message || 'Unknown error'}`,
        response.status,
        data
      );
    }

    return true;
  } catch (error: any) {
    console.error('Error deleting file from GitHub:', error);
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new Error(`Failed to delete file from GitHub: ${error.message || 'Unknown error'}`);
  }
} 