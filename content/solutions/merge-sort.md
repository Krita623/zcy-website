---
title: 归并排序（Merge Sort）
date: '2025-03-17T11:03:09.744Z'
difficulty: medium
excerpt: 归并排序是一种高效的、基于分治法的排序算法，本文详细讲解其原理与实现。
tags:
  - sorting
---

# 归并排序（Merge Sort）

## 算法介绍

归并排序是一种高效的、基于分治法（Divide and Conquer）的排序算法。它的基本思想是将待排序的数组分成两个子数组，分别对这两个子数组进行排序，然后将排序好的子数组合并成一个有序的数组。

归并排序的核心优势在于它保证了 O(n log n) 的时间复杂度，这在大规模数据排序中非常高效。

## 算法步骤

1. **分割（Divide）**：将待排序的数组分成两个大小大致相等的子数组。
2. **递归排序（Conquer）**：递归地对这两个子数组进行排序。
3. **合并（Merge）**：将两个已排序的子数组合并成一个有序的数组。

## 图解过程

假设我们有一个数组 `[38, 27, 43, 3, 9, 82, 10]`，归并排序的过程如下：

1. 首先将数组分成两部分：`[38, 27, 43, 3]` 和 `[9, 82, 10]`
2. 继续分割，直到每个子数组只有一个元素：
   - `[38]`, `[27]`, `[43]`, `[3]`, `[9]`, `[82]`, `[10]`
3. 开始合并：
   - 合并 `[38]` 和 `[27]` 得到 `[27, 38]`
   - 合并 `[43]` 和 `[3]` 得到 `[3, 43]`
   - 合并 `[9]` 和 `[82]` 得到 `[9, 82]`
   - `[10]` 保持不变
4. 继续合并：
   - 合并 `[27, 38]` 和 `[3, 43]` 得到 `[3, 27, 38, 43]`
   - 合并 `[9, 82]` 和 `[10]` 得到 `[9, 10, 82]`
5. 最后合并：
   - 合并 `[3, 27, 38, 43]` 和 `[9, 10, 82]` 得到最终排序结果 `[3, 9, 10, 27, 38, 43, 82]`

## 代码实现

### Python 实现

```python
def merge_sort(arr):
    # 基本情况：如果数组长度小于等于1，直接返回
    if len(arr) <= 1:
        return arr
    
    # 分割数组
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]
    
    # 递归排序两个子数组
    left = merge_sort(left)
    right = merge_sort(right)
    
    # 合并两个已排序的子数组
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    # 比较两个子数组的元素，并按顺序添加到结果数组
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # 添加剩余的元素
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result
```

### JavaScript 实现

```javascript
function mergeSort(arr) {
    // 基本情况：如果数组长度小于等于1，直接返回
    if (arr.length <= 1) {
        return arr;
    }
    
    // 分割数组
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    // 递归排序两个子数组
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let i = 0;
    let j = 0;
    
    // 比较两个子数组的元素，并按顺序添加到结果数组
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    // 添加剩余的元素
    return result.concat(left.slice(i)).concat(right.slice(j));
}
```

### Java 实现

```java
public class MergeSort {
    public static int[] mergeSort(int[] arr) {
        // 基本情况：如果数组长度小于等于1，直接返回
        if (arr.length <= 1) {
            return arr;
        }
        
        // 分割数组
        int mid = arr.length / 2;
        int[] left = Arrays.copyOfRange(arr, 0, mid);
        int[] right = Arrays.copyOfRange(arr, mid, arr.length);
        
        // 递归排序两个子数组
        left = mergeSort(left);
        right = mergeSort(right);
        
        // 合并两个已排序的子数组
        return merge(left, right);
    }
    
    private static int[] merge(int[] left, int[] right) {
        int[] result = new int[left.length + right.length];
        int i = 0, j = 0, k = 0;
        
        // 比较两个子数组的元素，并按顺序添加到结果数组
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result[k++] = left[i++];
            } else {
                result[k++] = right[j++];
            }
        }
        
        // 添加剩余的元素
        while (i < left.length) {
            result[k++] = left[i++];
        }
        
        while (j < right.length) {
            result[k++] = right[j++];
        }
        
        return result;
    }
}
```

## 复杂度分析

- **时间复杂度**: O(n log n)，其中 n 是数组的长度。
  - 分割数组的过程是 O(log n)
  - 每一层的合并操作是 O(n)
  - 总体时间复杂度是 O(n log n)
- **空间复杂度**: O(n)，需要额外的空间来存储临时数组。

## 归并排序的特点

1. **稳定性**：归并排序是稳定的排序算法，相等的元素在排序后相对位置不变。
2. **非原地排序**：归并排序不是原地排序算法，需要额外的空间。
3. **分治思想**：归并排序是分治算法的典型应用。
4. **适用场景**：
   - 适合处理大规模数据
   - 适合外部排序（当数据量太大，无法全部加载到内存中时）
   - 适合链表排序（可以实现 O(1) 的额外空间复杂度）

## 总结

归并排序是一种高效且稳定的排序算法，特别适合大规模数据的排序。它的时间复杂度始终保持在 O(n log n)，不会像快速排序那样在最坏情况下退化为 O(n²)。

虽然归并排序需要额外的空间，但在某些应用场景下，这个缺点可以被其稳定性和可预测的性能所抵消。 
