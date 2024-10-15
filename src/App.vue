<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useRegisterSW } from 'virtual:pwa-register/vue'; // PWA 서비스 워커 등록 임포트

export default {
  name: 'App',
  setup() {
    const deferredPrompt = ref<Event | null>(null);

    // PWA 서비스 워커 등록 및 업데이트 관리
    const { updateServiceWorker } = useRegisterSW({
      onNeedRefresh() {
        // 업데이트 필요할 때 호출됨
        if (confirm('새로운 업데이트가 있습니다. 지금 업데이트하시겠습니까?')) {
          updateServiceWorker(); // 서비스 워커 업데이트
        }
      },
      onOfflineReady() {
        console.log('앱이 오프라인에서도 준비되었습니다!');
      },
    });

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
#app {
  background-color: #ffffff; /* 원하는 배경색 */
 
}
</style>
