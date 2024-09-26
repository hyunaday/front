<<<<<<< HEAD
import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import MainPage from "../views/Mainpage.vue";
import MyAssets from "../views/MyAssets.vue";
import AccountBook from "../views/AccountBook.vue";
import BusinessCard from "../views/BusinessCard.vue";
import GroupPay from "../views/GroupPay.vue";
import SignUp from "../views/SignUp.vue";
import AddList from "../views/AddList.vue";
import Cards from "../views/Cards.vue";
import Accounts from "../views/Accounts.vue";
=======
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
import Account from '../views/Account.vue';
import AccountAddList from '../views/AccountAddList.vue';
import BusinessCardList from '../views/BusinessCardList.vue';
import MyCardRegistration from '../views/MyCardRegistration.vue'; // MyCardRegistration 추가
import FriendCardRegistration from '../views/FriendCardRegistration.vue'; // FriendCardRegistration 추가

>>>>>>> 469c5af64762e1f155551e66c110f89118c673e3

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/myassets",
    name: "MyAssets",
    component: MyAssets,
  },
  {
<<<<<<< HEAD
    path: "/accountbook",
    name: "AccountBook",
=======
    path: '/account',
    name: 'Account',
    component: Account,
  },
  {
    path: '/accountbook',
    name: 'AccountBook',
>>>>>>> 469c5af64762e1f155551e66c110f89118c673e3
    component: AccountBook,
  },
  {
    path: "/businesscard",
    name: "BusinessCard",
    component: BusinessCard,
  },
  {
<<<<<<< HEAD
    path: "/grouppay",
    name: "GroupPay",
=======
    path: '/businesscardlist',
    name: 'BusinessCardList',
    component: BusinessCardList,
  },
  {
    path: '/grouppay',
    name: 'GroupPay',
>>>>>>> 469c5af64762e1f155551e66c110f89118c673e3
    component: GroupPay,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/addlist",
    name: "AddList",
    component: AddList,
  },
  {
    path: "/cards",
    name: "Cards",
    component: Cards,
  },
  {
<<<<<<< HEAD
    path: "/accounts",
    name: "Accounts",
    component: Accounts,
=======
    path: '/accountaddlist',
    name: 'AccountAddList',
    component: AccountAddList,
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
>>>>>>> 469c5af64762e1f155551e66c110f89118c673e3
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
