// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import auth from './services/AuthService'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.router = router

Vue.use(VueAxios, axios)

axios.defaults.baseURL = process.env.API_ENDPOINT
axios.interceptors.response.use((response) => {
  return response
}, function(error) {
  // Do something with response error
  if (error.response.status === 401) {
    console.log('unauthorized, logging out ...')
    auth.logout()
    router.replace('/login')
  }
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
