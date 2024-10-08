// stores/navigation.js
import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    selectedPage: '', // 선택된 페이지를 저장할 상태
    navigationPath: [], // 경로 저장 배열
  }),
  actions: {
    setSelectedPage(page) {
      this.selectedPage = page; // 선택된 페이지 설정
    },
    setNavigationPath(path) {
      this.navigationPath = path; // 경로 설정
    },
    clearNavigationPath() {
      this.navigationPath = []; // 경로 초기화
    },
  },
});
