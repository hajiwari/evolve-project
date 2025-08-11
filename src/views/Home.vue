<template>
  <div>
    <!-- Hero Section -->
    <section class="hero h-screen flex items-center justify-center relative overflow-hidden">
      <!-- Video Background -->
      <div class="absolute inset-0 w-full h-full overflow-hidden">
        <iframe 
          class="absolute inset-0 w-full h-full scale-150 object-cover"
          :src="videoUrl"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen>
        </iframe>
      </div>
      
      <!-- Dark overlay for better text readability -->
      <div class="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <div class="container mx-auto px-4 relative z-10 flex items-center justify-center h-full pt-20">
        <div class="text-center max-w-5xl mx-auto">
          <!-- Main Hero Content -->
          <div class="mb-12">
            <div class="inline-flex items-center rounded-full px-6 py-3 mb-6 drop-in-element" style="animation-delay: 0.3s;">
              <img src="https://evolve.elsevier.com/cs/images/EvolveLogo.svg" alt="Evolve" class="h-6 mr-3">
              <span class="text-sm text-white ml-2">by Elsevier</span>
            </div>
            
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-in-element" style="animation-delay: 0.6s;">
              Advance Your <span class="text-orange-400">Healthcare</span><br>
              <span class="text-orange-400">Education</span> Journey
            </h1>
            
            <p class="text-lg md:text-xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed drop-in-element" style="animation-delay: 0.9s;">
              Empowering healthcare educators with cutting-edge learning resources, 
              interactive tools, and comprehensive educational solutions.
            </p>
          </div>

          <!-- Enhanced Search Section -->
          <div class="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-6 mb-12 max-w-4xl mx-auto border border-gray-100 drop-in-element" style="animation-delay: 1.2s;">
            <div class="mb-4">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Search a product</h3>
              <p class="text-gray-600 text-sm">Search our extensive library of healthcare education materials</p>
            </div>
            
            <div class="relative">
              <div class="flex items-center bg-gray-50 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-20 focus-within:bg-white border-2 border-transparent focus-within:border-primary transition-all">
                <div class="w-5 h-5 mr-3">
                  <svg viewBox="0 0 24 24" class="w-full h-full text-gray-400">
                    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                </div>
                <input 
                  v-model="heroSearchQuery"
                  @keyup.enter="performHeroSearch"
                  type="text" 
                  placeholder="Search by ISBN, author, title, specialty, or keyword..." 
                  class="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500 text-base"
                />
                <button 
                  @click="performHeroSearch"
                  class="bg-primary text-white px-6 py-2 rounded-xl ml-3 hover:bg-opacity-90 transition-all transform hover:scale-105 font-semibold text-sm"
                >
                  Search
                </button>
              </div>
              
              <!-- Quick Filters -->
              <div class="flex flex-wrap gap-2 mt-3 justify-center items-center">
                <span class="text-xs text-gray-500">Popular searches:</span>
                <button 
                  v-for="category in quickSearchCategories" 
                  :key="category"
                  @click="searchByCategory(category)"
                  class="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition-colors"
                >
                  {{ category.charAt(0).toUpperCase() + category.slice(1) }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Catalog Section -->
    <section id="catalog" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16 scroll-reveal">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Browse Our Catalog</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of healthcare books, digital resources, and educational materials from licensed authors and publishers.
          </p>
        </div>

        <!-- Alert Banner -->
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded max-w-4xl mx-auto scroll-reveal">
          <div class="flex">
            <div class="flex-shrink-0">
              <i class="ri-alarm-warning-line text-yellow-400"></i>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-yellow-800">Scheduled Maintenance for Evolve</h3>
              <p class="text-sm text-yellow-700 mt-1">
                There is a scheduled Evolve maintenance planned for Friday, July 11th from 2 AM CDT to 5 AM CDT. 
                Evolve will not be available during this time. HESI iNet and HESI Faculty Access will continue to be available.
              </p>
            </div>
          </div>
        </div>

        <!-- Enhanced Search Section -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8 max-w-4xl mx-auto scroll-reveal">
          <h3 class="text-2xl font-semibold text-gray-900 mb-6 text-center">Search below to find and access Elsevier products</h3>
          <p class="text-gray-600 mb-6 text-center">Search for products and resources by ISBN, author, title, or keyword.</p>
          
          <div class="flex items-center bg-gray-50 rounded-lg px-4 py-3 mb-6">
            <i class="ri-search-line text-gray-400 mr-3 text-xl"></i>
            <input 
              v-model="catalogSearchQuery"
              @keyup.enter="performCatalogSearch"
              type="text" 
              placeholder="Search for products and resources..." 
              class="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500"
            />
            <button 
              @click="performCatalogSearch"
              class="bg-primary text-white px-6 py-2 rounded ml-3 hover:bg-opacity-90 transition-colors"
            >
              Search
            </button>
          </div>

          <div class="text-center">
            <p class="text-gray-600 mb-4">Browse Elsevier Education by program, discipline, and/or course.</p>
            <router-link 
              to="/catalog"
              class="bg-secondary text-primary px-6 py-2 rounded hover:bg-blue-100 transition-colors"
            >
              Browse Products
            </router-link>
          </div>
        </div>

        <!-- Quick Access Actions -->
        <div class="max-w-6xl mx-auto mb-16">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              @click="$router.push('/catalog')"
              class="bg-white rounded-2xl shadow-lg p-8 text-center card-hover cursor-pointer group border border-gray-100 scroll-reveal"
              style="animation-delay: 0.1s;"
            >
              <div class="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" class="w-8 h-8 text-primary">
                  <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Browse by Program</h3>
              <p class="text-gray-600 leading-relaxed">Explore educational resources organized by healthcare specialty and academic level</p>
            </div>
            
            <div 
              @click="showRedeemModal = true"
              class="bg-white rounded-2xl shadow-lg p-8 text-center card-hover cursor-pointer group border border-gray-100 scroll-reveal"
              style="animation-delay: 0.2s;"
            >
              <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" class="w-8 h-8 text-accent">
                  <path fill="currentColor" d="M12.65 10A6 6 0 0 0 12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.53 0 3-.36 4.3-1L12 17l-4-4 4-4 3.65 3.65z"/>
                  <path fill="currentColor" d="M17.5 13c-1.33 0-2.42.84-2.83 2H13c-.55 0-1 .45-1 1s.45 1 1 1h1.67c.41 1.16 1.5 2 2.83 2 1.66 0 3-1.34 3-3s-1.34-3-3-3z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Redeem Access Code</h3>
              <p class="text-gray-600 leading-relaxed">Enter your access code to unlock digital resources and exclusive content</p>
            </div>
            
            <div 
              @click="showManageModal = true"
              class="bg-white rounded-2xl shadow-lg p-8 text-center card-hover cursor-pointer group border border-gray-100 scroll-reveal"
              style="animation-delay: 0.3s;"
            >
              <div class="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" class="w-8 h-8 text-green-600">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Manage Students</h3>
              <p class="text-gray-600 leading-relaxed">Set up class rosters, track progress, and manage student enrollments</p>
            </div>
          </div>
        </div>

        <!-- Popular Categories -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div 
            v-for="(category, index) in categories" 
            :key="category.name"
            @click="filterByCategory(category.key)"
            class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group scroll-reveal"
            :style="`animation-delay: ${0.1 * (index + 1)}s;`"
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

        <!-- Quick Actions Detail Cards -->
        <div class="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto mt-16">
          <!-- Redeem Access Code Detail -->
          <div class="bg-white rounded-lg shadow-md p-6 scroll-reveal">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <i class="ri-key-line text-accent text-xl"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-900">Redeem an Access Code</h3>
            </div>
            <p class="text-gray-600 mb-4">
              Your eProduct access code will look like [UC2H3J4K5L6P] or [QMRR7A4WNAJXY3ZQRMNQ].
            </p>
            <input 
              v-model="accessCode"
              type="text" 
              placeholder="Enter your access code" 
              class="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary" 
            />
            <button 
              @click="redeemAccessCode"
              class="bg-primary text-white px-6 py-2 rounded w-full hover:bg-opacity-90 transition-colors"
            >
              Redeem Code
            </button>
          </div>

          <!-- Get Students into Course Detail -->
          <div class="bg-white rounded-lg shadow-md p-6 scroll-reveal">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <i class="ri-group-line text-green-600 text-xl"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-900">Get your Students into your Course</h3>
            </div>
            <p class="text-gray-600 mb-4">
              Evolve makes class rosters easy by allowing students to self-enroll with your course ID (looks similar to this: 1479_jdoes73_0001).
            </p>
            <div class="space-y-2">
              <button class="bg-secondary text-primary px-4 py-2 rounded hover:bg-blue-100 transition-colors w-full">
                Download Instructions
              </button>
              <button class="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors w-full">
                Submit Class Roster
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16 scroll-reveal">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Why Choose Evolve?</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform provides everything you need to create engaging, effective healthcare education experiences.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div 
            v-for="(feature, index) in features" 
            :key="feature.title"
            class="text-center group scroll-reveal"
            :style="`animation-delay: ${0.1 * (index + 1)}s;`"
          >
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all"
                 :class="feature.bgColor">
              <svg viewBox="0 0 24 24" class="w-8 h-8" :class="feature.iconColor">
                <path fill="currentColor" :d="feature.iconPath"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16 scroll-reveal">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">About Evolve</h2>
            <p class="text-xl text-gray-600">
              Leading the future of healthcare education through innovative digital solutions.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div class="scroll-reveal">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p class="text-gray-600 mb-6">
                At Evolve, we're committed to transforming healthcare education by providing innovative digital tools that enhance learning outcomes and prepare the next generation of healthcare professionals.
              </p>
              <p class="text-gray-600 mb-6">
                Our platform combines cutting-edge technology with evidence-based pedagogical approaches to create engaging, effective learning experiences for students and educators alike.
              </p>
              <div class="flex items-center">
                <i class="ri-award-line text-primary text-2xl mr-3"></i>
                <span class="text-gray-700 font-medium">Trusted by over 1,000 institutions worldwide</span>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-lg p-8 scroll-reveal">
              <div class="grid grid-cols-2 gap-6">
                <div class="text-center">
                  <div class="text-3xl font-bold text-primary mb-2">1M+</div>
                  <div class="text-gray-600">Active Students</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-primary mb-2">15K+</div>
                  <div class="text-gray-600">Educators</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-primary mb-2">98%</div>
                  <div class="text-gray-600">Satisfaction Rate</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div class="text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center scroll-reveal">
            <h3 class="text-2xl font-bold text-gray-900 mb-8">Ready to Transform Your Teaching?</h3>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="bg-primary text-white px-8 py-3 rounded-button btn-primary">
                Start Free Trial
              </button>
              <button class="border border-primary text-primary px-8 py-3 rounded-button hover:bg-primary hover:text-white transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Help Section -->
    <section id="help" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16 scroll-reveal">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Need Help?
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions or get in touch with our support team.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(helpItem, index) in helpItems" 
            :key="helpItem.title"
            class="bg-white rounded-lg shadow-sm p-6 text-center card-hover cursor-pointer scroll-reveal"
            :style="`animation-delay: ${0.1 * (index + 1)}s;`"
            @click="handleHelpClick(helpItem.action)"
          >
            <div class="w-16 h-16 flex items-center justify-center bg-primary rounded-full mx-auto mb-4">
              <i :class="[helpItem.icon, 'text-white', 'text-2xl']"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ helpItem.title }}</h3>
            <p class="text-gray-600 mb-4">{{ helpItem.description }}</p>
            <a href="#" class="text-primary hover:underline">{{ helpItem.linkText }}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Modals -->
    <RedeemModal v-model:show="showRedeemModal" />
    <ManageModal v-model:show="showManageModal" />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import RedeemModal from '../components/RedeemModal.vue'
import ManageModal from '../components/ManageModal.vue'

export default {
  name: 'Home',
  components: {
    RedeemModal,
    ManageModal
  },
  setup() {
    const router = useRouter()
    
    const heroSearchQuery = ref('')
    const catalogSearchQuery = ref('')
    const accessCode = ref('')
    const showRedeemModal = ref(false)
    const showManageModal = ref(false)
    const videoLoaded = ref(false)
    
    const quickSearchCategories = ['nursing', 'medical', 'pharmacy', 'dentistry']
    
    // Computed video URL with proper origin and autoplay
    const videoUrl = computed(() => {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://localhost'
      return `https://www.youtube.com/embed/W5Dm2WCk8jg?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&start=7&end=20&loop=1&playlist=W5Dm2WCk8jg&version=3&enablejsapi=1&origin=${origin}`
    })
    
    // Handle video loading
    const handleVideoLoad = () => {
      videoLoaded.value = true
      // Clean up preloaded video frame
      if (window.preloadedVideoFrame) {
        document.body.removeChild(window.preloadedVideoFrame)
        window.preloadedVideoFrame = null
      }
    }
    
    // Scroll reveal functionality
    const observeElements = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      })
      
      const elements = document.querySelectorAll('.scroll-reveal')
      elements.forEach(el => observer.observe(el))
      
      return observer
    }
    
    // Initialize animations on mount
    onMounted(() => {
      // Initialize scroll observer
      observeElements()
      
      // Trigger hero animations with proper staggered timing
      const heroElements = document.querySelectorAll('.drop-in-element')
      heroElements.forEach((el, index) => {
        // Get the animation delay from the element's style, or use index-based delay
        const delay = el.style.animationDelay ? 
          parseFloat(el.style.animationDelay) * 1000 : 
          (index + 1) * 200
        
        setTimeout(() => {
          el.classList.add('animate-in')
        }, delay)
      })
      
      // Load YouTube API for better video control
      if (!window.YT) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
        
        window.onYouTubeIframeAPIReady = () => {
          // YouTube API is ready, but we'll keep the current iframe approach
          // as it's simpler for this use case
        }
      }
    })
    
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
    
    const features = [
      {
        title: 'Adaptive Learning',
        description: 'Personalized learning paths that adapt to each student\'s pace and learning style for optimal outcomes.',
        bgColor: 'bg-blue-100 group-hover:bg-blue-200',
        iconColor: 'text-accent',
        iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
      },
      {
        title: 'Real-time Analytics',
        description: 'Comprehensive dashboards and reports to track student progress and identify areas for improvement.',
        bgColor: 'bg-green-100 group-hover:bg-green-200',
        iconColor: 'text-green-600',
        iconPath: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z'
      },
      {
        title: 'Mobile-First Design',
        description: 'Access your content anywhere, anytime with our responsive design optimized for all devices.',
        bgColor: 'bg-orange-100 group-hover:bg-orange-200',
        iconColor: 'text-primary',
        iconPath: 'M17 2v2h-2v11l-4-4-4 4V5H5V3h12zm-3 4H8v7l2-2 2 2V6z'
      },
      {
        title: 'Secure & Compliant',
        description: 'FERPA compliant with enterprise-grade security to protect student data and privacy.',
        bgColor: 'bg-purple-100 group-hover:bg-purple-200',
        iconColor: 'text-purple-600',
        iconPath: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z'
      },
      {
        title: 'Collaborative Tools',
        description: 'Foster collaboration with discussion boards, group projects, and peer review capabilities.',
        bgColor: 'bg-red-100 group-hover:bg-red-200',
        iconColor: 'text-red-600',
        iconPath: 'M16 4c4.42 0 8 3.58 8 8s-3.58 8-8 8c-1.61 0-3.11-.48-4.36-1.3L5.5 22.5 4.08 21.08l3.82-3.82A7.93 7.93 0 0 1 8 12c0-4.42 3.58-8 8-8zm0 2c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z'
      },
      {
        title: '24/7 Support',
        description: 'Dedicated support team available around the clock to help you succeed with our platform.',
        bgColor: 'bg-yellow-100 group-hover:bg-yellow-200',
        iconColor: 'text-yellow-600',
        iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
      }
    ]
    
    const helpItems = [
      {
        title: 'FAQ',
        description: 'Browse our frequently asked questions for quick answers.',
        icon: 'ri-question-line',
        linkText: 'View FAQ',
        action: 'faq'
      },
      {
        title: 'Support',
        description: 'Get help from our dedicated support team.',
        icon: 'ri-customer-service-line',
        linkText: 'Contact Support',
        action: 'support'
      },
      {
        title: 'Training',
        description: 'Learn how to make the most of our platform.',
        icon: 'ri-graduation-cap-line',
        linkText: 'View Training',
        action: 'training'
      }
    ]
    
    const performHeroSearch = () => {
      if (heroSearchQuery.value.trim()) {
        router.push(`/search?q=${encodeURIComponent(heroSearchQuery.value)}`)
      }
    }
    
    const performCatalogSearch = () => {
      if (catalogSearchQuery.value.trim()) {
        router.push(`/search?q=${encodeURIComponent(catalogSearchQuery.value)}`)
      }
    }
    
    const searchByCategory = (category) => {
      router.push(`/search?category=${encodeURIComponent(category)}`)
    }
    
    const filterByCategory = (category) => {
      router.push(`/search?category=${encodeURIComponent(category)}`)
    }
    
    const redeemAccessCode = () => {
      if (accessCode.value.trim()) {
        console.log('Redeeming access code:', accessCode.value)
        // Handle access code redemption
        accessCode.value = ''
        alert('Access code redeemed successfully!')
      }
    }
    
    const handleHelpClick = (action) => {
      switch (action) {
        case 'faq':
          router.push('/help#faq')
          break
        case 'support':
          router.push('/help#support')
          break
        case 'training':
          router.push('/help#training')
          break
        default:
          console.log('Help action:', action)
      }
    }
    
    return {
      heroSearchQuery,
      catalogSearchQuery,
      accessCode,
      showRedeemModal,
      showManageModal,
      quickSearchCategories,
      categories,
      features,
      helpItems,
      videoUrl,
      performHeroSearch,
      performCatalogSearch,
      searchByCategory,
      filterByCategory,
      redeemAccessCode,
      handleHelpClick
    }
  }
}
</script>

<style scoped>
/* Drop-in animations for hero section */
.drop-in-element {
  opacity: 0;
  transform: translateY(-30px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.drop-in-element.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Scroll reveal animations */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.scroll-reveal.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered animations for grid items */
.scroll-reveal:nth-child(1) { transition-delay: 0.1s; }
.scroll-reveal:nth-child(2) { transition-delay: 0.2s; }
.scroll-reveal:nth-child(3) { transition-delay: 0.3s; }
.scroll-reveal:nth-child(4) { transition-delay: 0.4s; }
.scroll-reveal:nth-child(5) { transition-delay: 0.5s; }
.scroll-reveal:nth-child(6) { transition-delay: 0.6s; }

/* Enhanced card hover effects */
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Component-specific styles */
.delay-1000 {
  animation-delay: 1000ms;
}

.delay-500 {
  animation-delay: 500ms;
}

.delay-700 {
  animation-delay: 700ms;
}

.delay-300 {
  animation-delay: 300ms;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom bounce animation for floating elements */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Fade-in-up animation variant */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

/* Scale-in animation for icons */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn 0.5s ease-out forwards;
}
</style>
