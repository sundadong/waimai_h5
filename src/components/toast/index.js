import ToastComponent from './index.vue'

let Toast = {}

Toast.install = function (Vue) {
  const ToastConstructor = Vue.extend(ToastComponent)

  ToastConstructor.prototype.close = function () {
    this.visible = false
    clearTimeout(this.timer)
    this.$el.addEventListener('transitionend', function (e) {
      e.target && e.target.parentNode && e.target.parentNode.removeChild(e.target)
    })
  }

  Vue.prototype.$toast = function (options = {}) {
    let duration = options.duration || 3000

    if (typeof options === 'string') {
      options = {
        message: options
      }
    }

    let instance = new ToastConstructor({
      data: options
    })

    instance.vm = instance.$mount()

    instance.vm.visible = true

    document.body.appendChild(instance.vm.$el)

    instance.timer = setTimeout(function () {
      instance.close()
    }, duration)

    return instance.vm
  }
}

export default Toast
