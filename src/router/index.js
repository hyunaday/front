import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import MainPage from '../views/Mainpage.vue';
import MyAssets from '../views/MyAssets.vue';
import AccountBook from '../views/AccountBook.vue';
import BusinessCard from '../views/BusinessCard.vue';
import GroupPay from '../views/GroupPay.vue';
import SignUp from '../views/SignUp.vue';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/myassets',
    name: 'MyAssets',
    component: MyAssets
  },
  {
    path: '/accountbook',
    name: 'AccountBook',
    component: AccountBook
  },
  {
    path: '/businesscard',
    name: 'BusinessCard',
    component: BusinessCard
  },
  {
    path: '/grouppay',
    name: 'GroupPay',
    component: GroupPay
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
