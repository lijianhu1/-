// 重写数组方法
/**
 * 1. 获取原来数组方法
 */
const oldArrayProtoMethods = Array.prototype;
/**
 * 2. 继承数组
 */
export const ArrayMethods = Object.create(oldArrayProtoMethods);
/**
 * 3. 劫持
 */
const methods = ['push', 'pop', 'unshift', 'shift', 'splice'];
methods.forEach(item => {
  ArrayMethods[item] = function(...args) {
    const result = oldArrayProtoMethods[item].apply(this, args);
    /* 劫持数组 */
    let inserted;
    switch (item) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
        case 'splice':
          inserted = args.slice(2)
    }
    if (inserted) {
      const ob = this.__ob__
      ob.observerArray(inserted)
    }
    return result;
  }
})