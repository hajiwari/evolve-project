<template>
  <div id="app">
    <!-- Loading Screen -->
    <LoadingScreenNew 
      v-if="isLoading" 
      ref="loadingScreen"
      :show="isLoading" 
    />
    
    <!-- Main App Content -->
    <div v-else>
      <!-- Header -->
      <Header />
      
      <!-- Main Content -->
      <main>
        <router-view />
      </main>
      
      <!-- Footer -->
      <Footer />
      
      <!-- Floating Help Button -->
      <FloatingHelpButton />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import LoadingScreenNew from './components/LoadingScreenNew.vue'
import FloatingHelpButton from './components/FloatingHelpButton.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    LoadingScreenNew,
    FloatingHelpButton
  },
  setup() {
    const route = useRoute()
    const isLoading = ref(true)
    const loadingScreen = ref(null)

    onMounted(async () => {
      // Check navigation type and referrer
      const navigation = window.performance.getEntriesByType('navigation')[0]
      const hasReferrer = document.referrer && document.referrer !== ''
      const referrerIsSameOrigin = hasReferrer && document.referrer.includes(window.location.origin)
      
      // Only show loading screen for completely fresh loads
      const isFirstTimeLoad = (!hasReferrer || !referrerIsSameOrigin) && navigation?.type !== 'back_forward'
      
      if (isFirstTimeLoad) {
        // Show loading screen for first-time loads
        // Wait for components to load (simulate loading time)
        await new Promise(resolve => setTimeout(resolve, 2500))
        
        // Complete the progress bar animation
        if (loadingScreen.value && loadingScreen.value.completeProgress) {
          await loadingScreen.value.completeProgress()
        } else {
          // Fallback wait
          await new Promise(resolve => setTimeout(resolve, 800))
        }
      } else {
        // Quick load for navigation between pages
        await new Promise(resolve => setTimeout(resolve, 300))
      }
      
      isLoading.value = false
    })

    return {
      isLoading,
      loadingScreen
    }
  }
}
</script>

<style>
/* Global app styles are imported in main.js */
</style>