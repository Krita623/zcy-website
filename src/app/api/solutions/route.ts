import { NextRequest, NextResponse } from 'next/server';
import { saveSolution, deleteSolution } from '../../../lib/solutions';
import { SolutionFormData } from '../../../types';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

// 验证用户身份
async function validateSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.name) {
    return false;
  }
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // 验证用户身份
    const isAuthenticated = await validateSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    const data = await request.json() as { formData: SolutionFormData, isEditing: boolean };
    
    console.log('API - Saving solution:', {
      isEditing: data.isEditing,
      slug: data.formData.slug,
      title: data.formData.title
    });
    
    // 调用保存逻辑
    const result = await saveSolution(data.formData, data.isEditing);
    
    if (!result.success) {
      console.log('API - Save solution failed:', result.error);
      return NextResponse.json(
        { error: result.error || '保存题解失败' },
        { status: 500 }
      );
    }
    
    console.log('API - Solution saved successfully.');
    
    return NextResponse.json({ 
      success: true,
      warning: result.error, // 可能包含警告但依然成功
      message: '题解保存成功'
    });
  } catch (error: any) {
    console.error('保存题解失败:', error);
    // 处理特定的GitHub API错误
    if (error.message && error.message.includes('already exists')) {
      return NextResponse.json(
        { 
          success: true, 
          warning: '文件已存在于GitHub仓库中，但本地保存成功',
          message: '题解保存成功'
        }
      );
    }
    
    return NextResponse.json(
      { error: `保存题解失败: ${error.message || '未知错误'}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // 验证用户身份
    const isAuthenticated = await validateSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json(
        { error: '缺少 slug 参数' },
        { status: 400 }
      );
    }
    
    console.log('API - Deleting solution:', slug);
    
    // 调用删除逻辑
    const result = await deleteSolution(slug);
    
    if (!result.success) {
      console.log('API - Delete solution failed:', result.error);
      return NextResponse.json(
        { error: result.error || '删除题解失败' },
        { status: 500 }
      );
    }
    
    console.log('API - Solution deleted successfully.');
    
    return NextResponse.json({ 
      success: true,
      warning: result.error, // 可能包含警告但依然成功
      message: '题解删除成功'
    });
  } catch (error: any) {
    console.error('删除题解失败:', error);
    
    // 处理特定的GitHub API错误
    if (error.message && error.message.includes('Not Found')) {
      return NextResponse.json(
        { 
          success: true, 
          warning: '文件已从GitHub仓库中删除，或不存在于GitHub仓库中',
          message: '题解删除成功'
        }
      );
    }
    
    return NextResponse.json(
      { error: `删除题解失败: ${error.message || '未知错误'}` },
      { status: 500 }
    );
  }
} 