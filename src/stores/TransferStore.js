// src/stores/TransferStore.js
import { defineStore } from 'pinia';
import apiClient from '../api/axios';

export const useTransferStore = defineStore('transfer', {
  state: () => ({
    selectedAccount: null,
    availableAmount: 0,
    transferAmount: 0,
    recipient: '',
  }),
  actions: {
    async fetchAccountBalance(accountId) {
      try {
        const response = await apiClient.get('/account/all');
        if (response.data.isSuccess) {
          const account = response.data.result.accountList.find(
            (acc) => acc.idx === accountId
          );
          if (account) {
            this.selectedAccount = account;
            this.availableAmount = account.amount;
          }
        }
      } catch (error) {
        console.error('계좌 잔액을 불러오는 중 오류가 발생했습니다:', error);
      }
    },
    setTransferAmount(amount) {
      this.transferAmount = amount;
    },
    setRecipient(recipient) {
      this.recipient = recipient;
    },
  },
});
