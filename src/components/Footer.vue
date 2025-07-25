<template>
  <footer class="bg-gray-900 text-white py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="lg:col-span-2">
          <div class="flex items-center space-x-3 mb-6">
            <img src="https://evolve.elsevier.com/cs/images/NonSolusLogo.svg" alt="Elsevier" class="h-8 filter brightness-0 invert">
            <img src="https://evolve.elsevier.com/cs/images/EvolveLogo.svg" alt="Evolve" class="h-4 filter brightness-0 invert">
          </div>
          <p class="text-gray-300 mb-6 max-w-md">
            Empowering healthcare education through innovative digital learning solutions. 
            Trusted by educators and students worldwide.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <i class="ri-facebook-fill text-xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <i class="ri-twitter-fill text-xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <i class="ri-linkedin-fill text-xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <i class="ri-youtube-fill text-xl"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <a 
                href="#catalog" 
                @click="scrollToSection('catalog')"
                class="footer-nav-link text-gray-300 hover:text-white transition-colors"
              >
                Catalog
              </a>
            </li>
            <li>
              <router-link 
                to="/my-evolve" 
                class="footer-nav-link text-gray-300 hover:text-white transition-colors"
              >
                My Evolve
              </router-link>
            </li>
            <li>
              <a 
                href="#products" 
                @click="scrollToSection('products')"
                class="footer-nav-link text-gray-300 hover:text-white transition-colors"
              >
                Products
              </a>
            </li>
            <li>
              <a 
                href="#features" 
                @click="scrollToSection('features')"
                class="footer-nav-link text-gray-300 hover:text-white transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <router-link 
                to="/about" 
                class="footer-nav-link text-gray-300 hover:text-white transition-colors"
              >
                About
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Support</h3>
          <ul class="space-y-2">
            <li>
              <router-link 
                to="/help" 
                class="footer-nav-link text-gray-300 hover:text-white transition-colors"
              >
                Help Center
              </router-link>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                Contact Support
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                Training
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                System Status
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                Documentation
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div class="text-gray-400 text-sm mb-4 md:mb-0">
          © 2024 Elsevier Inc. All rights reserved.
        </div>
        <div class="flex space-x-6 text-sm">
          <a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Footer',
  setup() {
    const router = useRouter()

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

    return {
      scrollToSection
    }
  }
}
</script>
