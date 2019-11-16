import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

/// 전역 변수 설정
Vue.mixin({
  data: function() {
    return {
      get WEB_API_URL() {
        var url
        var is_test = true  // true when you test
        if (is_test) { // For test purpose
          // When web browser get "Cross-Origin Read Blocking" error,
          // Set HTTP header "Access-Control-Allow-Origin: *\r\n" from server side.
          url = 'http://localhost:3000'
        } else {
          url = ''
        }
        return url;
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
