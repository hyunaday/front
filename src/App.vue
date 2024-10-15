<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
export default {
  name: 'App',
  setup() {
    const deferredPrompt = ref<Event | null>(null);
    onMounted(() => {
      // beforeinstallprompt 이벤트 리스너 추가
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault(); // 기본 설치 프롬프트 방지
        deferredPrompt.value = event; // 이벤트 저장
        // 설치 가능한 경우 설치 프롬프트 띄우기
        showInstallPrompt();
      });
    });
    const showInstallPrompt = () => {
      if (deferredPrompt.value) {
        deferredPrompt.value.prompt(); // 사용자에게 설치 프롬프트 표시
        deferredPrompt.value.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('사용자가 앱 설치를 수락했습니다.');
          } else {
            console.log('사용자가 앱 설치를 거부했습니다.');
          }
          deferredPrompt.value = null; // 이후 프롬프트를 다시 트리거하려면 이벤트를 초기화해야 함
        });
      }
    };
    return {
      showInstallPrompt,
    };
  },
};
</script>

<style>
/* 글로벌 스타일 추가 가능 */
</style>
