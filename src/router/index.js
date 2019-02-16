import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import homeComponent from '../pages/home'
import memberComponent from '../pages/member'
import shopcarComponent from '../pages/shopcar'
import searchComponent from '../pages/search'
import newList from '../components/news/newList.vue'
import newInfo from '../components/news/newInfo.vue'
import photoList from '../pages/photoList'
import photoInfo from '../pages/photoInfo'
import goodList from '../pages/goodList'
import goodsinfo from '../pages/goodsInfo'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: homeComponent },
    { path: '/member', component: memberComponent },
    { path: '/shopcar', component: shopcarComponent },
    { path: '/search', component: searchComponent },
    { path: '/home/newList', component: newList },
    { path: '/home/newInfo/:id', component: newInfo },
    {path:'/home/photoList',component:photoList},
    {path:'/home/photoInfo/:id',component:photoInfo},
    {path: '/home/goodsList',component:goodList},
    {path: '/home/goodsinfo/:id',component:goodsinfo}
  ]
})
