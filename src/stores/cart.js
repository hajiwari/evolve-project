import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isLoading: false
  }),
  
  getters: {
    itemCount: (state) => {
      return state.items.reduce((count, item) => count + item.quantity, 0)
    },
    
    total: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    
    isEmpty: (state) => state.items.length === 0
  },
  
  actions: {
    addItem(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({
          id: product.id,
          title: product.title,
          author: product.author,
          price: product.price,
          image: product.image,
          quantity: 1
        })
      }
    },
    
    removeItem(productId) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },
    
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId)
        } else {
          item.quantity = quantity
        }
      }
    },
    
    clearCart() {
      this.items = []
    },
    
    async checkout() {
      this.isLoading = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Clear cart after successful checkout
        this.clearCart()
        
        return { success: true }
      } catch (error) {
        console.error('Checkout failed:', error)
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    }
  }
})
