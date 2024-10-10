// src/stores/accountStore.js
import { defineStore } from 'pinia'; // Pinia의 defineStore 함수 임포트

// export const useAccountStore = defineStore('account', {
//   // 스토어 상태 정의
//   state: () => ({
//     availableAmount: 0, // 사용 가능한 금액
//     accountIdx: null,   // 계좌 인덱스
//   }),
//   actions: {
//     // 계좌 인덱스 설정하는 액션 메서드
//     setAccountIdx(idx) {
//       this.accountIdx = idx; // 인자로 받은 idx를 스토어의 accountIdx에 저장
//     },
//     // 사용 가능한 금액을 설정하는 액션 메서드
//     setAvailableAmount(amount) {
//       this.availableAmount = amount; // 인자로 받은 amount를 스토어의 availableAmount에 저장
//     },
//   },
// });
// // src/store/accountStore.js
// import { defineStore } from 'pinia';
import apiClient from '../api/axios.js'; // axios 클라이언트 임포트

export const useAccountStore = defineStore('account', {
  state: () => ({
    accounts: [], // 계좌 정보를 저장할 배열
  }),
  actions: {
    async fetchAccounts() {
      try {
        const response = await apiClient.get('/account/all'); // API 호출
        if (response.data.isSuccess) {
          this.accounts = response.data.result.accountList; // 계좌 목록 저장
        } else {
          console.error('계좌 정보를 가져오지 못했습니다.');
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      }
    },
  },
});

// // stores/accountStore.js
// import { defineStore } from 'pinia';

// export const useAccountStore = defineStore('account', {
//   state: () => ({
//     accounts: [],
//     currentAccountIdx: null, // 현재 선택된 계좌의 idx를 저장
//   }),
//   actions: {
//     async fetchAccounts() {
//       // API 호출 후 계좌 목록을 설정하는 로직을 추가
//     },
//     setCurrentAccountIdx(idx) {
//       this.currentAccountIdx = idx;
//     },
//   },
// });
