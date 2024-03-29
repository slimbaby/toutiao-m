import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // 命名路由
    path: '/login',
    name: 'login',
    // 路由懒加载
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      { path: '/', name: 'home', component: () => import('@/views/home') },
      { path: '/qa', name: 'qa', component: () => import('@/views/qa') },
      { path: '/video', name: 'video', component: () => import('@/views/vedio') },
      { path: '/my', name: 'my', component: () => import('@/views/my') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
