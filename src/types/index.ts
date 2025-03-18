// 题解的难度级别
export type Difficulty = 'easy' | 'medium' | 'hard';

// 题解标签类型
export type Tag = string;

// 题解数据结构
export interface Solution {
  // 唯一标识符（URL路径）
  slug: string;
  // 题解标题
  title: string;
  // 发布/更新日期
  date: string;
  // 难度级别
  difficulty: Difficulty;
  // 简短摘要
  excerpt?: string;
  // 完整内容（Markdown格式）
  content: string;
  // 标签列表
  tags?: Tag[];
}

// 题解表单数据
export interface SolutionFormData {
  title: string;
  slug: string;
  difficulty: Difficulty;
  excerpt?: string;
  content: string;
  tags?: Tag[];
} 