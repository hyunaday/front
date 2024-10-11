import { defineStore } from 'pinia';
import apiClient from "../api/axios";

export const useMemberStore = defineStore('member', {
  state: () => ({
    idx: null,
    memberId: '',
    name: '',
    email: '',
    createdAt: '',
  }),

  actions: {
    async fetchMemberInfo() {
      try {
        const response = await apiClient.get('/member/my');
        console.log('response:', response); // 응답 출력

        if (response.data.isSuccess) {
          const memberData = response.data.result;
          this.idx = memberData.idx;
          this.memberId = memberData.memberId;
          this.name = memberData.name;
          this.email = memberData.email;
          this.createdAt = memberData.createdAt;
        } else {
          console.error('Failed to fetch member info:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching member info:', error);
      }
    }
  },

  // persist 옵션 추가
  persist: {
    enabled: true, // 상태를 localStorage에 저장하도록 설정
    strategies: [
      {
        key: 'member', // 저장되는 key 이름
        storage: localStorage, // localStorage에 저장
      },
    ],
  },
});
