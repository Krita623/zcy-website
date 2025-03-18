---
title: 两数之和（Two Sum）
date: '2025-03-17T11:03:20.706Z'
difficulty: easy
excerpt: 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。
tags:
  - math
---

# 两数之和（Two Sum）

## 题目描述

给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

**示例:**

```
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

## 解题思路

这道题可以使用哈希表（字典）来解决，时间复杂度为 O(n)。

1. 创建一个哈希表，用于存储每个元素的值和索引
2. 遍历数组，对于每个元素 `nums[i]`：
   - 计算目标值与当前元素的差值：`complement = target - nums[i]`
   - 检查哈希表中是否存在这个差值
   - 如果存在，返回差值的索引和当前元素的索引
   - 如果不存在，将当前元素及其索引添加到哈希表中
3. 继续遍历直到找到结果

## 代码实现

### Python 实现

```python
def twoSum(nums, target):
    # 创建一个字典来存储值和索引
    num_dict = {}
    
    # 遍历数组
    for i, num in enumerate(nums):
        # 计算互补值
        complement = target - num
        
        # 检查互补值是否在字典中
        if complement in num_dict:
            # 如果找到，返回两个索引
            return [num_dict[complement], i]
        
        # 将当前值和索引添加到字典
        num_dict[num] = i
    
    # 如果没有找到解，返回空列表（题目保证有解，所以不会执行到这里）
    return []
```

### JavaScript 实现

```javascript
function twoSum(nums, target) {
    // 创建一个Map来存储值和索引
    const numMap = new Map();
    
    // 遍历数组
    for (let i = 0; i < nums.length; i++) {
        // 计算互补值
        const complement = target - nums[i];
        
        // 检查互补值是否在Map中
        if (numMap.has(complement)) {
            // 如果找到，返回两个索引
            return [numMap.get(complement), i];
        }
        
        // 将当前值和索引添加到Map
        numMap.set(nums[i], i);
    }
    
    // 如果没有找到解，返回空数组（题目保证有解，所以不会执行到这里）
    return [];
}
```

### Java 实现

```java
public int[] twoSum(int[] nums, int target) {
    // 创建一个HashMap来存储值和索引
    Map<Integer, Integer> numMap = new HashMap<>();
    
    // 遍历数组
    for (int i = 0; i < nums.length; i++) {
        // 计算互补值
        int complement = target - nums[i];
        
        // 检查互补值是否在Map中
        if (numMap.containsKey(complement)) {
            // 如果找到，返回两个索引
            return new int[] { numMap.get(complement), i };
        }
        
        // 将当前值和索引添加到Map
        numMap.put(nums[i], i);
    }
    
    // 如果没有找到解，返回空数组（题目保证有解，所以不会执行到这里）
    return new int[0];
}
```

## 复杂度分析

- **时间复杂度**: O(n)，其中 n 是数组的长度。我们只需要遍历一次数组。
- **空间复杂度**: O(n)，最坏情况下，我们需要存储 n 个元素在哈希表中。

## 总结

这道题是一个经典的哈希表应用题目，通过一次遍历和哈希表的快速查找特性，我们可以在 O(n) 的时间复杂度内解决问题。这比暴力解法的 O(n²) 时间复杂度要高效得多。 
