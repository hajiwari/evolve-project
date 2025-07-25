<template>
  <div 
    v-if="show" 
    :class="['loading-overlay', { 'fade-out': fadeOut }]"
    :style="{ backgroundColor: options.backgroundColor }"
  >
    <div class="loading-bokeh">
      <div class="bokeh-dot bokeh-1"></div>
      <div class="bokeh-dot bokeh-2"></div>
      <div class="bokeh-dot bokeh-3"></div>
      <div class="bokeh-dot bokeh-4"></div>
      <div class="bokeh-dot bokeh-5"></div>
    </div>
    <div class="loading-content">
      <div class="loading-icon-container">
        <img :src="options.logoUrl" alt="Loading Icon" class="loading-icon">
      </div>
      <img :src="options.titleUrl" alt="Title Logo" class="loading-title">
      <div class="loading-text">{{ options.loadingText }}</div>
      <div class="loading-progress-container">
        <div class="loading-progress" :style="{ width: `${progress}%` }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, defineExpose } from 'vue'

export default {
  name: 'LoadingScreen',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default: () => ({
        backgroundColor: '#ffffff',
        primaryColor: '#FF6B00',
        logoUrl: 'https://evolve.elsevier.com/cs/images/NonSolusLogo.svg',
        titleUrl: 'https://evolve.elsevier.com/cs/images/EvolveLogo.svg',
        loadingText: 'Loading your learning platform...',
        minDuration: 2000,
        maxDuration: 8000
      })
    }
  },
  setup(props) {
    const fadeOut = ref(false)
    const progress = ref(0)
    const progressInterval = ref(null)
    const isComplete = ref(false)
    
    const startProgressSimulation = () => {
      // Clear any existing interval
      if (progressInterval.value) {
        clearInterval(progressInterval.value)
      }
      
      progressInterval.value = setInterval(() => {
        if (progress.value < 85) {
          // Slower, more realistic progress
          progress.value += Math.random() * 3 + 1
          progress.value = Math.min(progress.value, 85)
        } else if (progress.value < 95 && !isComplete.value) {
          // Even slower near the end
          progress.value += Math.random() * 1 + 0.5
          progress.value = Math.min(progress.value, 95)
        }
      }, 80) // Slower interval for smoother animation
    }
    
    const completeProgress = async () => {
      return new Promise((resolve) => {
        isComplete.value = true
        
        if (progressInterval.value) {
          clearInterval(progressInterval.value)
          progressInterval.value = null
        }
        
        // Animate to 100% smoothly
        const finalInterval = setInterval(() => {
          if (progress.value < 100) {
            progress.value += 2
            progress.value = Math.min(progress.value, 100)
          } else {
            clearInterval(finalInterval)
            // Wait a moment before starting fade out
            setTimeout(() => {
              fadeOut.value = true
              // Wait for fade animation to complete
              setTimeout(resolve, 500)
            }, 300)
          }
        }, 20) // Very smooth final animation
      })
    }
    
    onMounted(() => {
      // Start progress immediately
      progress.value = 5
      startProgressSimulation()
    })
    
    onUnmounted(() => {
      if (progressInterval.value) {
        clearInterval(progressInterval.value)
      }
    })
    
    // Expose methods to parent component
    defineExpose({
      completeProgress
    })
    
    return {
      fadeOut,
      progress,
      completeProgress,
      isComplete
    }
  }
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
}

.loading-overlay.fade-out {
  opacity: 0;
  visibility: hidden;
}

.loading-bokeh {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.bokeh-dot {
  position: absolute;
  border-radius: 50%;
  background-color: #FF6B00;
  filter: blur(8px);
}

.bokeh-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 15%;
  opacity: 0.08;
  animation: bokeh-float-1 8s ease-in-out infinite;
}

.bokeh-2 {
  width: 250px;
  height: 250px;
  top: 20%;
  right: 10%;
  opacity: 0.12;
  animation: bokeh-float-2 10s ease-in-out infinite reverse;
}

.bokeh-3 {
  width: 200px;
  height: 200px;
  bottom: 15%;
  left: 20%;
  opacity: 0.06;
  animation: bokeh-float-3 7s ease-in-out infinite;
}

.bokeh-4 {
  width: 350px;
  height: 350px;
  bottom: 25%;
  right: 25%;
  opacity: 0.10;
  animation: bokeh-float-4 12s ease-in-out infinite reverse;
}

.bokeh-5 {
  width: 280px;
  height: 280px;
  top: 35%;
  left: 55%;
  opacity: 0.09;
  animation: bokeh-float-5 9s ease-in-out infinite;
}

.loading-content {
  position: relative;
  z-index: 10;
  text-align: center;
}

.loading-icon-container {
  position: relative;
  width: 140px;
  height: 140px;
  margin: 0 auto 24px;
}

.loading-icon {
  position: relative;
  width: 120px;
  height: 120px;
  margin-left: 8px;
  animation: icon-breathing 2s ease-in-out infinite;
}

.loading-title {
  height: 40px;
  margin-bottom: 16px;
  opacity: 0.9;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.loading-text {
  color: #666;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 0;
}

.loading-progress-container {
  width: 200px;
  height: 3px;
  background-color: rgba(255, 107, 0, 0.2);
  border-radius: 2px;
  margin: 16px auto 8px;
  overflow: hidden;
}

.loading-progress {
  height: 100%;
  background: linear-gradient(90deg, #FF6B00, rgba(255, 107, 0, 0.8));
  border-radius: 2px;
  width: 0%;
  transition: width 0.15s ease-out;
  box-shadow: 0 0 10px rgba(255, 107, 0, 0.3);
}

/* Keyframe Animations */
@keyframes icon-breathing {
  0%, 100% { 
    transform: scale(0.96);
    opacity: 0.9;
  }
  50% { 
    transform: scale(1.04);
    opacity: 1;
  }
}

@keyframes bokeh-float-1 {
  0%, 100% { 
    transform: translate(0, 0) scale(1);
    opacity: 0.08;
  }
  20% { 
    transform: translate(30px, -25px) scale(1.1);
    opacity: 0.12;
  }
  40% { 
    transform: translate(70px, -35px) scale(1.2);
    opacity: 0.15;
  }
  60% { 
    transform: translate(90px, 10px) scale(1.0);
    opacity: 0.11;
  }
  80% { 
    transform: translate(20px, 35px) scale(1.1);
    opacity: 0.13;
  }
}

@keyframes bokeh-float-2 {
  0%, 100% { 
    transform: translate(0, 0) scale(1);
    opacity: 0.12;
  }
  20% { 
    transform: translate(-25px, 30px) scale(0.95);
    opacity: 0.16;
  }
  40% { 
    transform: translate(-40px, 70px) scale(0.9);
    opacity: 0.20;
  }
  60% { 
    transform: translate(15px, 85px) scale(1.1);
    opacity: 0.15;
  }
  80% { 
    transform: translate(50px, 10px) scale(1.05);
    opacity: 0.18;
  }
}

@keyframes bokeh-float-3 {
  0%, 100% { 
    transform: translate(0, 0) scale(1);
    opacity: 0.06;
  }
  20% { 
    transform: translate(35px, -30px) scale(1.1);
    opacity: 0.10;
  }
  40% { 
    transform: translate(60px, -55px) scale(1.2);
    opacity: 0.14;
  }
  60% { 
    transform: translate(-20px, -25px) scale(0.95);
    opacity: 0.08;
  }
  80% { 
    transform: translate(45px, 25px) scale(1.15);
    opacity: 0.12;
  }
}

@keyframes bokeh-float-4 {
  0%, 100% { 
    transform: translate(0, 0) scale(1);
    opacity: 0.10;
  }
  20% { 
    transform: translate(-40px, -25px) scale(1.05);
    opacity: 0.14;
  }
  40% { 
    transform: translate(-70px, -45px) scale(1.1);
    opacity: 0.18;
  }
  60% { 
    transform: translate(-10px, 35px) scale(0.95);
    opacity: 0.12;
  }
  80% { 
    transform: translate(30px, -50px) scale(1.15);
    opacity: 0.16;
  }
}

@keyframes bokeh-float-5 {
  0%, 100% { 
    transform: translate(0, 0) scale(1);
    opacity: 0.09;
  }
  20% { 
    transform: translate(20px, 35px) scale(1.0);
    opacity: 0.13;
  }
  40% { 
    transform: translate(35px, 60px) scale(1.05);
    opacity: 0.16;
  }
  60% { 
    transform: translate(-30px, 25px) scale(1.1);
    opacity: 0.11;
  }
  80% { 
    transform: translate(15px, -40px) scale(0.95);
    opacity: 0.14;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .loading-icon-container {
    width: 120px;
    height: 120px;
  }
  
  .loading-icon {
    width: 100px;
    height: 100px;
    margin-left: 6px;
  }
  
  .loading-title {
    height: 35px;
  }
  
  .loading-text {
    font-size: 14px;
  }
  
  .loading-progress-container {
    width: 160px;
  }
  
  .bokeh-dot {
    transform: scale(0.6);
  }
}
</style>
