import { compileToFunction } from './compile/index';
import { initState } from './initState'
/**
 * vue初次渲染 => 先初始化数据 => 将模板进行编译 => 变成render() => 生成虚拟节点 => 变成真实dom => 渲染到页面
 */
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    console.log('---', options);
    const vm = this;
    vm.$options = options;
    // 初始化状态
    initState(vm)

    // 渲染模板
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
  /**
   * vue模板编译 注：el必须要有
   * 渲染优先级
   * render => template => el
   */
  Vue.prototype.$mount = function (el) {
    console.log('mount');
    const vm = this;
    const options = vm.$options
    el = document.querySelector(el)
    if (!options.render) {
      const template = options.template
      if (!template && el) {
        // 获取HTML
        el = el.outerHTML
        compileToFunction(el)
      }
    }
  }
}