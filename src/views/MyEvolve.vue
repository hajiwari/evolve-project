<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">My Evolve Dashboard</h1>
        <p class="text-gray-600">Manage your courses, resources, and learning progress</p>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-3xl font-bold text-primary mb-2">{{ userStats.activeCourses }}</div>
          <div class="text-gray-600">Active Courses</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-3xl font-bold text-accent mb-2">{{ userStats.completedAssignments }}</div>
          <div class="text-gray-600">Completed Assignments</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-3xl font-bold text-success mb-2">{{ userStats.overallProgress }}%</div>
          <div class="text-gray-600">Overall Progress</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-3xl font-bold text-warning mb-2">{{ userStats.upcomingDeadlines }}</div>
          <div class="text-gray-600">Upcoming Deadlines</div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Courses and Resources -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Active Courses -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Active Courses</h2>
            <div class="space-y-4">
              <div 
                v-for="course in activeCourses" 
                :key="course.id"
                class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                @click="viewCourse(course)"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 mb-2">{{ course.title }}</h3>
                    <p class="text-sm text-gray-600 mb-2">{{ course.instructor }}</p>
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{{ course.credits }} Credits</span>
                      <span>{{ course.studentsEnrolled }} Students</span>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-medium text-primary mb-1">{{ course.progress }}% Complete</div>
                    <div class="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        class="h-full bg-primary transition-all duration-300"
                        :style="{ width: `${course.progress}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Resources -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Recent Resources</h2>
            <div class="space-y-3">
              <div 
                v-for="resource in recentResources" 
                :key="resource.id"
                class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                @click="openResource(resource)"
              >
                <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <i :class="[resource.icon, 'text-gray-600']"></i>
                </div>
                <div class="flex-1">
                  <div class="font-medium text-gray-900">{{ resource.title }}</div>
                  <div class="text-sm text-gray-500">{{ resource.type }} • {{ resource.course }}</div>
                </div>
                <div class="text-sm text-gray-400">{{ resource.lastAccessed }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Notifications and Calendar -->
        <div class="space-y-6">
          <!-- Notifications -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Notifications</h2>
            <div class="space-y-3">
              <div 
                v-for="notification in notifications" 
                :key="notification.id"
                class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50"
              >
                <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div class="flex-1">
                  <div class="text-sm font-medium text-gray-900">{{ notification.title }}</div>
                  <div class="text-sm text-gray-600">{{ notification.message }}</div>
                  <div class="text-xs text-gray-400 mt-1">{{ notification.time }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Upcoming Deadlines -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
            <div class="space-y-3">
              <div 
                v-for="deadline in upcomingDeadlines" 
                :key="deadline.id"
                class="flex items-start space-x-3 p-3 rounded-lg border-l-4"
                :class="deadline.urgent ? 'border-error bg-red-50' : 'border-warning bg-yellow-50'"
              > 
                <div class="flex-1">
                  <div class="text-sm font-medium text-gray-900">{{ deadline.title }}</div>
                  <div class="text-sm text-gray-600">{{ deadline.course }}</div>
                  <div class="text-xs text-gray-500 mt-1">{{ deadline.dueDate }}</div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-medium" :class="deadline.urgent ? 'text-error' : 'text-warning'">
                    {{ deadline.daysLeft }} days
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div class="space-y-2">
              <button 
                @click="createNewCourse"
                class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center space-x-3">
                  <i class="ri-add-circle-line text-primary"></i>
                  <span>Create New Course</span>
                </div>
              </button>
              <button 
                @click="uploadContent"
                class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center space-x-3">
                  <i class="ri-upload-2-line text-primary"></i>
                  <span>Upload Content</span>
                </div>
              </button>
              <button 
                @click="viewReports"
                class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center space-x-3">
                  <i class="ri-bar-chart-line text-primary"></i>
                  <span>View Reports</span>
                </div>
              </button>
              <button 
                @click="manageStudents"
                class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center space-x-3">
                  <i class="ri-group-line text-primary"></i>
                  <span>Manage Students</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'MyEvolve',
  setup() {
    const userStats = ref({
      activeCourses: 4,
      completedAssignments: 28,
      overallProgress: 72,
      upcomingDeadlines: 3
    })
    
    const activeCourses = ref([
      {
        id: 1,
        title: 'Advanced Nursing Fundamentals',
        instructor: 'Dr. Sarah Johnson',
        credits: 3,
        studentsEnrolled: 45,
        progress: 85
      },
      {
        id: 2,
        title: 'Medical-Surgical Nursing',
        instructor: 'Prof. Michael Chen',
        credits: 4,
        studentsEnrolled: 38,
        progress: 60
      },
      {
        id: 3,
        title: 'Pharmacology Basics',
        instructor: 'Dr. Lisa Rodriguez',
        credits: 2,
        studentsEnrolled: 52,
        progress: 90
      },
      {
        id: 4,
        title: 'Clinical Practice Integration',
        instructor: 'Dr. David Wilson',
        credits: 5,
        studentsEnrolled: 29,
        progress: 45
      }
    ])
    
    const recentResources = ref([
      {
        id: 1,
        title: 'Chapter 12: Cardiovascular System',
        type: 'eBook',
        course: 'Advanced Nursing',
        icon: 'ri-book-line',
        lastAccessed: '2 hours ago'
      },
      {
        id: 2,
        title: 'Medication Administration Video',
        type: 'Video',
        course: 'Pharmacology',
        icon: 'ri-video-line',
        lastAccessed: '1 day ago'
      },
      {
        id: 3,
        title: 'Case Study: Diabetes Management',
        type: 'Assignment',
        course: 'Clinical Practice',
        icon: 'ri-file-text-line',
        lastAccessed: '3 days ago'
      },
      {
        id: 4,
        title: 'Interactive Anatomy Model',
        type: 'Simulation',
        course: 'Medical-Surgical',
        icon: 'ri-heart-pulse-line',
        lastAccessed: '1 week ago'
      }
    ])
    
    const notifications = ref([
      {
        id: 1,
        title: 'Assignment Graded',
        message: 'Your Case Study submission has been graded.',
        time: '30 minutes ago'
      },
      {
        id: 2,
        title: 'New Course Material',
        message: 'Chapter 13 is now available in Advanced Nursing.',
        time: '2 hours ago'
      },
      {
        id: 3,
        title: 'Upcoming Deadline',
        message: 'Pharmacology quiz due tomorrow.',
        time: '1 day ago'
      },
      {
        id: 4,
        title: 'Course Announcement',
        message: 'Office hours scheduled for Friday 2-4 PM.',
        time: '2 days ago'
      }
    ])
    
    const upcomingDeadlines = ref([
      {
        id: 1,
        title: 'Pharmacology Quiz',
        course: 'Pharmacology Basics',
        dueDate: 'Tomorrow, 11:59 PM',
        daysLeft: 1,
        urgent: true
      },
      {
        id: 2,
        title: 'Clinical Reflection Paper',
        course: 'Clinical Practice',
        dueDate: 'Friday, 11:59 PM',
        daysLeft: 3,
        urgent: false
      },
      {
        id: 3,
        title: 'Group Project Presentation',
        course: 'Advanced Nursing',
        dueDate: 'Next Monday, 2:00 PM',
        daysLeft: 5,
        urgent: false
      }
    ])
    
    const viewCourse = (course) => {
      console.log('Viewing course:', course)
      // Navigate to course details
    }
    
    const openResource = (resource) => {
      console.log('Opening resource:', resource)
      // Open resource viewer
    }
    
    const createNewCourse = () => {
      console.log('Creating new course...')
      // Open course creation modal
    }
    
    const uploadContent = () => {
      console.log('Uploading content...')
      // Open file upload modal
    }
    
    const viewReports = () => {
      console.log('Viewing reports...')
      // Navigate to reports page
    }
    
    const manageStudents = () => {
      console.log('Managing students...')
      // Navigate to student management
    }
    
    return {
      userStats,
      activeCourses,
      recentResources,
      notifications,
      upcomingDeadlines,
      viewCourse,
      openResource,
      createNewCourse,
      uploadContent,
      viewReports,
      manageStudents
    }
  }
}
</script>
