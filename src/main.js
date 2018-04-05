// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import Toast from '@/components/toast'
import Http from '@/util/http'

Vue.use(Toast)
Vue.prototype.$http = Http

Vue.config.productionTip = false

localStorage.setItem('access_token', '1249fijsdanr')

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

export default app
