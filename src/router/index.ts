import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import FormLogin from '../components/FormLogin.vue';
import FormRegistre from '../components/FormRegistre.vue';
import FormProduct from '../components/FormProduct.vue';
import Product from '../views/ProductList.vue';

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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
