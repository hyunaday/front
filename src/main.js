import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Vue Router 추가
import router from "./router"; // router 설정을 불러옴
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

// Swiper CSS 파일 가져오기
import "swiper/css";
import "swiper/css/pagination";

// bottom-sheet
import "@solb/bottom-sheet";
import "@solb/bottom-sheet/style/style.css";

const app = createApp(App);

// Pinia 설정
const pinia = createPinia();
app.use(pinia);

// Vue Router 설정 추가
app.use(router); // 라우터를 앱에 추가

app.mount("#app");
