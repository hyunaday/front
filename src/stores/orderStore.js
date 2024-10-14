// src/stores/orderStore.js
import { defineStore } from 'pinia';
import axios from 'axios'; // axios 가져오기
import apiClient from "../api/axios";

export const useOrderStore = defineStore('order', {
  state: () => ({
    orderIdx: 0,
    maxMemberCnt: 0,
    type: null,
  }),
  actions: {
    setOrderIdx(orderIdx) {
      this.orderIdx = orderIdx;
    },
    setType(type) {
      this.type = type;
    },
    setMaxMemberCnt(maxMemberCnt) {
      this.maxMemberCnt = maxMemberCnt;
    },
  },
  persist: {
    storage: localStorage, // localStorage에 저장
  },
});

export const useOrderInfoStore = defineStore('orderInfo', {
  state: () => ({
    orderIdx: null,         // 주문 ID
    marketIdx: null,        // 상점 ID
    ownerMemberIdx: null,   // 주문 생성자 ID
    name: '',               // 주문 이름
    marketName: '',         // 상점 이름
    totalPrice: 0,          // 총 가격
    taxFreePrice: 0,        // 면세 가격
    vatPrice: 0,            // 부가세 가격
    tableNumber: null,      // 테이블 번호
    menuCnt: 0,             // 메뉴 개수
    orderMenuList: [],      // 주문한 메뉴 목록
    createdAt: '',          // 주문 생성 시간
    type: "BY_MENU",        // 결제 유형
  }),
  actions: {
    getOrderInfo(orderIdx, marketIdx) {
      if (!orderIdx || !marketIdx) {
        console.error("Invalid orderIdx or marketIdx");
        return;
      }

      apiClient.get("/order", {
          params: {
            orderIdx: orderIdx,
            marketIdx: marketIdx,
          },
        })
        .then((response) => {
          if (response.data.isSuccess) {
            const orderData = response.data.result;
            // 데이터를 상태에 저장
            this.orderIdx = orderData.idx;
            this.marketIdx = orderData.marketIdx;
            this.ownerMemberIdx = orderData.ownerMemberIdx;
            this.name = orderData.name;
            this.totalPrice = orderData.totalPrice;
            this.taxFreePrice = orderData.taxFreePrice;
            this.vatPrice = orderData.vatPrice;
            this.marketName = orderData.marketName;
            this.tableNumber = orderData.tableNumber;
            this.menuCnt = orderData.menuCnt;
            this.orderMenuList = orderData.orderMenuList;
            this.createdAt = orderData.createdAt;
          } else {
            console.error("Failed to load order info:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error loading order info:", error);
        });
    },
  },
  persist: {
    storage: localStorage, // localStorage에 저장
  },
});


export const usePriceStore = defineStore('price', {
  state: () => ({
    orderIdx: null,           // 주문 ID
    memberId: null,           // 멤버 ID
    ownerMemberIdx: null,     // 주문 생성자 ID
    maxMemberCnt: 0,          // 최대 인원 수
    totalPrice: 0,            // 총 결제 금액
    memberList: [],           // 결제 참여자 목록
  }),
  actions: {
    setPriceData(responseData) {
      // 서버에서 받은 응답 데이터를 저장
      this.orderIdx = responseData.orderIdx;
      this.memberId = responseData.memberId;
      this.ownerMemberIdx = responseData.ownerMemberIdx;
      this.maxMemberCnt = responseData.maxMemberCnt;
      this.totalPrice = responseData.totalPrice;
      this.memberList = responseData.memberList.map((member) => ({
        memberIdx: member.memberIdx,
        memberName: member.memberName,
        price: member.price,
      }));
    },
    updateMemberPrice(memberIdx, price) {
      // 특정 멤버의 결제 금액을 업데이트
      const member = this.memberList.find((m) => m.memberIdx === memberIdx);
      if (member) {
        member.price = price;
        console.log(`Member ${member.memberName}'s price updated to: ${price}`);
      } else {
        console.error(`Member with memberIdx: ${memberIdx} not found.`);
      }
    },
    getTotalPrice() {
      // 현재 설정된 금액 합계 반환
      const total = this.memberList.reduce((acc, member) => acc + member.price, 0);
      console.log(`Total calculated price: ${total}`);
      return total;
    },
    resetPriceData() {
      // 데이터 초기화
      this.orderIdx = null;
      this.memberId = null;
      this.ownerMemberIdx = null;
      this.maxMemberCnt = 0;
      this.totalPrice = 0;
      this.memberList = [];
      console.log('Price store data reset');
    }
  },
  persist: {
    enabled: true, // persist 기능 활성화
    storage: localStorage, // localStorage에 저장
  },
});



export const usePayPriceInfoStore = defineStore('payPriceInfo', {
  state: () => ({
    orderIdx: null,   // 주문 ID
    memberIdx: null,  // 사용자 ID (memberIdx)
    price: null,      // 결제 금액
  }),
  actions: {
    // 사용자 ID와 결제 금액 설정
    setPayPriceInfo(responseData, currentMemberIdx) {
      this.orderIdx = responseData.orderIdx;
      this.memberIdx = currentMemberIdx;
      this.price = responseData.memberPriceInfoList.find((member) => member.memberIdx === currentMemberIdx).price;
    },

    // 결제 금액만 업데이트
    updatePrice(price) {
      if (this.memberIdx !== null) {
        this.price = price;
      } else {
        console.error('MemberIdx가 설정되지 않았습니다.');
      }
    },

    // 저장된 결제 금액 정보 초기화
    clearPayPriceInfo() {
      this.memberIdx = null;
      this.price = null;
    },

    // 저장된 결제 금액 정보 반환
    getPayPriceInfo() {
      return {
        memberIdx: this.memberIdx,
        price: this.price,
      };
    },
  },
  persist: {
    storage: localStorage, // localStorage에 저장
  },
});
