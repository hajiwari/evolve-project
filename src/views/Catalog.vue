<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Product Catalog</h1>
        <p class="text-gray-600">Explore our comprehensive collection of healthcare education resources</p>
      </div>

      <!-- Categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div 
          v-for="category in categories" 
          :key="category.name"
          @click="filterByCategory(category.key)"
          class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <div class="w-16 h-16 bg-gradient-to-br rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
               :class="category.bgColor">
            <i :class="[category.icon, 'text-3xl', category.textColor]"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ category.name }}</h3>
          <p class="text-gray-600 text-sm mb-4">{{ category.description }}</p>
          <div class="text-sm text-gray-500">{{ category.count }}+ resources</div>
        </div>
      </div>

      <!-- Featured Products -->
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">Featured Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="product in featuredProducts" 
            :key="product.id"
            class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <img 
              :src="product.image" 
              :alt="product.title"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="font-semibold text-gray-900 mb-2">{{ product.title }}</h3>
              <p class="text-sm text-gray-600 mb-2">{{ product.author }}</p>
              <p class="text-sm text-gray-500 mb-4">{{ product.category }}</p>
              <div class="flex items-center justify-between">
                <span class="text-xl font-bold text-primary">${{ product.price }}</span>
                <button 
                  @click="addToCart(product)"
                  class="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Browse by Program -->
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">Browse by Program</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="program in programs" 
            :key="program.name"
            class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            @click="filterByProgram(program.key)"
          >
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                <i :class="[program.icon, 'text-primary', 'text-xl']"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">{{ program.name }}</h3>
                <p class="text-sm text-gray-600">{{ program.count }} resources</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Digital Resources -->
      <div class="bg-white rounded-lg shadow-sm p-8 mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">Digital Resources</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="ri-book-open-line text-blue-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">eBooks</h3>
            <p class="text-gray-600">Access digital textbooks with interactive features and offline reading</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="ri-video-line text-green-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Video Learning</h3>
            <p class="text-gray-600">Watch educational videos and interactive multimedia content</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="ri-flask-line text-purple-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Simulations</h3>
            <p class="text-gray-600">Practice with virtual patient scenarios and lab simulations</p>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center bg-gradient-to-r from-primary to-accent text-white rounded-lg p-8">
        <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p class="text-xl mb-6">Join thousands of healthcare educators using Evolve</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link 
            to="/signup"
            class="bg-white text-primary px-8 py-3 rounded-button font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Free Trial
          </router-link>
          <router-link 
            to="/help"
            class="border-2 border-white text-white px-8 py-3 rounded-button font-semibold hover:bg-white hover:text-primary transition-colors"
          >
            Learn More
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

export default {
  name: 'Catalog',
  setup() {
    const router = useRouter()
    const cartStore = useCartStore()
    
    const categories = [
      {
        name: 'Nursing',
        key: 'nursing',
        description: 'Comprehensive nursing textbooks and resources',
        count: 145,
        icon: 'ri-heart-pulse-line',
        bgColor: 'from-blue-100 to-blue-200',
        textColor: 'text-blue-600'
      },
      {
        name: 'Medical',
        key: 'medicine',
        description: 'Medical textbooks and reference materials',
        count: 89,
        icon: 'ri-stethoscope-line',
        bgColor: 'from-green-100 to-green-200',
        textColor: 'text-green-600'
      },
      {
        name: 'Pharmacy',
        key: 'pharmacy',
        description: 'Pharmacology and pharmaceutical resources',
        count: 67,
        icon: 'ri-capsule-line',
        bgColor: 'from-purple-100 to-purple-200',
        textColor: 'text-purple-600'
      },
      {
        name: 'Dentistry',
        key: 'dentistry',
        description: 'Dental education and practice resources',
        count: 43,
        icon: 'ri-tooth-line',
        bgColor: 'from-orange-100 to-orange-200',
        textColor: 'text-orange-600'
      }
    ]
    
    const featuredProducts = ref([
      {
        id: 1,
        title: 'Nursing Fundamentals: Active Learning for Collaborative Practice',
        author: 'Barbara L. Yoost',
        category: 'Nursing',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop'
      },
      {
        id: 2,
        title: 'Medical-Surgical Nursing: Concepts for Interprofessional Care',
        author: 'Donna D. Ignatavicius',
        category: 'Medical',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=300&fit=crop'
      },
      {
        id: 3,
        title: 'Pharmacology for Nurses: A Pathophysiologic Approach',
        author: 'Michael Adams',
        category: 'Pharmacy',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop'
      }
    ])
    
    const programs = ref([
      {
        name: 'Associate Degree Nursing',
        key: 'adn',
        count: 45,
        icon: 'ri-graduation-cap-line'
      },
      {
        name: 'Bachelor of Science in Nursing',
        key: 'bsn',
        count: 67,
        icon: 'ri-school-line'
      },
      {
        name: 'Master of Science in Nursing',
        key: 'msn',
        count: 32,
        icon: 'ri-medal-line'
      },
      {
        name: 'Licensed Practical Nurse',
        key: 'lpn',
        count: 38,
        icon: 'ri-user-heart-line'
      },
      {
        name: 'Medical Assistant',
        key: 'ma',
        count: 28,
        icon: 'ri-first-aid-kit-line'
      },
      {
        name: 'Pharmacy Technician',
        key: 'pt',
        count: 23,
        icon: 'ri-capsule-line'
      }
    ])
    
    const filterByCategory = (category) => {
      router.push(`/search?category=${encodeURIComponent(category)}`)
    }
    
    const filterByProgram = (program) => {
      router.push(`/search?program=${encodeURIComponent(program)}`)
    }
    
    const addToCart = (product) => {
      cartStore.addItem(product)
      alert(`${product.title} added to cart!`)
    }
    
    return {
      categories,
      featuredProducts,
      programs,
      filterByCategory,
      filterByProgram,
      addToCart
    }
  }
}
</script>
