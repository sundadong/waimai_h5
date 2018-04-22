import Vue from 'vue'
import DialogComponent from './index.vue'

const DialogConstructor = Vue.extend(DialogComponent)
let dialogPool = []

let defaultConfig = {
  title: '提示',
  content: '',
  showOverlay: true,
  closeOnClickOverlay: true,
  showCancelButton: true,
  cancelButtonText: '取消',
  cancelButtonClass: 'ydb-dialog-btn__default',
  showConfirmButton: true,
  confirmButtonText: '确定',
  confirmButtonClass: 'ydb-dialog-btn__primary',
  confirmButtonCallback: null
}

let getInstance = () => {
  if (dialogPool.length > 0) {
    let instance = dialogPool[0]
    dialogPool.splice(0, 1)
    return instance
  }
  return new DialogConstructor({
    el: document.createElement('div')
  })
}

let returnAnInstance = instance => {
  if (instance) {
    dialogPool.push(instance)
  }
}

const Dialog = (options = {}) => {
  let config = {
    ...defaultConfig,
    ...options
  }

  let instance = getInstance()

  instance.show = true
  Object.keys(config).forEach(key => {
    instance[key] = config[key]
  })

  returnAnInstance(instance)

  document.body.appendChild(instance.$el)
}

export default Dialog
