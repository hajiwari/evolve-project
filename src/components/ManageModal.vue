<template>
  <Teleport to="body">
    <transition name="modal">
      <div 
        v-if="show" 
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        @click.self="$emit('update:show', false)"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">Manage Students</h2>
            <button 
              @click="$emit('update:show', false)"
              class="text-gray-500 hover:text-gray-700"
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
          
          <div class="mb-6">
            <p class="text-gray-600 mb-4">
              Evolve makes class rosters easy by allowing students to self-enroll with your course ID (looks similar to this: 1479_jdoes73_0001).
            </p>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Course ID</label>
                <div class="flex">
                  <input 
                    v-model="courseId"
                    type="text" 
                    placeholder="Enter or generate course ID" 
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                  />
                  <button 
                    @click="generateCourseId"
                    class="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r hover:bg-gray-200"
                  >
                    Generate
                  </button>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Class Name</label>
                <input 
                  v-model="className"
                  type="text" 
                  placeholder="Enter class name" 
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                />
              </div>
            </div>
          </div>
          
          <div class="space-y-3">
            <button 
              @click="downloadInstructions"
              class="w-full bg-secondary text-primary px-4 py-2 rounded hover:bg-blue-100 transition-colors"
            >
              Download Instructions
            </button>
            <button 
              @click="submitRoster"
              class="w-full border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
            >
              Submit Class Roster
            </button>
          </div>
          
          <div class="mt-6 pt-4 border-t">
            <div class="flex space-x-3">
              <button 
                @click="$emit('update:show', false)"
                class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                @click="saveSettings"
                class="flex-1 bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ManageModal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:show'],
  setup(props, { emit }) {
    const courseId = ref('')
    const className = ref('')
    
    const generateCourseId = () => {
      // Generate a random course ID
      const randomId = Math.floor(Math.random() * 10000)
      const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
      courseId.value = `${randomId}_instructor_${randomSuffix}`
    }
    
    const downloadInstructions = () => {
      console.log('Downloading instructions...')
      // Handle download instructions logic
      alert('Instructions downloaded successfully!')
    }
    
    const submitRoster = () => {
      console.log('Submitting class roster...')
      // Handle submit roster logic
      alert('Class roster submitted successfully!')
    }
    
    const saveSettings = () => {
      if (courseId.value.trim() && className.value.trim()) {
        console.log('Saving settings:', { courseId: courseId.value, className: className.value })
        // Handle save settings logic
        alert('Settings saved successfully!')
        emit('update:show', false)
      } else {
        alert('Please fill in all fields')
      }
    }
    
    return {
      courseId,
      className,
      generateCourseId,
      downloadInstructions,
      submitRoster,
      saveSettings
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
