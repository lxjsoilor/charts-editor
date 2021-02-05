import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import VueGridLayout from 'vue-grid-layout';
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css
import '@/assets/fonts/css/font-awesome.css';

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use(VCharts)
Vue.component('GridLayout', VueGridLayout.GridLayout)
Vue.component('GridItem', VueGridLayout.GridItem)
Vue.config.productionTip = false

Vue.directive('identify', {
  bind: function(el, binding) {
    var name = binding.value.name
    Vue.nextTick(function() {
      if (store.state.admin.userInfo.super == 1 || store.state.admin.roles.indexOf('owner') != -1) return
      var hasPermission = store.state.admin.access.reduce((accumulator, currentValue) => {
        return (currentValue.name == name) || accumulator
      }, false)
      if (!hasPermission) {
        el.className += ' is-disabled'
        el.disabled = 'disabled'
      }
    })
  }
})

// 判断是否是移动端
Vue.prototype.$isMobile = function() {
  const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag
}

// 添加事件总线
Vue.prototype.$event = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
