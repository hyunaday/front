import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import MainPage from '../views/Mainpage.vue';
import MyAssets from '../views/MyAssets.vue';
import AccountBook from '../views/AccountBook.vue';
import BusinessCard from '../views/BusinessCard.vue';
import GroupPay from '../views/GroupPay.vue';
import SignUp from '../views/SignUp.vue';
import AddList from '../views/AddList.vue';
import Cards from '../views/Cards.vue';
import BusinessCardList from '../views/BusinessCardList.vue';
import MyCardRegistration from '../views/MyCardRegistration.vue'; // MyCardRegistration 추가
import FriendCardRegistration from '../views/FriendCardRegistration.vue'; // FriendCardRegistration 추가

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/myassets',
    name: 'MyAssets',
    component: MyAssets,
  },
  {
    path: '/accountbook',
    name: 'AccountBook',
    component: AccountBook,
  },
  {
    path: '/businesscard',
    name: 'BusinessCard',
    component: BusinessCard,
  },
  {
    path: '/businesscardlist',
    name: 'BusinessCardList',
    component: BusinessCardList,
  },
  {
    path: '/grouppay',
    name: 'GroupPay',
    component: GroupPay,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/addlist',
    name: 'AddList',
    component: AddList,
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Cards,
  },
  {
    path: '/friend-card-registration', // 새로운 경로 추가
    name: 'FriendCardRegistration',
    component: FriendCardRegistration,
  },
  {
    path: '/my-card-registration', // 나의 명함 등록 페이지 추가
    name: 'MyCardRegistration',
    component: MyCardRegistration,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
