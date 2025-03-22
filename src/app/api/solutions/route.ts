import { NextRequest, NextResponse } from 'next/server';
import { createSolution, updateSolution, deleteSolution, getAllSolutions, getSolutionBySlug } from '../../../lib/solutions';
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

// 获取题解 - 无需身份验证
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    // 如果有指定slug，则获取特定题解
    if (slug) {
      const solution = await getSolutionBySlug(slug);
      
      if (!solution) {
        return NextResponse.json(
          { error: '未找到题解' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(solution);
    }
    
    // 否则获取所有题解
    const solutions = await getAllSolutions();
    return NextResponse.json(solutions);
  } catch (error: any) {
    console.error('获取题解失败:', error);
    return NextResponse.json(
      { error: `获取题解失败: ${error.message || '未知错误'}` },
      { status: 500 }
    );
  }
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
    const result = data.isEditing 
      ? await updateSolution(data.formData.slug, data.formData)
      : await createSolution(data.formData);
    
    if (!result) {
      console.log('API - Save solution failed');
      return NextResponse.json(
        { error: '保存题解失败' },
        { status: 500 }
      );
    }
    
    console.log('API - Solution saved successfully.');
    
    return NextResponse.json({ 
      success: true,
      message: '题解保存成功'
    });
  } catch (error: any) {
    console.error('保存题解失败:', error);
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
    
    if (!result) {
      console.log('API - Delete solution failed');
      return NextResponse.json(
        { error: '删除题解失败' },
        { status: 500 }
      );
    }
    
    console.log('API - Solution deleted successfully.');
    
    return NextResponse.json({ 
      success: true,
      message: '题解删除成功'
    });
  } catch (error: any) {
    console.error('删除题解失败:', error);
    return NextResponse.json(
      { error: `删除题解失败: ${error.message || '未知错误'}` },
      { status: 500 }
    );
  }
} 