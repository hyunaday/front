import axios from "axios";
import router from "../router"; // Vue Router 임포트

// 환경 변수를 통해 baseURL을 설정
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api", // 환경 변수 사용, 기본값은 '/api'
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 필요시 사용
});

// 요청 인터셉터: 요청 시 토큰을 헤더에 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // 토큰을 Authorization 헤더에 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 오류 처리
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 401 오류 시 로그아웃 처리
      localStorage.removeItem("accessToken");
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      router.push("/login"); // 로그인 페이지로 리다이렉트
    }
    return Promise.reject(error);
  }
);

export default apiClient;
