import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    selectedPage: '', // 선택된 페이지를 저장하는 변수
    pathHistory: [], // 경로 히스토리를 저장하는 배열
  }),
  actions: {
    setSelectedPage(page, router) {
      this.selectedPage = page; // 선택된 페이지 설정
      this.pathHistory.push(page); // 경로를 히스토리에 추가

      // ShareLink 페이지로 이동
      router.push({ name: 'ShareLink' });
    },
    navigateToNextPage(router) {
      const nextPage = this.pathHistory.pop(); // 마지막 경로를 가져온다

      // 마지막 경로에 따라 적절한 페이지로 이동
      if (nextPage === 'PaySplit') {
        router.push({ name: 'PaySplit' }); // PaySplit 페이지로 이동
      } else if (nextPage === 'PayMenu') {
        router.push({ name: 'PayMenu' }); // PayMenu 페이지로 이동
      } else {
        router.push({ name: 'GameList' }); // GameList 페이지로 이동
      }
    },
  },
});
