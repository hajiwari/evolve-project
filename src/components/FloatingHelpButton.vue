<template>
  <div class="floating-help-btn">
    <button 
      @click="toggleHelp"
      class="floating-help-btn-inner group"
      title="Help & Support"
    >
      <svg viewBox="0 0 24 24" class="w-6 h-6 group-hover:rotate-12 transition-transform">
        <path fill="currentColor" d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
      </svg>
    </button>
    
    <!-- Help Menu -->
    <transition name="help-menu">
      <div 
        v-if="showHelpMenu"
        class="absolute bottom-full right-0 mb-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-64"
        @click.stop
      >
        <h3 class="font-semibold text-gray-900 mb-3">Need Help?</h3>
        <div class="space-y-2">
          <router-link 
            to="/help"
            class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            @click="showHelpMenu = false"
          >
            <div class="flex items-center space-x-2">
              <i class="ri-question-line text-primary"></i>
              <span>Help Center</span>
            </div>
          </router-link>
          
          <a 
            href="#" 
            @click="openChat"
            class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div class="flex items-center space-x-2">
              <i class="ri-chat-3-line text-primary"></i>
              <span>Live Chat</span>
            </div>
          </a>
          
          <a 
            href="#" 
            @click="openSupport"
            class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div class="flex items-center space-x-2">
              <i class="ri-customer-service-line text-primary"></i>
              <span>Contact Support</span>
            </div>
          </a>
          
          <a 
            href="#" 
            @click="openTraining"
            class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div class="flex items-center space-x-2">
              <i class="ri-graduation-cap-line text-primary"></i>
              <span>Training Videos</span>
            </div>
          </a>
        </div>
        
        <div class="border-t mt-3 pt-3">
          <div class="text-xs text-gray-500">
            Available 24/7 • Response within 2 hours
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'FloatingHelpButton',
  setup() {
    const router = useRouter()
    const showHelpMenu = ref(false)
    
    const toggleHelp = () => {
      showHelpMenu.value = !showHelpMenu.value
    }
    
    const openChat = () => {
      console.log('Opening live chat...')
      showHelpMenu.value = false
      // Implement chat functionality
    }
    
    const openSupport = () => {
      console.log('Opening support...')
      showHelpMenu.value = false
      // Implement support functionality
    }
    
    const openTraining = () => {
      console.log('Opening training...')
      showHelpMenu.value = false
      // Implement training functionality
    }
    
    const handleClickOutside = (event) => {
      if (showHelpMenu.value && !event.target.closest('.floating-help-btn')) {
        showHelpMenu.value = false
      }
    }
    
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })
    
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })
    
    return {
      showHelpMenu,
      toggleHelp,
      openChat,
      openSupport,
      openTraining
    }
  }
}
</script>

<style scoped>
.help-menu-enter-active,
.help-menu-leave-active {
  transition: all 0.2s ease;
}

.help-menu-enter-from,
.help-menu-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
