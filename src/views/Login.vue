<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="flex justify-center">
          <img src="https://evolve.elsevier.com/cs/images/EvolveLogo.svg" alt="Evolve" class="h-12">
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link to="/signup" class="font-medium text-primary hover:text-primary/80">
            create a new account
          </router-link>
        </p>
        
        <!-- Email verification success message -->
        <div v-if="showEmailVerificationMessage" class="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <p class="text-sm">
            <i class="ri-check-circle-line mr-1"></i>
            Email verified successfully! You can now sign in to your account.
          </p>
        </div>
        
        <!-- Email verification required message -->
        <div v-if="unverifiedUser" class="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          <p class="text-sm mb-2">
            <i class="ri-mail-line mr-1"></i>
            Please verify your email address before signing in.
          </p>
          <button 
            @click="resendVerification"
            class="text-sm text-primary hover:text-primary/80 font-medium"
          >
            Resend verification email
          </button>
        </div>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input 
              id="email"
              v-model="loginForm.email"
              name="email" 
              type="email" 
              autocomplete="email" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" 
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input 
              id="password"
              v-model="loginForm.password"
              name="password" 
              type="password" 
              autocomplete="current-password" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" 
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input 
              id="remember-me"
              v-model="loginForm.remember"
              name="remember-me" 
              type="checkbox" 
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-primary hover:text-primary/80">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button 
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <i v-if="!isLoading" class="ri-lock-line text-primary/60 group-hover:text-primary/80"></i>
              <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </span>
            {{ isLoading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { signIn, resendEmailVerification } from '../utils/firebaseAuth'
import { getAuth } from 'firebase/auth'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const isLoading = ref(false)
    const showEmailVerificationMessage = ref(false)
    const unverifiedUser = ref(null)
    
    const loginForm = ref({
      email: '',
      password: '',
      remember: false
    })
    
    onMounted(() => {
      // Check if user came from email verification
      if (route.query.verified === 'true') {
        showEmailVerificationMessage.value = true
        setTimeout(() => {
          showEmailVerificationMessage.value = false
        }, 5000)
      }
      
      // Check for verification error
      if (route.query.verificationError) {
        alert('Email verification failed: ' + decodeURIComponent(route.query.verificationError))
      }
    })
    
    const handleLogin = async () => {
      if (!loginForm.value.email || !loginForm.value.password) {
        alert('Please fill in all fields')
        return
      }
      isLoading.value = true
      try {
        // Firebase authentication
        const userCredential = await signIn(loginForm.value.email, loginForm.value.password)
        
        // Check if email is verified
        if (!userCredential.user.emailVerified) {
          unverifiedUser.value = userCredential.user
          alert('Please verify your email address before signing in. Check your inbox for the verification link.')
          // Sign out the user since they haven't verified their email
          await getAuth().signOut()
          return
        }
        
        alert('Login successful!')
        router.push('/my-evolve')
      } catch (error) {
        console.error('Login error:', error)
        if (error.code === 'auth/user-not-found') {
          alert('No account found with this email address. Please sign up first.')
        } else if (error.code === 'auth/wrong-password') {
          alert('Incorrect password. Please try again.')
        } else if (error.code === 'auth/invalid-email') {
          alert('Invalid email address format.')
        } else if (error.code === 'auth/user-disabled') {
          alert('This account has been disabled.')
        } else {
          alert('Login failed: ' + (error.message || 'Please try again.'))
        }
      } finally {
        isLoading.value = false
      }
    }
    
    const resendVerification = async () => {
      if (unverifiedUser.value) {
        try {
          await resendEmailVerification(unverifiedUser.value)
          alert('Verification email sent! Please check your inbox.')
        } catch (error) {
          console.error('Resend verification error:', error)
          alert('Failed to send verification email: ' + (error.message || 'Please try again.'))
        }
      }
    }
    
    return {
      loginForm,
      isLoading,
      showEmailVerificationMessage,
      unverifiedUser,
      handleLogin,
      resendVerification
    }
  }
}
</script>
