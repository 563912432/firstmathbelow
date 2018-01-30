import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import List from '@/components/list'
import Detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/list/:cid',
      name: 'list',
      component: List
    },
    {
      path: '/d/:id',
      name: 'd',
      component: Detail
    }
  ]
})
