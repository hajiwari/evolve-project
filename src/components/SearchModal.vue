<template>
  <Teleport to="body">
    <transition name="search-modal">
      <div 
        v-if="show" 
        class="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center px-6 py-8"
        @click.self="$emit('update:show', false)"
      >
        <div class="w-full max-w-4xl">
          <!-- Evolve Search Title -->
          <div class="text-center mb-16">
            <h1 class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-primary whitespace-nowrap">
              <span>{{ typingText }}</span>
              <span class="animate-pulse">|</span>
            </h1>
          </div>

          <!-- Search Container -->
          <div class="relative">
            <!-- Subtext above search bar -->
            <div class="text-center mb-6">
              <p class="text-lg text-gray-600 font-medium">
                Discover products, find deals, and explore everything Evolve has to offer
              </p>
            </div>
            
            <!-- Search Input -->
            <div class="relative mb-6">
              <input 
                ref="searchInput"
                v-model="searchQuery"
                @keyup.enter="performSearch"
                type="text" 
                placeholder="What are you looking for?" 
                class="w-full px-8 py-6 pl-20 text-xl bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-500 ease-out text-gray-800 placeholder-gray-500"
              />
              <div class="absolute left-6 top-1/2 transform -translate-y-1/2">
                <svg viewBox="0 0 24 24" class="w-7 h-7 text-gray-500">
                  <path fill="currentColor" d="M9.5 16c-1.61 0-3.09-.59-4.23-1.57L2.42 17.28a.996.996 0 1 0 1.41 1.41l2.85-2.85A6.96 6.96 0 0 0 9.5 16c3.86 0 7-3.14 7-7s-3.14-7-7-7-7 3.14-7 7 3.14 7 7 7zm0-12c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z"/>
                </svg>
              </div>
            </div>

            <!-- Search Button -->
            <div class="flex justify-center">
              <button 
                @click="performSearch"
                class="bg-primary text-white px-12 py-4 rounded-2xl hover:bg-opacity-100 transition-all duration-300 font-semibold text-lg shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transform"
              >
                Search
              </button>
            </div>
          </div>

          <!-- Close Button -->
          <div class="absolute top-8 right-8">
            <button 
              @click="$emit('update:show', false)"
              class="w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-gray-600 hover:text-gray-800 transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import { ref, nextTick, onMounted, onUnmounted, watch } from 'vue'

export default {
  name: 'SearchModal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:show', 'search'],
  setup(props, { emit }) {
    const searchInput = ref(null)
    const searchQuery = ref('')
    const typingText = ref('')
    const targetText = 'Evolve Search'
    let typingFrame = null
    let i = 0

    const performSearch = () => {
      if (searchQuery.value.trim()) {
        emit('search', searchQuery.value.trim())
        emit('update:show', false)
        searchQuery.value = ''
      }
    }

    // Optimized typeWriter using requestAnimationFrame
    const typeWriter = () => {
      if (typingFrame) {
        cancelAnimationFrame(typingFrame)
      }
      typingText.value = ''
      i = 0
      const step = () => {
        if (i < targetText.length) {
          typingText.value += targetText.charAt(i)
          i++
          typingFrame = requestAnimationFrame(step)
        } else {
          typingFrame = null
        }
      }
      typingFrame = requestAnimationFrame(step)
    }

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        emit('update:show', false)
      }
    }

    // Watch for show prop changes
    watch(() => props.show, (newVal) => {
      if (newVal) {
        // Reset and start typing animation
        typingText.value = ''
        setTimeout(() => {
          typeWriter()
        }, 100) // Small delay for smoother animation
        
        nextTick(() => {
          if (searchInput.value) {
            searchInput.value.focus()
          }
        })
      } else {
        // Clean up when modal closes
        if (typingFrame) {
          cancelAnimationFrame(typingFrame)
          typingFrame = null
        }
      }
    })

    onMounted(() => {
      document.addEventListener('keydown', handleKeydown)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown)
      // Clean up interval on unmount
      if (typingFrame) {
        cancelAnimationFrame(typingFrame)
        typingFrame = null
      }
    })

    return {
      searchInput,
      searchQuery,
      typingText,
      performSearch
    }
  }
}
</script>

<style scoped>
.search-modal-enter-active,
.search-modal-leave-active {
  transition: all 0.5s ease;
}

.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Optimize animations for better performance */
h1 {
  will-change: transform;
  transform: translateZ(0);
}

/* Reduce blur intensity for better performance */
.fixed.inset-0 {
  backdrop-filter: blur(8px);
}

/* Optimize button animations */
button {
  will-change: transform;
  transform: translateZ(0);
}

/* Smooth cursor animation */
.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

/* Prevent layout shifts during typing */
h1 span:first-child {
  display: inline-block;
  min-width: 0;
}

/* Optimize logo loading */
img {
  will-change: opacity;
  transform: translateZ(0);
}
</style>
