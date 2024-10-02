<template>
  <div class="main-container d-flex flex-column">
    <div class="header">
      <button @click="goBack" class="back-button">
        <i class="fas fa-chevron-left"></i>
      </button>
      <h2 class="title">결제대기</h2>
    </div>

    <div class="content">
      <div class="circle-background">
        <RadialProgress
          :diameter="200"
          :completed-steps="completedSteps"
          :total-steps="totalSteps"
        >
          <text
            x="50%"
            y="50%"
            text-anchor="middle"
            dominant-baseline="middle"
            class="circle-text"
          >
            {{ completedParticipants }} / {{ totalParticipants }}
          </text>
        </RadialProgress>
      </div>

      <h2 class="waiting-message">잠시만 기다려주세요</h2>
      <p class="waiting-description">다른 팀원들이 결제를 준비하고 있어요!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import RadialProgress from 'vue3-radial-progress'; // RadialProgress 컴포넌트 가져오기

const router = useRouter();
const interval = ref(null);
const completedParticipants = ref(0);
const totalParticipants = ref(5); // 전체 참여자 수
const paymentStatus = ref([1, 1, 1, 0, 1]); // 예시: 결제 완료 상태 (1: 완료, 0: 미완료)
const completedSteps = ref(0);
const totalSteps = ref(10); // 총 단계 수

// 뒤로 가기 버튼
const goBack = () => {
  router.go(-1);
};

// 원 업데이트
const updateCircle = () => {
  const completedCount = paymentStatus.value.reduce(
    (acc, status) => acc + status,
    0
  );
  completedParticipants.value = completedCount;

  // 참여자 수에 따라 비율 계산
  const percentage = (completedCount / totalParticipants.value) * 100;
  completedSteps.value = Math.round((percentage / 100) * totalSteps.value);
};

// 결제 상태 체크
const checkPaymentStatus = async () => {
  interval.value = setInterval(async () => {
    const allPaymentsCompleted = await checkAllPayments(); // 모든 결제 상태 확인 API 호출

    if (allPaymentsCompleted) {
      clearInterval(interval.value);
      router.push('/success'); // 모든 결제가 완료되면 success로 이동
    }

    // 예시로 결제 완료 상태를 랜덤으로 업데이트
    paymentStatus.value[
      Math.floor(Math.random() * totalParticipants.value)
    ] = 1;
    updateCircle();
  }, 10000); // 10초마다 확인
};

// 모든 결제 상태 확인하는 로직 (예시)
const checkAllPayments = async () => {
  // 실제 API 호출로 모든 결제 완료 여부 확인하는 로직을 작성해야 합니다.
  return true; // 실제로는 API 결과에 따라 true/false 반환
};

// 컴포넌트가 마운트될 때 상태 체크 시작
onMounted(() => {
  checkPaymentStatus();
  updateCircle(); // 초기 원 상태 업데이트
});

// 컴포넌트가 언마운트될 때 인터벌 정리
onBeforeUnmount(() => {
  clearInterval(interval.value);
});
</script>

<style scoped>
.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  overflow: hidden; /* 전체 스크롤 숨김 */
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
  width: 100%;
}

.content {
  text-align: center; /* 중앙 정렬 */
  margin-top: auto;
  margin-bottom: 100px;
}

.circle-background {
  width: 200px; /* 원의 크기 조정 */
  height: 200px; /* 원의 크기 조정 */
  border-radius: 50%; /* 둥근 형태 만들기 */
  background-color: #6981d9; /* 파란색 배경 */
  display: flex;
  align-items: center;
  justify-content: center; /* 중앙 정렬 */
  margin: 0 auto; /* 수평 중앙 정렬 */
  position: relative; /* 원 안의 텍스트를 중앙에 배치하기 위해 상대적으로 위치 지정 */
}

.circle-text {
  font-size: 50px;
  color: white;
  font-weight: bold;
  fill: white; /* 텍스트 색상 */
}

.waiting-message {
  margin-top: 20px;
  font-size: 20px; /* 원하는 폰트 사이즈로 조정 (예: 18px) */
}

.waiting-description {
  font-size: 14px; /* 원하는 폰트 사이즈로 조정 (예: 14px) */
  white-space: nowrap; /* 다음 줄로 넘어가지 않도록 설정 */
  overflow: hidden; /* 오버플로우 숨김 */
  text-overflow: ellipsis; /* 오버플로우 시 생략 부호 표시 */
}

.back-button {
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #000;
}

.title {
  font-size: 18px;
  margin: 0;
  text-align: center;
}
</style>
