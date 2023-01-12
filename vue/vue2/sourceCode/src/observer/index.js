import { ArrayMethods } from "./arr";

export function observer(data) {
  // 返回的data 必须是个对象
  if (typeof data !== 'object' || data === null) {
    return
  }
  
  return new Observer(data)
}
/* Object.defineProperty 缺点：只能劫持对象中的一个属性 */
class Observer {
  constructor(data) {
    Object.defineProperty(data, '__ob__', {
      enumerable: false,
      value: this
    })
    /* 判断是否为数组 */
    if (Array.isArray(data)) {
      data.__proto__ = ArrayMethods;
      this.observerArray(data) // 处理数组对象
    }else {
      this.walk(data)
    }
  }
  walk(data) {
    const keys = Object.keys(data)
    for (const key of keys) {
      const value = data[key];
      defineReactive(data, key, value)
    }
  }
  observerArray(data) {
    data.forEach(item => observer(item))
  }
}
/** 对对象中的属性进行劫持 */
function defineReactive(data, key, value) {
  observer(value)
  Object.defineProperty(data, key, {
    /* 获取值 */
    get() {
      return value
    },
    set(newValue) {
      if (newValue === value) return value
      // 如果设置的值是对象
      observer(newValue)
    }
  })
}
/**
 * 总结：
 * 对象
 * 1.Object.defineProperty 缺点：只能劫持对象中的一个属性
 * 2.遍历对象 user:{name:'li', home: {hello:''}}
 * 3.递归，set()
 * 
 * 数组
 * 1. 数组类型 [1,2,3] [{a:1,b:2},{...}]
 */