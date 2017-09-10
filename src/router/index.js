import Vue from 'vue'
import Router from 'vue-router'
import Items from '@/components/items/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/items',
      name: 'Items',
      component: Items
    }
  ]
})
