<template>
  <Teleport to="body">
    <transition name="cart-overlay">
      <div 
        v-if="show" 
        class="fixed inset-0 bg-black bg-opacity-50 z-50"
        @click.self="$emit('update:show', false)"
      >
        <transition name="cart-panel">
          <div class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div class="flex items-center justify-between p-6 border-b">
              <h3 class="text-xl font-semibold">Shopping Cart</h3>
              <button 
                @click="$emit('update:show', false)"
                class="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg viewBox="0 0 24 24" class="w-6 h-6">
                  <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            
            <div class="flex-1 overflow-y-auto p-6">
              <div v-if="cartItems.length === 0" class="text-center py-12">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 24 24" class="w-8 h-8 text-gray-400">
                    <path fill="currentColor" d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </div>
                <p class="text-gray-500 mb-2">Your cart is empty</p>
                <p class="text-sm text-gray-400">Add some items to get started</p>
              </div>
              
              <div v-else class="space-y-4">
                <div 
                  v-for="item in cartItems" 
                  :key="item.id"
                  class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                >
                  <img 
                    :src="item.image" 
                    :alt="item.title"
                    class="w-16 h-16 object-cover rounded"
                  >
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-900">{{ item.title }}</h4>
                    <p class="text-sm text-gray-500">{{ item.author }}</p>
                    <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-900">${{ item.price.toFixed(2) }}</p>
                    <button 
                      @click="removeItem(item.id)"
                      class="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="border-t p-6">
              <div class="flex justify-between items-center mb-4">
                <span class="text-lg font-semibold">Total:</span>
                <span class="text-xl font-bold text-primary">${{ cartTotal.toFixed(2) }}</span>
              </div>
              <button 
                @click="$emit('checkout')"
                :disabled="cartItems.length === 0"
                class="w-full bg-primary text-white py-3 rounded-button btn-primary font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script>
export default {
  name: 'CartOverlay',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    cartItems: {
      type: Array,
      default: () => []
    },
    cartTotal: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:show', 'checkout'],
  setup(props, { emit }) {
    const removeItem = (itemId) => {
      // This should be handled by the cart store
      console.log('Remove item:', itemId)
    }

    return {
      removeItem
    }
  }
}
</script>

<style scoped>
.cart-overlay-enter-active,
.cart-overlay-leave-active {
  transition: all 0.3s ease;
}

.cart-overlay-enter-from,
.cart-overlay-leave-to {
  opacity: 0;
}

.cart-panel-enter-active,
.cart-panel-leave-active {
  transition: all 0.3s ease;
}

.cart-panel-enter-from,
.cart-panel-leave-to {
  transform: translateX(100%);
}
</style>
