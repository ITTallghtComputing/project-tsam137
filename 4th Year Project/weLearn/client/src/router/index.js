import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/add',
    name: 'add',
    component: () => import('../components/UserCreate')
  },
  {
    path: '/',
    name: 'list',
    component: () => import('../components/UserList')
  },
  {
    
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../components/UserEdit')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router