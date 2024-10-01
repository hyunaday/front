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
import MyCardRegistration from '../views/business/MyCardRegistration.vue';
import FriendCardRegistration from '../views/business/FriendCardRegistration.vue';
import Settings from '../views/settings/Settings.vue';
import InviteFriends from '../views/settings/InviteFriends.vue';
import SearchFriends from '../views/settings/SearchFriends.vue';
import PayList from '../views/settings/PayList.vue';
import Cancel from '../views/settings/Cancel.vue';
import Logout from '../views/settings/Logout.vue';
import ChangePassword from '../views/settings/ChangePassword.vue';
import AddBusinessCard from '../views/business/AddBusinessCard.vue';
import MainPay from '../views/pay/MainPay.vue';
import MemberPay from '../views/pay/MemberPay.vue';
import SoloPay from '../views/pay/SoloPay.vue';
import CurrentPassword from '../views/settings/CurrentPassword.vue';
import PaymentSuccess from '../views/pay/PaymentSuccess.vue';
import PaymentFailure from '../views/pay/PaymentFailure.vue';
import GameList from '../views/pay/GameList.vue';
import GameLottery from '../components/GameLottery.vue'; // 상대 경로로 수정
import '@solb/bottom-sheet';
import '@solb/bottom-sheet/style/style.css';
import PayInfo from '../views/pay/PayInfo.vue';
import PaySplit from '../views/pay/PaySplit.vue';
import PayMenu from '../views/pay/PayMenu.vue';
import RequestPay from '../views/pay/RequestPay.vue';
import PaymentWaiting from '../components/PaymentWaiting.vue'; // 경로를 맞게 수정

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/myassets',
    name: 'MyAssets',
    component: MyAssets,
    meta: { requiresAuth: true },
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: { requiresAuth: true },
  },
  {
    path: '/accountbook',
    name: 'AccountBook',
    component: AccountBook,
    meta: { requiresAuth: true },
  },
  {
    path: '/businesscard',
    name: 'BusinessCard',
    component: BusinessCard,
    meta: { requiresAuth: true },
  },
  {
    path: '/businesscardlist',
    name: 'BusinessCardList',
    component: BusinessCardList,
    meta: { requiresAuth: true },
  },
  {
    path: '/grouppay',
    name: 'GroupPay',
    component: GroupPay,
    meta: { requiresAuth: true },
  },
  {
    path: '/addlist',
    name: 'AddList',
    component: AddList,
    meta: { requiresAuth: true },
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Cards,
    meta: { requiresAuth: true },
  },
  {
    path: '/accountaddlist',
    name: 'AccountAddList',
    component: AccountAddList,
    meta: { requiresAuth: true },
  },
  {
    path: '/friend-card-registration',
    name: 'FriendCardRegistration',
    component: FriendCardRegistration,
    meta: { requiresAuth: true },
  },
  {
    path: '/my-card-registration',
    name: 'MyCardRegistration',
    component: MyCardRegistration,
    meta: { requiresAuth: true },
  },
  {
    // Settings path 설정 - 2024.09.26
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true },
  },
  {
    path: '/searchfriends',
    name: 'SearchFriends',
    component: SearchFriends,
    meta: { requiresAuth: true },
  },
  {
    path: '/invitefriends',
    name: 'InviteFriends',
    component: InviteFriends,
    meta: { requiresAuth: true },
  },
  {
    path: '/paylist',
    name: 'PayList',
    component: PayList,
    meta: { requiresAuth: true },
  },
  {
    path: '/changepassword',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: { requiresAuth: true },
  },
  {
    path: '/currentpassword',
    name: 'CurrentPassword',
    component: CurrentPassword,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: { requiresAuth: true },
  },
  {
    path: '/cancel',
    name: 'Cancel',
    component: Cancel,
    meta: { requiresAuth: true },
  },
  {
    path: '/addbusinesscard',
    name: 'AddBusinessCard',
    component: AddBusinessCard,
    meta: { requiresAuth: true },
  },
  {
    path: '/solopay', //  개인 결제 페이지
    name: 'SoloPay',
    component: SoloPay,
  },
  {
    path: '/mainpay', //  대표 결제 추가
    name: 'MainPay',
    component: MainPay,
  },
  {
    path: '/memberpay', // 팀원 결제 추가
    name: 'MemberPay',
    component: MemberPay,
  },
  {
    path: '/success', //  결제 성공
    name: 'PaymentSuccess',
    component: PaymentSuccess,
  },
  {
    path: '/failure', //  결제 실패
    name: 'PaymentFailure',
    component: PaymentFailure,
  },
  {
    path: '/gamelist',
    name: 'GameList',
    component: GameList,
  },
  {
    path: '/lottery-game',
    name: 'LotteryGame',
    component: GameLottery,
  },
  {
    path: '/payinfo',
    name: 'PayInfo',
    component: PayInfo,
  },
  {
    path: '/paysplit',
    name: 'PaySplit',
    component: PaySplit,
  },
  {
    path: '/paymenu',
    name: 'PayMenu',
    component: PayMenu,
  },
  {
    path: '/requestpay',
    name: 'RequestPay',
    component: RequestPay,
  },
  {
    path: '/payment-waiting',
    name: 'PaymentWaiting',
    component: PaymentWaiting,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 네비게이션 가드 설정
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('accessToken'); // 토큰을 로컬스토리지에서 확인

  // 로그인이 필요한 페이지에 접근할 때
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // 로그인이 되어 있지 않으면 로그인 페이지로 리다이렉트
      next('/login');
    } else {
      // 토큰이 유효하면 그대로 진행
      next();
    }
  } else {
    // 로그인 페이지나 회원가입 페이지에 있을 때, 로그인 상태라면 메인 페이지로 이동
    if (isAuthenticated && (to.path === '/login' || to.path === '/signup')) {
      next('/');
    } else {
      next(); // 그 외의 경우는 그냥 진행
    }
  }
});

export default router;
