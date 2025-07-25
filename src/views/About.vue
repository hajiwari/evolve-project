<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">About Evolve</h1>
        <p class="text-gray-600">Leading the future of healthcare education through innovative digital solutions</p>
      </div>

      <!-- Mission Section -->
      <div class="bg-white rounded-lg shadow-sm p-8 mb-8">
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
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
            
            <div class="bg-gray-50 rounded-lg p-8">
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
        </div>
      </div>

      <!-- Features -->
      <div class="bg-white rounded-lg shadow-sm p-8 mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Evolve?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="feature in features" 
            :key="feature.title"
            class="text-center group"
          >
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all"
                 :class="feature.bgColor">
              <i :class="[feature.icon, 'text-2xl', feature.iconColor]"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="bg-white rounded-lg shadow-sm p-8 mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="member in teamMembers" 
            :key="member.name"
            class="text-center"
          >
            <img 
              :src="member.image" 
              :alt="member.name"
              class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ member.name }}</h3>
            <p class="text-primary font-medium mb-2">{{ member.role }}</p>
            <p class="text-gray-600 text-sm">{{ member.bio }}</p>
          </div>
        </div>
      </div>

      <!-- Company History -->
      <div class="bg-white rounded-lg shadow-sm p-8 mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
        <div class="max-w-4xl mx-auto">
          <div class="space-y-8">
            <div 
              v-for="milestone in milestones" 
              :key="milestone.year"
              class="flex items-start space-x-4"
            >
              <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                {{ milestone.year }}
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ milestone.title }}</h3>
                <p class="text-gray-600">{{ milestone.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center bg-gradient-to-r from-primary to-accent text-white rounded-lg p-8">
        <h2 class="text-3xl font-bold mb-4">Ready to Transform Your Teaching?</h2>
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
            Contact Us
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'About',
  setup() {
    const features = [
      {
        title: 'Adaptive Learning',
        description: 'Personalized learning paths that adapt to each student\'s pace and learning style for optimal outcomes.',
        bgColor: 'bg-blue-100 group-hover:bg-blue-200',
        iconColor: 'text-blue-600',
        icon: 'ri-brain-line'
      },
      {
        title: 'Real-time Analytics',
        description: 'Comprehensive dashboards and reports to track student progress and identify areas for improvement.',
        bgColor: 'bg-green-100 group-hover:bg-green-200',
        iconColor: 'text-green-600',
        icon: 'ri-bar-chart-line'
      },
      {
        title: 'Mobile-First Design',
        description: 'Access your content anywhere, anytime with our responsive design optimized for all devices.',
        bgColor: 'bg-orange-100 group-hover:bg-orange-200',
        iconColor: 'text-orange-600',
        icon: 'ri-smartphone-line'
      },
      {
        title: 'Secure & Compliant',
        description: 'FERPA compliant with enterprise-grade security to protect student data and privacy.',
        bgColor: 'bg-purple-100 group-hover:bg-purple-200',
        iconColor: 'text-purple-600',
        icon: 'ri-shield-check-line'
      },
      {
        title: 'Collaborative Tools',
        description: 'Foster collaboration with discussion boards, group projects, and peer review capabilities.',
        bgColor: 'bg-red-100 group-hover:bg-red-200',
        iconColor: 'text-red-600',
        icon: 'ri-team-line'
      },
      {
        title: '24/7 Support',
        description: 'Dedicated support team available around the clock to help you succeed with our platform.',
        bgColor: 'bg-yellow-100 group-hover:bg-yellow-200',
        iconColor: 'text-yellow-600',
        icon: 'ri-customer-service-line'
      }
    ]
    
    const teamMembers = [
      {
        name: 'Dr. Sarah Johnson',
        role: 'Chief Academic Officer',
        bio: 'Former Dean of Nursing with 20+ years in healthcare education',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b68c8c61?w=200&h=200&fit=crop&crop=face'
      },
      {
        name: 'Michael Chen',
        role: 'Chief Technology Officer',
        bio: 'Expert in educational technology and digital learning platforms',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
      },
      {
        name: 'Dr. Lisa Rodriguez',
        role: 'Director of Curriculum',
        bio: 'Specialist in curriculum development and instructional design',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face'
      }
    ]
    
    const milestones = [
      {
        year: '2010',
        title: 'Evolve Founded',
        description: 'Started with a vision to transform healthcare education through digital innovation.'
      },
      {
        year: '2015',
        title: 'First Million Users',
        description: 'Reached our first million active users across nursing and medical programs.'
      },
      {
        year: '2018',
        title: 'Mobile Platform Launch',
        description: 'Launched our mobile-first platform, making learning accessible anywhere.'
      },
      {
        year: '2020',
        title: 'AI Integration',
        description: 'Introduced adaptive learning algorithms powered by artificial intelligence.'
      },
      {
        year: '2023',
        title: 'Global Expansion',
        description: 'Expanded to serve healthcare institutions in over 50 countries worldwide.'
      }
    ]
    
    return {
      features,
      teamMembers,
      milestones
    }
  }
}
</script>
