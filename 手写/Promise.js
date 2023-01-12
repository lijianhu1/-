const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
  /**
   * 
   * @param {Function} executor 任务执行器， 立即执行 
   */
  constructor(executor) {
    this._status = PENDING; // 状态
    this._value = undefined // 数据
    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch (error) {
      this._reject(error)
    }
  }
  /**
   * 运行一个微队列任务
   * @param {*} callback 
   */
  runMicroTask(callback) {
    // 判断node环境
    if (process && process.nextTick) {
      process.nextTick(callback)
    }else if(MutationObserver) {
      const p = document.createElement('p');
      const observer = new MutationObserver(callback)
      observer.observe(p, {
        childList: true
      })
      p.innerHTML = 1
    }else {
      setTimeout(() => {
        callback()
      }, 0);
    }
  }
  /**
   * 
   * @param {*} newStatus 新的状态
   * @param {*} value 新的值
   */
  _changeStatus(newStatus, value) {
    if (this._status!==PENDING) {
      return
    }
    this._status = newStatus
    this._value = value
  }
/**
 * 标记当前任务完成
 * @param {any} data 任务成功相关参数
 */
  _resolve(data) {
    this._changeStatus(FULFILLED, data)
  }
/**
 * 标记当前任务失败
 * @param {any} reason 任务失败相关数据
 */
  _reject(reason) {
    this._changeStatus(REJECTED, reason)
  }
}

const pro = new MyPromise((resolve, reject) => {
  resolve(66)
})
pro.then(res => {
  console.log('res',res);
})