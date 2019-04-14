import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Elementui from 'element-ui'

Vue.config.productionTip = false

Vue.use(Elementui)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
