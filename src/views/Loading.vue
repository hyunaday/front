<template>
    <div class="main-container">
      <div class="loading-container">
        <div class="loading"></div>
        <div id="loading-text">대기 중</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Loading',
  };
  </script>
  
  <style scoped>
  /* 로딩 애니메이션 스타일 */
  @keyframes rotate-loading {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes change-color {
    0%, 50% { border-color: transparent #fff transparent #fff; }
    50%, 100% { border-color: transparent #fff transparent #fff; }
  }
  
  @keyframes loading-text-opacity {
    0%, 20% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
  
  .main-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
  }
  
  .loading-container {
    background-color: #6981D9; /* Added background color */
    margin: 60px auto;
    height: 200px; /* Increased size */
    width: 200px; /* Increased size */
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .loading {
    border: 7px solid transparent; /* Increased border thickness */
    animation: rotate-loading 1.5s linear infinite, change-color 2s linear infinite;
    transform-origin: 50%;
    height: 100%;
    width: 100%;
    border-radius: 100%;
  }
  
  #loading-text {
    animation: loading-text-opacity 2s linear infinite;
    color: white;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 16px; /* Increased font size */
    font-weight: bold;
    margin-top: 340px; /* Adjusted for larger spinner */
    opacity: 0;
    position: absolute;
    text-align: center;
    text-transform: uppercase;
    top: 0;
    width: 150px; /* Updated to match larger loading size */
  }
  </style>
  