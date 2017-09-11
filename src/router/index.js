import Vue from 'vue'
import Router from 'vue-router'
import AuthForm from '@/components/auth/form'
import Items from '@/components/items/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/auth',
      name: 'Login',
      component: AuthForm
    },
    {
      path: '/items',
      name: 'Items',
      component: Items
    }
  ]
})
