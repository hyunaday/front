import { defineStore } from 'pinia';

export const useAccountStore = defineStore('account', {
  state: () => ({
    accountList: [], // 계좌 목록을 저장할 상태
    selectedAccountIdx: null, // 현재 선택된 계좌의 인덱스
  }),
  actions: {
    setAccountList(accounts) {
      this.accountList = accounts; // 계좌 목록 설정
    },
    setSelectedAccountIdx(idx) {
      this.selectedAccountIdx = idx; // 선택된 계좌의 인덱스 설정
    },
    clearSelectedAccount() {
      this.selectedAccountIdx = null; // 선택된 계좌 초기화
    },
    addAccount(account) {
      this.accountList.push(account); // 새로운 계좌 추가
    },
    removeAccount(accountIdx) {
      this.accountList = this.accountList.filter((_, index) => index !== accountIdx); // 특정 인덱스의 계좌 삭제
    },
    getSelectedAccount() {
      return this.accountList[this.selectedAccountIdx]; // 선택된 계좌 반환
    },
  },
});
