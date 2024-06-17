// 什么是LRU缓存？
// LRU缓存是一种按照最近使用时间来淘汰数据的策略。当缓存空间达到上限时，如果要添加新的数据，就需要将最长时间没有被访问的数据从缓存中移除。

// 如何实现LRU缓存？
// 实现LRU缓存可以使用一个哈希表和一个双向链表。哈希表用于快速查找缓存中的数据，双向链表用于记录数据的访问顺序。当有数据被访问时，将其移动到链表的头部；当缓存已满并需要添加新数据时，将链表尾部的数据移除。

// 在JavaScript中如何实现LRU缓存？
// 在JavaScript中，可以使用Map对象和双向链表来实现LRU缓存。Map对象用于保存缓存数据，键为缓存的键，值为缓存的值。双向链表用于记录缓存数据的访问顺序，头部表示最近访问的数据，尾部表示最久未访问的数据。

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key){
    if(this.cache.has(key)){
      let value = this.cache.get(key)
      this.cache.delete(key)
      this.cache.set(key,value)
      return value
    }
    return -1
  }
  set(key,value){
    if(this.cache.has(key)){
      this.cache.delete(key)
    }else if(this.cache.size>= this.capacity{
      let oldestKey = this.cache.keys().next().value
      this.cache.delete(oldestKey)
    }
    this.cache.set(key,value)
  }

  // get(key){
  //   let data = this.data
  //   if(!data.has(key)){
  //     return null
  //   }
  //   let value = data.get(key)
  //   data.delete(key)
  //   data.set(key,value)
  // }
  // set(kery, value) {
  //   let data = this.data
  //   if(data.has(key)){
  //     data.delete(key)
  //   }
  //   data.set(key,value)
  //   if(data.size>=this.length){
  //     let delKey = data.keys().next.value
  //     data.delete(delKey)
  //   }
  // }

}
