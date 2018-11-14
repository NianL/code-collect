import Vue from 'vue'
import Router from 'vue-router'

import PageHome from '@/page/Home'
import PageArticle from '@/page/Article'
import PageArticleDetail from '@/page/ArticleDetail'
import PageTool from '@/page/Tool'
import PageAbout from '@/page/About'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: '',
    component: PageHome
  }, {
    path: '/home',
    name: 'home',
    component: PageHome
  }, {
    path: '/tool',
    name: 'tool',
    component: PageTool
  }, {
    path: '/tool/i/:name',
    name: 'tool-item',
    component: PageTool
  }, {
    path: '/about',
    name: 'about',
    component: PageAbout
  }]
})
