<template>
  <Teleport to="body">
    <transition name="modal">
      <div 
        v-if="show" 
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        @click.self="$emit('update:show', false)"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">Redeem Access Code</h2>
            <button 
              @click="$emit('update:show', false)"
              class="text-gray-500 hover:text-gray-700"
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
          
          <div class="mb-4">
            <p class="text-gray-600 mb-4">
              Your eProduct access code will look like [UC2H3J4K5L6P] or [QMRR7A4WNAJXY3ZQRMNQ].
            </p>
            <input 
              v-model="accessCode"
              @keyup.enter="redeemCode"
              type="text" 
              placeholder="Enter your access code" 
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
            />
          </div>
          
          <div class="flex space-x-3">
            <button 
              @click="$emit('update:show', false)"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              @click="redeemCode"
              :disabled="!accessCode.trim()"
              class="flex-1 bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Redeem Code
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'RedeemModal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:show'],
  setup(props, { emit }) {
    const accessCode = ref('')
    
    const redeemCode = () => {
      if (accessCode.value.trim()) {
        console.log('Redeeming access code:', accessCode.value)
        // Handle access code redemption logic here
        alert('Access code redeemed successfully!')
        accessCode.value = ''
        emit('update:show', false)
      }
    }
    
    return {
      accessCode,
      redeemCode
    }
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
