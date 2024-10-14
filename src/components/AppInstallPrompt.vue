<template>
    <div>
      <button @click="installApp">앱 설치하기</button>
    </div>
  </template>

  <script lang="ts">
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const deferredPrompt = ref<Event | null>(null);
  
      const installApp = () => {
        if (!deferredPrompt.value) {
          alert("이미 앱이 설치되어 있거나 앱을 설치할 수 없는 환경입니다");
          return;
        }
        
        // 설치 프롬프트 표시
        deferredPrompt.value.prompt();
        
        // 설치 완료 후
        deferredPrompt.value.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('사용자가 설치를 수락했습니다.');
          } else {
            console.log('사용자가 설치를 거부했습니다.');
          }
          deferredPrompt.value = null; // 이후 사용을 위해 null로 초기화
        });
      };
  
      onMounted(() => {
        window.addEventListener("beforeinstallprompt", (event) => {
          event.preventDefault(); // 기본 설치 프롬프트 방지
          deferredPrompt.value = event; // 이벤트 저장
        });
      });
  
      return {
        installApp
      };
    }
  };
  </script>

  <style scoped>
  /* 추가 스타일을 여기에 작성하세요 */
  </style>