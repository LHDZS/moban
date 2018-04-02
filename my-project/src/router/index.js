import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import home from '@/index/home'
import classification from '@/index/classification'
import commodity from '@/index/commodity'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/App',
      component: App,
      children: [
        {path: '/', component: home},
        {path: '/classification', component: classification},
        {path: '/commodity', component: commodity}
      ]
    }
  ]
})
