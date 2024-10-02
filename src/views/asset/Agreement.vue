<template>
    <div>
      <h1>약관 동의서</h1>
      <ul>
        <li v-for="(term, index) in terms" :key="index" @click="openBottomSheet(term)">
          {{ term.title }}
        </li>
      </ul>
      <v-btn @click="agreeTerms">동의하기</v-btn>
  
      <v-bottom-sheet v-model="isBottomSheetOpen">
        <v-card>
          <v-card-title>{{ selectedTerm.title }}</v-card-title>
          <v-card-text>
            <div v-html="selectedTerm.content"></div>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closeBottomSheet">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-bottom-sheet>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        terms: [
          { title: '서비스 이용약관', content: '서비스 이용약관의 내용...' },
          { title: '개인정보 처리방침', content: '개인정보 처리방침의 내용...' },
          // 추가 약관 ...
        ],
        isBottomSheetOpen: false,
        selectedTerm: {},
      };
    },
    methods: {
      openBottomSheet(term) {
        this.selectedTerm = term;
        this.isBottomSheetOpen = true;
      },
      closeBottomSheet() {
        this.isBottomSheetOpen = false;
      },
      agreeTerms() {
        // 동의 처리 로직 (예: 상태 저장, API 호출 등)
        alert("약관에 동의하였습니다.");
        this.isBottomSheetOpen = false; // 바텀 시트를 닫습니다.
      },
    },
  };
  </script>
  
  <style>
  /* 필요한 스타일 추가 */
  </style>
  