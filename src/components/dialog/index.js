import Vue from 'vue'
import DialogComponent from './index.vue'

const DialogConstructor = Vue.extend(DialogComponent)

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

const Dialog = (options = {}) => {
  let config = {
    ...defaultConfig,
    ...options
  }

  let instance = new DialogConstructor({
    el: document.createElement('div')
  })

  instance.show = true
  Object.keys(config).forEach(key => {
    instance[key] = config[key]
  })

  document.body.appendChild(instance.$el)
}

export default Dialog
