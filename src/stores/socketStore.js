// src/stores/socketStore.js
import { defineStore } from 'pinia';
import { Stomp } from '@stomp/stompjs';
import { useOrderStore } from './orderStore'; // orderStore 가져오기
import { useOrderInfoStore } from './orderStore';
import { useMemberStore } from './MemberStore.js'

export const useSocketStore = defineStore('socket', {
  state: () => ({
    stompClient: null,
    messages: [],
    menuInfo: null,
  }),
  actions: {
    connect() {
      if (this.stompClient) return; // 이미 연결되어 있으면 반환

      this.stompClient = Stomp.client('ws://34.64.141.174:8080/ws');

      const orderStore = useOrderStore(); // orderStore 인스턴스 가져오기
      const memberStore = useMemberStore();
      

      const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'MemberId': memberStore.memberId,
        'accept-version': `1.3,1.2,1.1,1.0`,
        'heart-beat':'10000,10000',
      }

      this.stompClient.connect(headers, () => {
        console.log('소켓 연결 성공. member Id:', memberStore.memberId);
        const subscriptionHeaders = {
          'id': `sub-1`,
          'MemberId': memberStore.memberId,
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        };
        
        // orderIdx를 사용하여 구독 경로 설정
        this.stompClient.subscribe(`/sub/order/room/${orderStore.orderIdx}`, (message) => {
          console.log('받은 메시지:', message.body);
          this.addMessage(message.body); // this.addMessage는 이제 정상 작동
        }, subscriptionHeaders);
        this.enter();
      }, (error) => {
        console.error('소켓 연결 실패:', error);
      });
    },
    disconnect() {
      const orderInfoStore = useOrderInfoStore();
      const memberStore = useMemberStore();

      if (this.stompClient) {
        if (orderInfoStore.ownerMemberIdx != null && orderInfoStore.ownerMemberIdx == memberStore.idx) {
          const headers = {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'content-type':`application/json`,
            'MemberId': memberStore.memberId,
          }
          try {
            this.stompClient.send(
              `/pub/order/room/close`,
              headers,
              JSON.stringify({
                "orderIdx": orderInfoStore.orderIdx,
                "memberId": memberStore.memberId,
              })
            );
          }
          catch (error) {
            console.error('메시지 전송 실패:', error);
            alert('방을 닫는 중 오류가 발생했습니다.');
          }
        }
        this.stompClient.disconnect(() => {
          console.log('소켓 연결 해제');
          this.stompClient = null; // 연결 해제 후 null로 초기화
        });
      }
    },
    enter() {
      const orderStore = useOrderStore(); // orderStore 가져오기
      const orderIdx = orderStore.orderIdx;
      const memberStore = useMemberStore();

      const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'MemberId': memberStore.memberId,
        'content-type': `application/json`,
      }

      // stompClient가 존재하고 연결되어 있는지 확인
      if (this.stompClient && this.stompClient.connected) {
        try {
          this.stompClient.send(
            `/pub/order/room/enter`,
            headers, // 헤더를 추가하여 요청에 포함
            JSON.stringify({
              "orderIdx": orderIdx, // 동적으로 orderIdx 설정
              "memberId": memberStore.memberId,
            })
          );
          console.log(`방 ${orderIdx}에 입장 요청을 보냈습니다. memberId: ` + memberStore.memberId);
        } catch (error) {
          console.error('메시지 전송 실패:', error);
          alert('입장 요청을 보내는 중 오류가 발생했습니다.'); // 사용자에게 오류 알림
        }
      } else {
        console.error('소켓이 연결되어 있지 않거나 stompClient가 존재하지 않습니다.');
        alert('소켓이 연결되어 있지 않습니다.'); // 사용자에게 소켓 연결 상태 알림
      }
    },
    addMessage(message) {
      // 메시지를 배열에 추가하는 메서드
      this.messages.push(message);
    },
    saveMenuInfo(menuInfo) {
      // MENU_INFO 데이터를 저장하는 메서드
      this.menuInfo = menuInfo;
    }
  }

});
