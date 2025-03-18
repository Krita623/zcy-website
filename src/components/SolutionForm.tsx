"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Solution, SolutionFormData, Difficulty, Tag } from '../types';
import siteConfig from '../../site.config';

interface SolutionFormProps {
  initialData?: Solution;
  isEditing: boolean;
}

export default function SolutionForm({ initialData, isEditing }: SolutionFormProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState<SolutionFormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    difficulty: initialData?.difficulty || 'medium',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    tags: initialData?.tags || [],
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '请输入标题';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = '请输入URL标识';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'URL标识只能包含小写字母、数字和连字符';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = '请输入内容';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleTagChange = (tagId: string) => {
    setFormData(prev => {
      const currentTags = prev.tags || [];
      
      if (currentTags.includes(tagId)) {
        return {
          ...prev,
          tags: currentTags.filter(t => t !== tagId)
        };
      }
      
      return {
        ...prev,
        tags: [...currentTags, tagId]
      };
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/solutions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          isEditing
        }),
      });

      // 即使响应状态不是成功，也尝试解析响应体
      const result = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        // 如果服务器返回了具体错误信息，使用它
        throw new Error(result.error || 'API 请求失败');
      }
      
      // 如果有警告但操作成功，显示警告
      if (result.warning) {
        console.warn('保存操作警告:', result.warning);
        alert(`题解已保存，但有警告: ${result.warning}`);
      } else if (result.message) {
        alert(result.message);
      } else {
        alert('题解已成功保存');
      }
      
      // 给服务器一些时间处理更改
      setTimeout(() => {
        window.location.href = '/admin';
      }, 500);
    } catch (error: any) {
      console.error('保存题解失败', error);
      
      // 提供更友好的错误消息
      if (error.message.includes('未获取GitHub授权')) {
        alert('保存题解失败: 您需要登录并授权访问GitHub仓库。请重新登录并确保授予足够的权限。');
      } else {
        alert(`保存题解失败: ${error.message || '未知错误'}`);
      }
      
      setIsSubmitting(false);
    }
  };
  
  const generateSlug = () => {
    if (formData.title && !isEditing) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')  // 移除特殊字符
        .replace(/\s+/g, '-')      // 替换空格为连字符
        .replace(/-+/g, '-');      // 替换多个连字符为单个连字符
      
      setFormData(prev => ({
        ...prev,
        slug
      }));
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          标题
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={generateSlug}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
          URL标识
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          disabled={isEditing || isSubmitting}
        />
        {errors.slug && (
          <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          用于URL路径，例如: /solutions/two-sum
        </p>
      </div>
      
      <div>
        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
          难度
        </label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          disabled={isSubmitting}
        >
          {Object.entries(siteConfig.solutions.difficultyLevels).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
          摘要（可选）
        </label>
        <input
          type="text"
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          disabled={isSubmitting}
        />
        <p className="mt-1 text-sm text-gray-500">
          简短描述，显示在列表中
        </p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          相关标签
        </label>
        <div className="flex flex-wrap gap-2">
          {siteConfig.solutions.tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => handleTagChange(tag.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                formData.tags?.includes(tag.id)
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-500">选择与题解相关的标签，可多选</p>
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          内容（Markdown）
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={15}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 font-mono"
          disabled={isSubmitting}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content}</p>
        )}
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          取消
        </button>
        <button
          type="submit"
          className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? '保存中...' : isEditing ? '更新题解' : '创建题解'}
        </button>
      </div>
    </form>
  );
} 