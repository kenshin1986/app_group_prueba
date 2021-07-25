import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import FormLogin from '../components/FormLogin.vue';
import FormRegistre from '../components/FormRegistre.vue';
import FormProduct from '../components/FormProduct.vue';
import Product from '../views/Product.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'FormLogin',
    component: FormLogin
  },
  {
    path: '/products',
    name: 'Product',
    component: Product
  },
  {
    path: '/formproduct',
    name: 'FormProduct',
    component: FormProduct
  },
 
 
  {
    path: '/singup',
    name: 'FormRegistre',
    component: FormRegistre
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
