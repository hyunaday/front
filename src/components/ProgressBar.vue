<template>
  <div class="progress-bar-container">
    <div class="progress-wrapper">
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          :style="{ width: progressWidth }"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
    <span class="step-text">STEP {{ currentStep }}/{{ totalSteps }}</span>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
    totalSteps: {
      type: Number,
      default: 4,
    },
  },
  computed: {
    progressWidth() {
      return (this.currentStep / this.totalSteps) * 100 + "%";
    },
  },
};
</script>

<style scoped>
.progress-bar-container {
  width: 72.5%;
  margin-top: 30px;
  position: relative;
}

.progress-wrapper {
  width: 100%;
}

.progress {
  height: 2px;
  background-color: #e0e0e0;
  position: relative;
}

.progress-bar {
  height: 2px;
  background-color: #6981d9; /* Active color */
  transition: width 0.3s ease;
}

.step-text {
  color: #6981d9;
  font-weight: bold;
  font-size: 11px;
  position: absolute;
  top: -20px;
  right: 0;
}
</style>
