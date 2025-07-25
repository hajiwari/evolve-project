<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Search Results</h1>
        <p class="text-gray-600">
          <span v-if="searchQuery">Showing results for: <strong>"{{ searchQuery }}"</strong></span>
          <span v-else-if="categoryFilter">Category: <strong>{{ categoryFilter }}</strong></span>
          <span v-else>Browse all resources</span>
        </p>
      </div>

      <!-- Search Bar -->
      <div class="max-w-2xl mx-auto mb-8">
        <div class="relative">
          <div class="flex items-center bg-white rounded-lg shadow-sm border px-4 py-3 focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-20 focus-within:shadow-md transition-all duration-300 search-container">
            <i class="ri-search-line text-gray-400 mr-3 text-xl search-icon"></i>
            <input 
              v-model="currentSearch"
              @keyup.enter="performSearch"
              @input="onSearchInput"
              type="text" 
              placeholder="Search for products and resources..." 
              class="flex-1 outline-none text-gray-700 placeholder-gray-500 transition-all duration-200 search-input"
              :disabled="isLoading"
            />
            <button 
              @click="performSearch"
              :disabled="isLoading"
              class="bg-primary text-white px-6 py-2 rounded ml-3 hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 search-button"
            >
              <span v-if="!isLoading">Search</span>
              <span v-else class="flex items-center">
                <i class="ri-loader-4-line animate-spin mr-1"></i>
                Searching...
              </span>
            </button>
          </div>
          
          <!-- Typing animation indicator -->
          <div v-if="isTyping" class="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border p-3 z-10 typing-indicator">
            <div class="flex items-center text-sm text-gray-600">
              <div class="flex space-x-1 mr-2">
                <div class="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
              <span>Preparing search...</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="mb-8">
        <div class="flex flex-wrap gap-2 justify-center">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="filterByCategory(category)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              categoryFilter === category 
                ? 'bg-primary text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            {{ category.charAt(0).toUpperCase() + category.slice(1) }}
          </button>
          <button 
            v-if="categoryFilter"
            @click="clearFilters"
            class="px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="relative w-16 h-16 mx-auto mb-4">
          <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-primary rounded-full animate-spin animation-delay-75"></div>
        </div>
        <p class="text-gray-600 animate-pulse">
          <span v-if="searchQuery">Searching for "{{ searchQuery }}"...</span>
          <span v-else-if="categoryFilter">Loading {{ categoryFilter }} resources...</span>
          <span v-else>Loading resources...</span>
        </p>
      </div>

      <!-- Results -->
      <div v-else-if="searchResults.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(item, index) in searchResults" 
          :key="item.id"
          class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 cursor-pointer card-hover transform hover:scale-105"
          :style="{ animationDelay: `${index * 100}ms` }"
          @click="viewItem(item)"
        >
          <div class="flex items-start space-x-4">
            <img 
              :src="item.image" 
              :alt="item.title"
              class="w-20 h-24 object-cover rounded"
            />
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 mb-2">{{ item.title }}</h3>
              <p class="text-sm text-gray-600 mb-2">{{ item.author }}</p>
              <p class="text-sm text-gray-500 mb-3">{{ item.category }}</p>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-primary">${{ item.price }}</span>
                <button 
                  @click.stop="addToCart(item)"
                  class="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-opacity-90 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-12">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="ri-search-line text-gray-400 text-2xl"></i>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
        <p class="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
        <button 
          @click="clearFilters"
          class="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
        >
          Browse All Resources
        </button>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8">
        <nav class="flex items-center space-x-2">
          <button 
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <button 
            v-for="page in visiblePages" 
            :key="page"
            @click="changePage(page)"
            :class="[
              'px-3 py-2 rounded border',
              currentPage === page 
                ? 'bg-primary text-white border-primary' 
                : 'border-gray-300 hover:bg-gray-50'
            ]"
          >
            {{ page }}
          </button>
          
          <button 
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

export default {
  name: 'Search',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const cartStore = useCartStore()
    
    const currentSearch = ref('')
    const searchQuery = ref('')
    const categoryFilter = ref('')
    const searchResults = ref([])
    const isLoading = ref(false)
    const isTyping = ref(false)
    const currentPage = ref(1)
    const totalPages = ref(1)
    
    let typingTimer = null
    
    const categories = ['all', 'nursing', 'medical', 'pharmacy', 'dentistry', 'physical therapy', 'veterinary']
    
    // Mock data for demonstration
    const mockResults = [
      {
        id: 1,
        title: 'Nursing Fundamentals: Active Learning for Collaborative Practice',
        author: 'Barbara L. Yoost',
        category: 'Nursing',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=300&fit=crop'
      },
      {
        id: 2,
        title: 'Medical-Surgical Nursing: Concepts for Interprofessional Care',
        author: 'Donna D. Ignatavicius',
        category: 'Medical',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=200&h=300&fit=crop'
      },
      {
        id: 3,
        title: 'Pharmacology for Nurses: A Pathophysiologic Approach',
        author: 'Michael Adams',
        category: 'Pharmacy',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=300&fit=crop'
      },
      {
        id: 4,
        title: 'Oral and Maxillofacial Surgery',
        author: 'Raymond J. Fonseca',
        category: 'Dentistry',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=300&fit=crop'
      },
      {
        id: 5,
        title: 'Pediatric Nursing: Caring for Children and Their Families',
        author: 'Nicki L. Potts',
        category: 'Nursing',
        price: 119.99,
        image: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=200&h=300&fit=crop'
      },
      {
        id: 6,
        title: 'Physical Therapy: Clinical Practice and Techniques',
        author: 'Susan B. O\'Sullivan',
        category: 'Physical Therapy',
        price: 109.99,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=300&fit=crop'
      }
    ]
    
    const visiblePages = computed(() => {
      const pages = []
      const start = Math.max(1, currentPage.value - 2)
      const end = Math.min(totalPages.value, currentPage.value + 2)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    })
    
    const performSearch = async () => {
      if (!currentSearch.value.trim()) return
      
      // Hide typing indicator and show loading
      isTyping.value = false
      isLoading.value = true
      searchQuery.value = currentSearch.value
      
      // Update URL
      router.push({
        path: '/search',
        query: { q: searchQuery.value }
      })
      
      // Simulate API call with smoother animation
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      // Filter results based on search query
      const filtered = mockResults.filter(item => 
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
      
      searchResults.value = filtered
      totalPages.value = Math.ceil(filtered.length / 9) // 9 items per page
      currentPage.value = 1
      isLoading.value = false
    }
    
    const onSearchInput = () => {
      // Show typing indicator
      isTyping.value = true
      
      // Clear previous timer
      if (typingTimer) {
        clearTimeout(typingTimer)
      }
      
      // Hide typing indicator after user stops typing
      typingTimer = setTimeout(() => {
        isTyping.value = false
      }, 1000)
      
      // Optional: Add debounced search for better UX
      // This prevents too many searches while typing
    }
    
    const filterByCategory = async (category) => {
      if (category === 'all') {
        categoryFilter.value = ''
      } else {
        categoryFilter.value = category
      }
      
      isLoading.value = true
      
      // Update URL
      router.push({
        path: '/search',
        query: { category: category === 'all' ? undefined : category }
      })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Filter results
      let filtered = mockResults
      if (categoryFilter.value) {
        filtered = mockResults.filter(item => 
          item.category.toLowerCase() === categoryFilter.value.toLowerCase()
        )
      }
      
      searchResults.value = filtered
      totalPages.value = Math.ceil(filtered.length / 9)
      currentPage.value = 1
      isLoading.value = false
    }
    
    const clearFilters = () => {
      searchQuery.value = ''
      categoryFilter.value = ''
      currentSearch.value = ''
      router.push('/search')
      searchResults.value = mockResults
      totalPages.value = Math.ceil(mockResults.length / 9)
      currentPage.value = 1
    }
    
    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
        // In a real app, this would fetch new data
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    
    const viewItem = (item) => {
      console.log('Viewing item:', item)
      // Navigate to item details page
    }
    
    const addToCart = (item) => {
      cartStore.addItem(item)
      // Show success message
      alert(`${item.title} added to cart!`)
    }
    
    // Initialize from URL parameters
    onMounted(() => {
      const query = route.query.q
      const category = route.query.category
      
      if (query) {
        currentSearch.value = query
        searchQuery.value = query
        performSearch()
      } else if (category) {
        categoryFilter.value = category
        filterByCategory(category)
      } else {
        searchResults.value = mockResults
        totalPages.value = Math.ceil(mockResults.length / 9)
      }
    })
    
    // Watch for route changes
    watch(() => route.query, (newQuery) => {
      if (newQuery.q && newQuery.q !== searchQuery.value) {
        currentSearch.value = newQuery.q
        searchQuery.value = newQuery.q
        performSearch()
      } else if (newQuery.category && newQuery.category !== categoryFilter.value) {
        categoryFilter.value = newQuery.category
        filterByCategory(newQuery.category)
      }
    })
    
    return {
      currentSearch,
      searchQuery,
      categoryFilter,
      searchResults,
      isLoading,
      isTyping,
      currentPage,
      totalPages,
      categories,
      visiblePages,
      performSearch,
      onSearchInput,
      filterByCategory,
      clearFilters,
      changePage,
      viewItem,
      addToCart
    }
  }
}
</script>

<style scoped>
.search-container {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-container:focus-within {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 122, 0, 0.15);
}

.search-input {
  transition: all 0.2s ease;
}

.search-input:focus {
  transform: translateX(2px);
}

.search-icon {
  transition: all 0.3s ease;
}

.search-container:focus-within .search-icon {
  color: #FF7A00;
  transform: scale(1.1);
}

.search-button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-button:hover:not(:disabled) {
  transform: translateY(-1px) scale(1.05);
  box-shadow: 0 4px 12px rgba(255, 122, 0, 0.3);
}

.typing-indicator {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-hover {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom loading spinner */
.animation-delay-75 {
  animation-delay: 75ms;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
    transform: translateY(-8px);
  }
  70% {
    transform: translateY(-4px);
  }
  90% {
    transform: translateY(-2px);
  }
}
</style>