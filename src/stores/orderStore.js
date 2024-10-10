// src/stores/orderStore.js
import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', {
  state: () => ({
    orderIdx: 1,
    maxMemberCnt: 1,
    type: null,
  }),
  actions: {
    setOrderIdx(orderIdx) {
      this.orderIdx = orderIdx;
    },
    setType(type) { // 이 함수가 제대로 정의되었는지 확인하세요.
      this.type = type;
    },
  },
});
