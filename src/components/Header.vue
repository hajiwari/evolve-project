<template>
  <div>
    <!-- Role Selection Modal -->
    <Teleport to="body">
      <div 
        v-if="showRoleModal" 
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        @click.self="showRoleModal = false"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-8 text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Welcome to Evolve</h2>
          <p class="text-gray-600 mb-8">Choose your role to get started</p>
          <div class="space-y-4">
            <button 
              @click="selectRole('student')"
              class="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              I'm a Student
            </button>
            <button 
              @click="selectRole('instructor')"
              class="w-full border border-primary text-primary py-3 px-6 rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              I'm an Instructor
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Shopping Cart Overlay -->
    <CartOverlay 
      v-model:show="showCart" 
      :cart-items="cartItems" 
      :cart-total="cartTotal"
      @checkout="handleCheckout"
    />

    <!-- Search Modal -->
    <SearchModal 
      v-model:show="showSearch" 
      @search="handleSearch"
    />

    <!-- Navigation -->
    <header 
      class="fixed top-0 left-0 right-0 border-b border-gray-100 shadow-lg z-50 transition-all duration-300"
      :class="isScrolled ? 'bg-white/80 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl'"
    >
      <div class="container mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img src="https://evolve.elsevier.com/cs/images/NonSolusLogo.svg" alt="Elsevier" class="h-10">
            <img src="https://evolve.elsevier.com/cs/images/EvolveLogo.svg" alt="Evolve" class="h-4">
          </router-link>
        </div>

        <nav class="hidden md:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
          <router-link 
            to="/my-evolve" 
            class="nav-link px-5 py-2.5 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all duration-200 font-medium"
          >
            My Evolve
          </router-link>
          <a 
            href="#catalog" 
            @click="scrollToSection('catalog')"
            class="nav-link px-5 py-2.5 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all duration-200 font-medium"
          >
            Catalog
          </a>
          <a 
            href="#features" 
            @click="scrollToSection('features')"
            class="nav-link px-5 py-2.5 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all duration-200 font-medium"
          >
            Features
          </a>
        </nav>

        <div class="flex items-center space-x-4">
          <!-- Icons Group -->
          <div class="hidden md:flex items-center space-x-2">
            <button 
              @click="showSearch = true"
              class="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary transition-all duration-200 group" 
              title="Search"
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6 group-hover:scale-110 transition-transform">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
            <button 
              @click="showCart = true"
              class="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary transition-all duration-200 relative group"
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6 group-hover:scale-110 transition-transform">
                <path fill="currentColor" d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              <span class="absolute -top-1 -right-1 bg-gradient-to-r from-primary to-primary/80 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow-lg">
                {{ cartItemCount }}
              </span>
            </button>
          </div>
          
          <router-link 
            to="/login"
            class="hidden md:block text-gray-700 hover:text-primary hover:bg-primary/5 px-5 py-2.5 rounded-2xl transition-all duration-200 font-medium whitespace-nowrap"
          >
            Sign In
          </router-link>
          <router-link 
            to="/signup"
            class="hidden md:block bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-2.5 rounded-2xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 whitespace-nowrap"
          >
            Sign Up
          </router-link>
          <button 
            @click="toggleMobileMenu"
            class="md:hidden w-12 h-12 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 group"
          >
            <svg viewBox="0 0 24 24" class="w-6 h-6 group-hover:scale-110 transition-transform">
              <path fill="currentColor" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="mobile-menu">
        <div 
          v-if="showMobileMenu"
          class="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl absolute w-full left-0 top-20"
        >
          <div class="container mx-auto px-6 py-6 flex flex-col space-y-2">
            <router-link 
              to="/my-evolve" 
              class="mobile-nav-link px-5 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all duration-200 font-medium"
              @click="showMobileMenu = false"
            >
              My Evolve
            </router-link>
            <a 
              href="#catalog" 
              @click="scrollToSection('catalog'); showMobileMenu = false"
              class="mobile-nav-link px-5 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all duration-200 font-medium"
            >
              Catalog
            </a>
            <a 
              href="#features" 
              @click="scrollToSection('features'); showMobileMenu = false"
              class="mobile-nav-link px-5 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all duration-200 font-medium"
            >
              Features
            </a>
            <router-link 
              to="/about" 
              class="mobile-nav-link px-5 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all duration-200 font-medium"
              @click="showMobileMenu = false"
            >
              About
            </router-link>
            
            <!-- Mobile Search Button -->
            <button 
              @click="showSearch = true; showMobileMenu = false"
              class="flex items-center space-x-3 px-5 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all duration-200 font-medium"
            >
              <svg viewBox="0 0 24 24" class="w-5 h-5">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <span>Search</span>
            </button>
            
            <div class="flex flex-col space-y-3 pt-4 border-t border-gray-100">
              <router-link 
                to="/login" 
                class="px-5 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all duration-200 font-medium text-left whitespace-nowrap"
                @click="showMobileMenu = false"
              >
                Sign In
              </router-link>
              <router-link 
                to="/signup" 
                class="bg-gradient-to-r from-primary to-primary/80 text-white px-5 py-3 rounded-2xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 whitespace-nowrap text-center"
                @click="showMobileMenu = false"
              >
                Sign Up
              </router-link>
            </div>
          </div>
        </div>
      </transition>
    </header>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import CartOverlay from './CartOverlay.vue'
import SearchModal from './SearchModal.vue'
import { useCartStore } from '../stores/cart'

export default {
  name: 'Header',
  components: {
    CartOverlay,
    SearchModal
  },
  setup() {
    const router = useRouter()
    const cartStore = useCartStore()
    
    const showRoleModal = ref(false)
    const showCart = ref(false)
    const showSearch = ref(false)
    const showMobileMenu = ref(false)
    const isScrolled = ref(false)

    const cartItems = computed(() => cartStore.items)
    const cartTotal = computed(() => cartStore.total)
    const cartItemCount = computed(() => cartStore.itemCount)

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50
    }

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }

    const scrollToSection = (sectionId) => {
      if (router.currentRoute.value.path !== '/') {
        router.push('/')
        setTimeout(() => {
          const element = document.getElementById(sectionId)
          if (element) {
            const headerHeight = 80
            const targetPosition = element.offsetTop - headerHeight
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            })
          }
        }, 100)
      } else {
        const element = document.getElementById(sectionId)
        if (element) {
          const headerHeight = 80
          const targetPosition = element.offsetTop - headerHeight
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          })
        }
      }
    }

    const selectRole = (role) => {
      console.log('Selected role:', role)
      showRoleModal.value = false
      // Handle role selection logic here
    }

    const handleSearch = (query) => {
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query)}`)
      }
    }

    const handleCheckout = () => {
      console.log('Proceeding to checkout...')
      // Handle checkout logic
    }

    // Close mobile menu when clicking outside
    const handleClickOutside = (event) => {
      if (showMobileMenu.value && !event.target.closest('.mobile-menu-container')) {
        showMobileMenu.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      showRoleModal,
      showCart,
      showSearch,
      showMobileMenu,
      isScrolled,
      cartItems,
      cartTotal,
      cartItemCount,
      toggleMobileMenu,
      scrollToSection,
      selectRole,
      handleSearch,
      handleCheckout
    }
  }
}
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
