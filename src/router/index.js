import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import MainPage from '../views/Mainpage.vue';
import MyAssets from '../views/asset/MyAssets.vue';
import AccountBook from '../views/book/AccountBook.vue';
import BusinessCard from '../views/business/BusinessCard.vue';
import GroupPay from '../views/pay/GroupPay.vue';
import SignUp from '../views/SignUp.vue';
import AddList from '../views/book/AddList.vue';
import Cards from '../views/asset/Cards.vue';
import Account from '../views/asset/Account.vue';
import AccountAddList from '../views/asset/AccountAddList.vue';
import BusinessCardList from '../views/business/BusinessCardList.vue';
import MyCardRegistration from '../views/business/MyCardRegistration.vue'; // MyCardRegistration 추가
import FriendCardRegistration from '../views/business/FriendCardRegistration.vue'; // FriendCardRegistration 추가
import Settings from '../views/settings/Settings.vue';
import InviteFriends from '../views/settings/InviteFriends.vue';
import SearchFriends from '../views/settings/SearchFriends.vue';
import PayList from '../views/settings/PayList.vue';
import Cancel from '../views/settings/Cancel.vue';
import Logout from '../views/settings/Logout.vue';
import ChangePassword from '../views/settings/ChangePassword.vue';
import AddBusinessCard from '../views/business/AddBusinessCard.vue';
import CurrentPassword from '../views/settings/CurrentPassword.vue';


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
    path: '/account',
    name: 'Account',
    component: Account,
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
  },
  {
    // Settings path 설정 - 2024.09.26 
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/searchfriends",
    name: "SearchFriends",
    component: SearchFriends,
  },
  {
    path: "/invitefriends",
    name: "InviteFriends",
    component: InviteFriends,
  },
  {
    path: "/paylist",
    name: "PayList",
    component: PayList,
  },
  {
    path: "/changepassword",
    name: "ChangePassword",
    component: ChangePassword,
  },
  {
    path: "/currentpassword",
    name: "CurrentPassword",
    component: CurrentPassword,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },  
  {
    path: "/cancel",
    name: "Cancel",
    component: Cancel,
  },
  {
    path: '/addbusinesscard', //  명함 등록 페이지 추가
    name: 'AddBusinessCard',
    component: AddBusinessCard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
