import { observer } from "./observer/index";

export function initState(vm) {
  const opts = vm.$options
  if (opts.props) {
    initProps(vm)
  }
  if (opts) {
    initData(vm)
  }
}
/* props 初始化 */
function initProps(vm) {
  console.log('data init');
}
/**
 *  data 初始化 
*/
function initData(vm) {
  let data = vm.$options.data;
  /**
   * data可能是对象，也可能是函数
   * 需要改变data的this指向，指向Vue实例
   */
  data = vm._data = typeof data === 'function' ? data.call(vm) : data;
  // 对数据进行劫持
  // 将数据上所有属性代理到实例上
  for (const key in data) {
    proxy(vm, '_data', key)
  }
  observer(data)
}
function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key]
    },
    set(newVal) {
      vm[source][key] = newVal
    }
  })
}