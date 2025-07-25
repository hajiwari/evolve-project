<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Help & Support</h1>
        <p class="text-gray-600">Find answers to your questions and get the help you need</p>
      </div>

      <!-- Quick Help Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div 
          v-for="helpOption in helpOptions" 
          :key="helpOption.title"
          class="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
          @click="handleHelpClick(helpOption.action)"
        >
          <div class="w-16 h-16 flex items-center justify-center bg-primary rounded-full mx-auto mb-4">
            <i :class="[helpOption.icon, 'text-white', 'text-2xl']"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ helpOption.title }}</h3>
          <p class="text-gray-600 mb-4">{{ helpOption.description }}</p>
          <span class="text-primary hover:underline">{{ helpOption.linkText }}</span>
        </div>
      </div>

      <!-- FAQ Section -->
      <div id="faq" class="bg-white rounded-lg shadow-sm p-8 mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div class="max-w-4xl mx-auto">
          <div class="space-y-4">
            <div 
              v-for="(faq, index) in faqs" 
              :key="index"
              class="border border-gray-200 rounded-lg"
            >
              <button 
                @click="toggleFaq(index)"
                class="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span class="font-semibold text-gray-900">{{ faq.question }}</span>
                <i 
                  :class="[
                    'ri-arrow-down-s-line',
                    'text-gray-400',
                    'transition-transform',
                    openFaqs.includes(index) ? 'rotate-180' : ''
                  ]"
                ></i>
              </button>
              <div 
                v-if="openFaqs.includes(index)"
                class="px-4 pb-4 text-gray-600 border-t border-gray-200"
              >
                <p class="pt-4">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Support -->
      <div id="support" class="bg-white rounded-lg shadow-sm p-8 mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Support</h2>
        <div class="max-w-2xl mx-auto">
          <form @submit.prevent="submitSupportRequest" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input 
                v-model="supportForm.name"
                type="text" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                v-model="supportForm.email"
                type="email" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                v-model="supportForm.category"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Select a category</option>
                <option value="technical">Technical Issue</option>
                <option value="account">Account Question</option>
                <option value="billing">Billing Question</option>
                <option value="feature">Feature Request</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                v-model="supportForm.message"
                rows="5" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                placeholder="Please describe your issue or question..."
              ></textarea>
            </div>
            
            <button 
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Training Resources -->
      <div id="training" class="bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Training Resources</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="resource in trainingResources" 
            :key="resource.title"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center space-x-3 mb-3">
              <i :class="[resource.icon, 'text-primary', 'text-xl']"></i>
              <h3 class="font-semibold text-gray-900">{{ resource.title }}</h3>
            </div>
            <p class="text-gray-600 text-sm mb-3">{{ resource.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">{{ resource.duration }}</span>
              <button class="text-primary hover:underline text-sm">
                {{ resource.type === 'video' ? 'Watch' : 'Read' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Help',
  setup() {
    const openFaqs = ref([])
    const isSubmitting = ref(false)
    
    const supportForm = ref({
      name: '',
      email: '',
      category: '',
      message: ''
    })
    
    const helpOptions = [
      {
        title: 'FAQ',
        description: 'Browse our frequently asked questions for quick answers.',
        icon: 'ri-question-line',
        linkText: 'View FAQ',
        action: 'faq'
      },
      {
        title: 'Live Chat',
        description: 'Chat with our support team in real-time.',
        icon: 'ri-chat-3-line',
        linkText: 'Start Chat',
        action: 'chat'
      },
      {
        title: 'Email Support',
        description: 'Send us a detailed message and we\'ll respond within 24 hours.',
        icon: 'ri-mail-line',
        linkText: 'Send Email',
        action: 'email'
      },
      {
        title: 'Phone Support',
        description: 'Call our support line for immediate assistance.',
        icon: 'ri-phone-line',
        linkText: 'Call Now',
        action: 'phone'
      },
      {
        title: 'Video Tutorials',
        description: 'Watch step-by-step video guides for common tasks.',
        icon: 'ri-video-line',
        linkText: 'Watch Videos',
        action: 'videos'
      },
      {
        title: 'User Guide',
        description: 'Download our comprehensive user manual.',
        icon: 'ri-book-line',
        linkText: 'Download Guide',
        action: 'guide'
      }
    ]
    
    const faqs = [
      {
        question: 'How do I reset my password?',
        answer: 'You can reset your password by clicking the "Forgot Password" link on the login page. Enter your email address and we\'ll send you a reset link.'
      },
      {
        question: 'How do I redeem an access code?',
        answer: 'Go to the homepage and find the "Redeem Access Code" section. Enter your access code (format: UC2H3J4K5L6P or QMRR7A4WNAJXY3ZQRMNQ) and click "Redeem Code".'
      },
      {
        question: 'Can I access my content offline?',
        answer: 'Yes, many of our resources can be downloaded for offline access. Look for the download icon next to eligible content in your library.'
      },
      {
        question: 'How do I add students to my course?',
        answer: 'Students can self-enroll using your course ID, or you can upload a class roster through the "Manage Students" section in your dashboard.'
      },
      {
        question: 'Is there a mobile app?',
        answer: 'Yes, Evolve is available as a mobile app for both iOS and Android. You can download it from the App Store or Google Play Store.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept major credit cards (Visa, MasterCard, American Express), PayPal, and institutional purchase orders.'
      },
      {
        question: 'How do I contact technical support?',
        answer: 'You can reach our technical support team through live chat, email, or phone. We\'re available 24/7 to help with any technical issues.'
      },
      {
        question: 'Can I get a refund?',
        answer: 'Refunds are available within 30 days of purchase for digital content that hasn\'t been accessed. Contact our support team for assistance.'
      }
    ]
    
    const trainingResources = [
      {
        title: 'Getting Started Guide',
        description: 'Learn the basics of using Evolve platform',
        duration: '15 min read',
        type: 'guide',
        icon: 'ri-book-open-line'
      },
      {
        title: 'Creating Your First Course',
        description: 'Step-by-step tutorial for course creation',
        duration: '20 min video',
        type: 'video',
        icon: 'ri-video-line'
      },
      {
        title: 'Student Management',
        description: 'How to add and manage students in your courses',
        duration: '12 min video',
        type: 'video',
        icon: 'ri-group-line'
      },
      {
        title: 'Assessment Tools',
        description: 'Creating and grading assignments and quizzes',
        duration: '25 min video',
        type: 'video',
        icon: 'ri-clipboard-line'
      },
      {
        title: 'Mobile App Tutorial',
        description: 'Using Evolve on mobile devices',
        duration: '10 min video',
        type: 'video',
        icon: 'ri-smartphone-line'
      },
      {
        title: 'Troubleshooting Guide',
        description: 'Common issues and solutions',
        duration: '8 min read',
        type: 'guide',
        icon: 'ri-tools-line'
      }
    ]
    
    const toggleFaq = (index) => {
      const faqIndex = openFaqs.value.indexOf(index)
      if (faqIndex > -1) {
        openFaqs.value.splice(faqIndex, 1)
      } else {
        openFaqs.value.push(index)
      }
    }
    
    const handleHelpClick = (action) => {
      switch (action) {
        case 'faq':
          document.getElementById('faq').scrollIntoView({ behavior: 'smooth' })
          break
        case 'chat':
          alert('Live chat feature coming soon!')
          break
        case 'email':
          document.getElementById('support').scrollIntoView({ behavior: 'smooth' })
          break
        case 'phone':
          alert('Phone support: 1-800-EVOLVE-1')
          break
        case 'videos':
          document.getElementById('training').scrollIntoView({ behavior: 'smooth' })
          break
        case 'guide':
          alert('User guide download will start shortly')
          break
      }
    }
    
    const submitSupportRequest = async () => {
      isSubmitting.value = true
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Your support request has been submitted successfully! We\'ll get back to you within 24 hours.')
      
      // Reset form
      supportForm.value = {
        name: '',
        email: '',
        category: '',
        message: ''
      }
      
      isSubmitting.value = false
    }
    
    return {
      openFaqs,
      isSubmitting,
      supportForm,
      helpOptions,
      faqs,
      trainingResources,
      toggleFaq,
      handleHelpClick,
      submitSupportRequest
    }
  }
}
</script>
