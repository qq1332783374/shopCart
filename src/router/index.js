import Vue from 'vue'
import Router from 'vue-router'
//商品列表
import goodsList from '@/components/goodsList/goodsList'
//商品详情页
import goodsDetail from '@/components/goodsList/pages/goodsDetail'
//购物车
import shopCart from '@/components/shopCart/shopCart'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goodsList',
      name: 'goodsList',
      component: goodsList
    },
    {
      path: '/goodsDetail/:id',
      name: 'goodsDetail',
      component: goodsDetail
    },
    {
      path: '/shopCart',
      name: 'shopCart',
      component: shopCart
    }
  ]
})
