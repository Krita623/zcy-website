---
title: LRU缓存（LRU Cache）
date: '2025-03-17T11:02:26.027Z'
difficulty: hard
excerpt: 设计并实现一个LRU（最近最少使用）缓存机制，支持获取数据get和写入数据put操作。
tags:
  - math
---

# LRU缓存（LRU Cache）

## 题目描述

设计并实现一个 LRU (最近最少使用) 缓存机制。它应该支持以下操作：获取数据 `get` 和写入数据 `put`。

获取数据 `get(key)` - 如果关键字 (key) 存在于缓存中，则获取关键字的值（总是正数），否则返回 -1。

写入数据 `put(key, value)` - 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字/值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

**进阶：**

你是否可以在 O(1) 时间复杂度内完成这两种操作？

**示例:**

```
LRUCache cache = new LRUCache(2); // 缓存容量为 2

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 返回  1
cache.put(3, 3);    // 该操作会使得关键字 2 作废
cache.get(2);       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得关键字 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回  3
cache.get(4);       // 返回  4
```

## 解题思路

要实现一个 O(1) 时间复杂度的 LRU 缓存，我们需要结合使用两种数据结构：

1. **哈希表（Hash Map）**：用于快速查找缓存中是否存在某个键，实现 O(1) 的查找。
2. **双向链表（Doubly Linked List）**：用于维护缓存中元素的顺序，最近使用的元素放在链表头部，最久未使用的元素放在链表尾部。

当我们需要执行以下操作时：

- **get(key)**：
  1. 如果 key 不存在，返回 -1
  2. 如果 key 存在，将对应的节点移动到链表头部（表示最近使用），并返回值

- **put(key, value)**：
  1. 如果 key 已存在，更新值，并将节点移动到链表头部
  2. 如果 key 不存在：
     - 如果缓存已满，删除链表尾部节点（最久未使用的），并从哈希表中移除对应的条目
     - 创建新节点，添加到链表头部，并在哈希表中添加对应的条目

## 代码实现

### Python 实现

```python
class DLinkedNode:
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cache = {}  # 哈希表
        self.size = 0
        self.capacity = capacity
        # 使用伪头部和伪尾部节点
        self.head = DLinkedNode()
        self.tail = DLinkedNode()
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        # 如果 key 存在，先通过哈希表定位，再移到头部
        node = self.cache[key]
        self._move_to_head(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key not in self.cache:
            # 如果 key 不存在，创建一个新的节点
            node = DLinkedNode(key, value)
            # 添加进哈希表
            self.cache[key] = node
            # 添加至双向链表的头部
            self._add_to_head(node)
            self.size += 1
            if self.size > self.capacity:
                # 如果超出容量，删除双向链表的尾部节点
                removed = self._remove_tail()
                # 删除哈希表中对应的项
                self.cache.pop(removed.key)
                self.size -= 1
        else:
            # 如果 key 存在，先通过哈希表定位，再修改 value，并移到头部
            node = self.cache[key]
            node.value = value
            self._move_to_head(node)
    
    def _add_to_head(self, node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node
    
    def _remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _move_to_head(self, node):
        self._remove_node(node)
        self._add_to_head(node)

    def _remove_tail(self):
        node = self.tail.prev
        self._remove_node(node)
        return node
```

### Java 实现

```java
import java.util.HashMap;
import java.util.Map;

class LRUCache {
    class DLinkedNode {
        int key;
        int value;
        DLinkedNode prev;
        DLinkedNode next;
        public DLinkedNode() {}
        public DLinkedNode(int _key, int _value) {key = _key; value = _value;}
    }

    private Map<Integer, DLinkedNode> cache = new HashMap<Integer, DLinkedNode>();
    private int size;
    private int capacity;
    private DLinkedNode head, tail;

    public LRUCache(int capacity) {
        this.size = 0;
        this.capacity = capacity;
        // 使用伪头部和伪尾部节点
        head = new DLinkedNode();
        tail = new DLinkedNode();
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        DLinkedNode node = cache.get(key);
        if (node == null) {
            return -1;
        }
        // 如果 key 存在，先通过哈希表定位，再移到头部
        moveToHead(node);
        return node.value;
    }

    public void put(int key, int value) {
        DLinkedNode node = cache.get(key);
        if (node == null) {
            // 如果 key 不存在，创建一个新的节点
            DLinkedNode newNode = new DLinkedNode(key, value);
            // 添加进哈希表
            cache.put(key, newNode);
            // 添加至双向链表的头部
            addToHead(newNode);
            ++size;
            if (size > capacity) {
                // 如果超出容量，删除双向链表的尾部节点
                DLinkedNode tail = removeTail();
                // 删除哈希表中对应的项
                cache.remove(tail.key);
                --size;
            }
        }
        else {
            // 如果 key 存在，先通过哈希表定位，再修改 value，并移到头部
            node.value = value;
            moveToHead(node);
        }
    }

    private void addToHead(DLinkedNode node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(DLinkedNode node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToHead(DLinkedNode node) {
        removeNode(node);
        addToHead(node);
    }

    private DLinkedNode removeTail() {
        DLinkedNode res = tail.prev;
        removeNode(res);
        return res;
    }
}
```

### JavaScript 实现

```javascript
class DLinkedNode {
    constructor(key = 0, value = 0) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.cache = new Map();
        this.size = 0;
        this.capacity = capacity;
        // 使用伪头部和伪尾部节点
        this.head = new DLinkedNode();
        this.tail = new DLinkedNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }
        // 如果 key 存在，先通过哈希表定位，再移到头部
        const node = this.cache.get(key);
        this._moveToHead(node);
        return node.value;
    }

    put(key, value) {
        if (!this.cache.has(key)) {
            // 如果 key 不存在，创建一个新的节点
            const node = new DLinkedNode(key, value);
            // 添加进哈希表
            this.cache.set(key, node);
            // 添加至双向链表的头部
            this._addToHead(node);
            this.size++;
            if (this.size > this.capacity) {
                // 如果超出容量，删除双向链表的尾部节点
                const removed = this._removeTail();
                // 删除哈希表中对应的项
                this.cache.delete(removed.key);
                this.size--;
            }
        } else {
            // 如果 key 存在，先通过哈希表定位，再修改 value，并移到头部
            const node = this.cache.get(key);
            node.value = value;
            this._moveToHead(node);
        }
    }

    _addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }

    _removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    _moveToHead(node) {
        this._removeNode(node);
        this._addToHead(node);
    }

    _removeTail() {
        const node = this.tail.prev;
        this._removeNode(node);
        return node;
    }
}
```

## 复杂度分析

- **时间复杂度**：O(1)
  - get 操作：哈希表查找 O(1)，移动节点到链表头部 O(1)
  - put 操作：哈希表查找/插入 O(1)，链表操作 O(1)

- **空间复杂度**：O(capacity)
  - 哈希表和双向链表最多存储 capacity + 1 个元素

## 设计要点

1. **为什么使用双向链表而不是单向链表？**
   - 在双向链表中，我们可以直接访问节点的前驱，这使得删除操作的时间复杂度为 O(1)
   - 在单向链表中，要删除一个节点，我们需要找到它的前驱，这需要 O(n) 的时间

2. **为什么使用伪头部和伪尾部节点？**
   - 使用伪头部和伪尾部节点可以避免处理边界情况
   - 例如，不需要检查是否为第一个节点或最后一个节点

3. **为什么在哈希表中存储节点而不仅仅是值？**
   - 存储节点可以在 O(1) 时间内直接访问到链表中的节点
   - 这样我们可以在 O(1) 时间内执行移动节点等操作

## 总结

LRU 缓存是一种常见的缓存淘汰策略，它在计算机系统中有广泛的应用。通过结合哈希表和双向链表，我们可以实现一个高效的 LRU 缓存，满足 O(1) 时间复杂度的要求。

这个问题是数据结构设计的经典题目，它考察了对哈希表和链表的理解和应用能力，以及如何将不同的数据结构结合起来解决复杂问题的能力。
