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
  cancelButtonClass: '',
  showConfirmButton: true,
  confirmButtonText: '确定',
  confirmButtonClass: '',
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
  document.querySelector('.app').style.overflowY = 'hidden'
  Object.keys(config).forEach(key => {
    instance[key] = config[key]
  })

  console.log(instance)

  document.body.appendChild(instance.$el)
}

export default Dialog
