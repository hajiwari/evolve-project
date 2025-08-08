<template>
  <div class="min-h-screen w-screen bg-gray-50 flex items-center justify-center py-0 px-0 relative overflow-hidden">
    <!-- Fading Background Images -->
    <transition name="fade">
      <div v-if="showFacultyBg" class="absolute left-0 top-0 h-full w-1/2 z-0 pointer-events-none flex items-center">
        <img src="https://www.workingnurse.com/wp-content/uploads/2023/01/WN_Educator.jpg" alt="Faculty" class="absolute left-0 top-0 h-full w-full object-cover object-left opacity-80" />
        <div class="absolute left-0 top-0 h-full w-full pointer-events-none" style="background: linear-gradient(to left, white 0%, transparent 100%);"></div>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="showStudentBg" class="absolute right-0 top-0 h-full w-1/2 z-0 pointer-events-none flex items-center">
        <img src="https://communications.catholic.edu/_media/2019-news-photos/nursing_success_1200.jpg" alt="Student" class="absolute right-0 top-0 h-full w-full object-cover object-right opacity-80" />
        <div class="absolute right-0 top-0 h-full w-full pointer-events-none" style="background: linear-gradient(to right, white 0%, transparent 100%);"></div>
      </div>
    </transition>
    <div class="max-w-lg w-full space-y-6 relative z-10 mx-auto flex flex-col justify-center items-center" style="min-height: 70vh;">
      <div class="mt-12"> <!-- Moved down -->
        <div class="flex flex-col items-center justify-center">
          <img src="https://evolve.elsevier.com/cs/images/EvolveLogo.svg" alt="Evolve" class="h-12 mb-2">
          <h2 class="text-3xl font-extrabold text-gray-900">Create an Account</h2>
          <p class="mt-2 text-sm text-gray-600">New to Evolve? Create an account to join.</p>
          <p v-if="currentStep > 0" class="mt-2 text-sm text-gray-600">
            Or
            <router-link to="/login" class="font-medium text-primary hover:text-primary/80">
              sign in to existing account
            </router-link>
          </p>
        </div>
      </div>

      <!-- Account Type Selection -->
      <div v-if="currentStep === 0" class="bg-white py-8 px-6 shadow rounded-lg">
        <div class="text-center mb-8">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">What describes you?</h3>
        </div>
        <div class="space-y-4">
          <button 
            @mouseenter="showStudentBg = true"
            @mouseleave="showStudentBg = false"
            @click="selectRole('student')"
            :class="[
              'w-full p-4 border-2 rounded-lg text-center transition-colors duration-200',
              signupForm.role === 'student' ? 'border-primary bg-primary/5' : 'border-gray-300',
              'hover:border-primary hover:bg-primary/10'
            ]"
          >
            <div class="font-medium text-gray-900">Student</div>
          </button>
          <button 
            @mouseenter="showFacultyBg = true"
            @mouseleave="showFacultyBg = false"
            @click="selectRole('faculty')"
            :class="[
              'w-full p-4 border-2 rounded-lg text-center transition-colors duration-200',
              signupForm.role === 'faculty' ? 'border-primary bg-primary/5' : 'border-gray-300',
              'hover:border-primary hover:bg-primary/10'
            ]"
          >
            <div class="font-medium text-gray-900">Faculty</div>
          </button>
        </div>
      </div>

      <!-- Multi-step Form -->
      <div v-if="currentStep > 0" class="bg-white py-6 px-6 shadow rounded-lg w-full">
        <!-- Progress Bar -->
        <div class="mb-6">
          <div class="flex items-center justify-center mb-2 w-full">
            <div class="flex w-full max-w-md mx-auto items-center justify-between">
              <template v-for="(step, index) in steps" :key="index">
                <div class="flex flex-col items-center w-1/3 relative">
                  <transition name="fade-scale" mode="out-in">
                    <div 
                      :key="currentStep === index + 1 ? 'active' : 'inactive'"
                      :class="[
                        'w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all duration-500 ease-in-out',
                        currentStep > index + 1 ? 'bg-orange-500 text-white border-orange-500' : 
                        currentStep === index + 1 ? 'bg-orange-500 text-white border-orange-500 scale-110 shadow-lg' : 'bg-white text-gray-500 border-gray-300'
                      ]"
                    >
                      <i 
                        v-if="currentStep > index + 1" 
                        class="ri-check-line text-white text-xl"
                      ></i>
                      <span v-else>{{ index + 1 }}</span>
                    </div>
                  </transition>
                  <span class="mt-2 text-xs font-medium" :class="currentStep >= index + 1 ? 'text-orange-600' : 'text-gray-400'">
                    {{ step.title }}
                  </span>
                </div>
                <div 
                  v-if="index < steps.length - 1" 
                  class="flex-1 flex items-center justify-center"
                >
                  <div 
                    :class="[
                      'h-2 w-full rounded transition-all duration-500 ease-in-out',
                      currentStep > index + 1 ? 'bg-orange-500' : 'bg-gray-200'
                    ]"
                    style="min-width: 40px;"
                  ></div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <transition name="fade-section" mode="out-in">
          <div :key="currentStep">
            <form v-if="currentStep === 1" class="space-y-4" @submit.prevent="nextStep">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Tell us about you</h3>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700">First name</label>
                    <input 
                      id="firstName"
                      v-model="signupForm.firstName"
                      type="text" 
                      required 
                      class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700">Last name</label>
                    <input 
                      id="lastName"
                      v-model="signupForm.lastName"
                      type="text" 
                      required 
                      class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="Last name"
                    />
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                    <input 
                      id="email"
                      v-model="signupForm.email"
                      type="email" 
                      autocomplete="email"
                      required 
                      class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="Email address"
                      @input="validateEmail"
                    />
                    <div v-if="emailWarning" class="text-xs text-orange-500 mt-1">{{ emailWarning }}</div>
                  </div>
                  <div>
                    <label for="confirmEmail" class="block text-sm font-medium text-gray-700">Confirm email address</label>
                    <input 
                      id="confirmEmail"
                      v-model="signupForm.confirmEmail"
                      type="email" 
                      autocomplete="email"
                      required 
                      class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="Confirm email address"
                      @input="validateEmail"
                    />
                    <div v-if="emailMatchWarning" class="text-xs text-orange-500 mt-1">{{ emailMatchWarning }}</div>
                  </div>
                  <div class="col-span-2">
                    <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <select 
                        v-model="signupForm.countryCode"
                        class="appearance-none block px-2 py-1 border border-gray-300 text-gray-900 rounded-l-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-gray-50"
                      >
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+33">🇫🇷 +33</option>
                        <option value="+49">🇩🇪 +49</option>
                      </select>
                      <input 
                        id="phone"
                        v-model="signupForm.phone"
                        type="tel" 
                        class="block w-full px-2 py-1 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        placeholder="Phone number"
                        @input="validatePhone"
                      />
                    </div>
                    <div v-if="phoneWarning" class="text-xs text-orange-500 mt-1">{{ phoneWarning }}</div>
                  </div>
                  <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                      id="password"
                      v-model="signupForm.password"
                      type="password" 
                      autocomplete="new-password"
                      required 
                      class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="Password"
                      @focus="showPasswordReq = true"
                      @blur="showPasswordReq = false"
                      @input="validatePassword"
                    />
                    <transition name="fade-slide">
                      <div v-if="showPasswordReq || signupForm.password" class="text-xs mt-1">
                        <div :class="{'text-orange-500': !passwordValid.capital, 'text-green-600': passwordValid.capital}">• 1 capital letter</div>
                        <div :class="{'text-orange-500': !passwordValid.length, 'text-green-600': passwordValid.length}">• 8 characters</div>
                        <div :class="{'text-orange-500': !passwordValid.number, 'text-green-600': passwordValid.number}">• 1 number</div>
                      </div>
                    </transition>
                  </div>
                  <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm password</label>
                    <input 
                      id="confirmPassword"
                      v-model="signupForm.confirmPassword"
                      type="password" 
                      autocomplete="new-password"
                      required 
                      class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="Confirm password"
                      @input="validatePassword"
                    />
                    <div v-if="passwordMatchWarning" class="text-xs text-orange-500 mt-1">{{ passwordMatchWarning }}</div>
                  </div>
                </div>
              </div>
            </form>
            <form v-else-if="currentStep === 2" class="space-y-4" @submit.prevent="nextStep">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Tell us about your institution</h3>
                
                <div class="space-y-4">
                  <div>
                    <label for="institutionCountry" class="block text-sm font-medium text-gray-700">Institution country</label>
                    <select 
                      id="institutionCountry"
                      v-model="signupForm.institutionCountry"
                      class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    >
                      <option value="">Select institution country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                    </select>
                  </div>
                  
                  <div>
                    <label for="institutionState" class="block text-sm font-medium text-gray-700">Institution state</label>
                    <select 
                      id="institutionState"
                      v-model="signupForm.institutionState"
                      class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    >
                      <option value="">Select institution state</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                      <option value="IL">Illinois</option>
                    </select>
                  </div>
                  
                  <div>
                    <label for="institutionName" class="block text-sm font-medium text-gray-700">Institution name</label>
                    <input 
                      id="institutionName"
                      v-model="signupForm.institutionName"
                      type="text" 
                      class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                      placeholder="Your institution name"
                    />
                  </div>
                  
                  <div>
                    <label for="programType" class="block text-sm font-medium text-gray-700">Program type</label>
                    <select 
                      id="programType"
                      v-model="signupForm.programType"
                      class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    >
                      <option value="">Select program type</option>
                      <option value="nursing">Nursing</option>
                      <option value="medical">Medical</option>
                      <option value="dental">Dental</option>
                      <option value="pharmacy">Pharmacy</option>
                      <option value="allied-health">Allied Health</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
            <form v-else-if="currentStep === 3" class="space-y-4" @submit.prevent="handleSignup">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Verification</h3>
                
                <div class="text-center">
                  <div v-if="!emailVerificationSent" class="mb-6">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <div class="text-sm text-gray-600">
                      Creating your account and sending verification email...
                    </div>
                  </div>
                  
                  <div v-else class="mb-6">
                    <div class="text-sm text-gray-600 mb-4">
                      A verification email has been sent to:
                    </div>
                    <div class="bg-gray-100 p-3 rounded-md text-sm font-medium text-gray-900 mb-4">
                      {{ signupForm.email }}
                    </div>
                    
                    <!-- Development Helper - Remove in production -->
                    <div v-if="generatedCode" class="bg-yellow-50 border border-yellow-200 p-3 rounded-md text-sm mb-4">
                      <div class="font-medium text-yellow-800 mb-1">🔧 Development Mode</div>
                      <div class="text-yellow-700">Your verification code is: <strong>{{ generatedCode }}</strong></div>
                      <div class="text-yellow-600 text-xs mt-1">This helper will be removed in production</div>
                    </div>
                    
                    <div class="text-sm text-gray-600 mb-6">
                      Choose one of the following verification methods:
                    </div>
                    
                    <!-- Method 1: 6-digit code -->
                    <div class="mb-6 p-4 border border-gray-200 rounded-lg">
                      <h4 class="text-sm font-medium text-gray-900 mb-3">Method 1: Enter 6-digit code</h4>
                      <VerificationCodeInput 
                        v-model="verificationCode"
                        label="Enter the 6-digit code from your email"
                      />
                      <button 
                        v-if="verificationCode.length === 6"
                        @click="verifyCode"
                        :disabled="isVerifyingCode"
                        class="mt-3 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                      >
                        <span v-if="!isVerifyingCode">Verify Code</span>
                        <span v-else class="flex items-center">
                          <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Verifying...
                        </span>
                      </button>
                    </div>
                    
                    <!-- Divider -->
                    <div class="relative mb-6">
                      <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                      </div>
                      <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">OR</span>
                      </div>
                    </div>
                    
                    <!-- Method 2: Email link -->
                    <div class="mb-6 p-4 border border-gray-200 rounded-lg">
                      <h4 class="text-sm font-medium text-gray-900 mb-3">Method 2: Use email verification link</h4>
                      <div class="text-sm text-gray-600 mb-3">
                        Click the verification link in your email, then return here to complete signup.
                      </div>
                      <button 
                        type="button"
                        @click="checkEmailVerification"
                        class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        I've clicked the verification link
                      </button>
                    </div>
                    
                    <button 
                      type="button"
                      @click="showEmailChange = true"
                      class="text-primary hover:text-primary/80 text-sm font-medium mb-4"
                    >
                      Change Email
                    </button>
                  </div>
                  
                  <div v-if="showEmailChange" class="mb-6">
                    <input 
                      v-model="newEmail"
                      type="email" 
                      placeholder="Enter new email address"
                      class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm mb-3"
                    />
                    <div class="space-x-2">
                      <button 
                        type="button"
                        @click="updateEmail"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Update Email
                      </button>
                      <button 
                        type="button"
                        @click="showEmailChange = false"
                        class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  
                  <div class="space-y-4 text-left">
                    <div class="flex items-start">
                      <input 
                        id="marketing-consent"
                        v-model="signupForm.marketingConsent"
                        type="checkbox" 
                        class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                      />
                      <label for="marketing-consent" class="ml-2 block text-sm text-gray-900">
                        I would like to receive marketing updates and offers from Elsevier about relevant health products, services and events.
                      </label>
                    </div>
                    
                    <div class="flex items-start">
                      <input 
                        id="agree-terms"
                        v-model="signupForm.agreeTerms"
                        type="checkbox" 
                        class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                        required
                      />
                      <label for="agree-terms" class="ml-2 block text-sm text-gray-900">
                        I agree with the 
                        <a href="#" class="text-primary hover:text-primary/80">Terms and Services</a> and 
                        <a href="#" class="text-primary hover:text-primary/80">Privacy Policy</a>
                      </label>
                    </div>
                  </div>
                  
                  <div v-if="emailVerificationSent" class="mt-6 text-center">
                    <button 
                      type="button"
                      @click="resendVerification"
                      class="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Didn't receive the email? Resend verification
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </transition>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8">
          <button 
            v-if="currentStep > 1"
            @click="previousStep"
            type="button"
            class="group relative flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <i class="ri-arrow-left-line text-gray-400 group-hover:text-gray-500"></i>
            </span>
            Previous
          </button>
          
          <div v-else></div>
          
          <button 
            v-if="currentStep < 3"
            @click="nextStep"
            type="button"
            :disabled="!canProceed"
            class="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <span class="absolute right-0 inset-y-0 flex items-center pr-3">
              <i class="ri-arrow-right-line text-primary/60 group-hover:text-primary/80"></i>
            </span>
          </button>
          
          <button 
            v-if="currentStep === 3"
            @click="handleSignup"
            type="button"
            :disabled="!canSubmit || isLoading"
            class="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <i v-if="!isLoading" class="ri-user-add-line text-primary/60 group-hover:text-primary/80"></i>
              <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </span>
            {{ isLoading ? 'Creating account...' : emailVerificationSent ? 'Go to Login' : 'Create Account' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { signUp, resendEmailVerification, verifyCodeManually, checkUserExists } from '../utils/firebaseAuth'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import VerificationCodeInput from '../components/VerificationCodeInput.vue'

export default {
  name: 'Signup',
  components: {
    VerificationCodeInput
  },
  setup() {
    const router = useRouter()
    const isLoading = ref(false)
    const currentStep = ref(0)
    const emailVerificationSent = ref(false)
    const showEmailChange = ref(false)
    const newEmail = ref('')
    const currentUser = ref(null)
    const verificationCode = ref('')
    const generatedCode = ref('')
    const isVerifyingCode = ref(false)
    
    // Fading background state
    const showStudentBg = ref(false)
    const showFacultyBg = ref(false)
    const steps = ref([
      { title: 'Personal Details', id: 1 },
      { title: 'Institution', id: 2 },
      { title: 'Verification', id: 3 }
    ])
    const signupForm = ref({
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      phone: '',
      countryCode: '+1',
      role: '',
      password: '',
      confirmPassword: '',
      institutionCountry: '',
      institutionState: '',
      institutionName: '',
      programType: '',
      marketingConsent: false,
      agreeTerms: false
    })
    
    // Real-time validation states
    const passwordValid = ref({
      capital: false,
      length: false,
      number: false
    })
    const passwordMatchWarning = ref('')
    const emailWarning = ref('')
    const emailMatchWarning = ref('')
    const phoneWarning = ref('')
    const showPasswordReq = ref(false)

    // Listen for auth state changes
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      currentUser.value = user
    })

    function validatePassword() {
      const pwd = signupForm.value.password
      passwordValid.value.capital = /[A-Z]/.test(pwd)
      passwordValid.value.length = pwd.length >= 8
      passwordValid.value.number = /[0-9]/.test(pwd)
      passwordMatchWarning.value = signupForm.value.password !== signupForm.value.confirmPassword && signupForm.value.confirmPassword ? 'Passwords do not match' : ''
    }
    
    function validateEmail() {
      const email = signupForm.value.email
      const confirmEmail = signupForm.value.confirmEmail
      // Simple email regex
      emailWarning.value = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? '' : (email ? 'Invalid email address' : '')
      emailMatchWarning.value = email !== confirmEmail && confirmEmail ? 'Emails do not match' : ''
    }

    function validatePhone() {
      const phone = signupForm.value.phone
      // Basic phone validation
      if (phone && phone.length < 10) {
        phoneWarning.value = 'Phone number must be at least 10 digits'
      } else {
        phoneWarning.value = ''
      }
    }

    const canProceed = computed(() => {
      if (currentStep.value === 1) {
        return signupForm.value.firstName && 
               signupForm.value.lastName && 
               signupForm.value.email && 
               signupForm.value.confirmEmail &&
               signupForm.value.phone &&
               signupForm.value.password && 
               signupForm.value.confirmPassword &&
               signupForm.value.email === signupForm.value.confirmEmail &&
               /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(signupForm.value.email) &&
               signupForm.value.password === signupForm.value.confirmPassword &&
               /[A-Z]/.test(signupForm.value.password) &&
               signupForm.value.password.length >= 8 &&
               /[0-9]/.test(signupForm.value.password) &&
               !emailWarning.value &&
               !phoneWarning.value
      }
      if (currentStep.value === 2) {
        return signupForm.value.institutionCountry && 
               signupForm.value.institutionName
      }
      return true
    })
    
    const canSubmit = computed(() => {
      return signupForm.value.agreeTerms && emailVerificationSent.value
    })
    
    const selectRole = (role) => {
      signupForm.value.role = role
      currentStep.value = 1
      // Show background for selected role
      if (role === 'student') {
        showStudentBg.value = true
        showFacultyBg.value = false
      } else if (role === 'faculty') {
        showFacultyBg.value = true
        showStudentBg.value = false
      }
    }
    
    // Hide background when leaving step 0
    const nextStep = async () => {
      if (currentStep.value === 1) {
        // Perform basic validation checks before proceeding
        if (!canProceed.value) {
          if (signupForm.value.email !== signupForm.value.confirmEmail) {
            alert('Email addresses do not match')
            return
          }
          if (signupForm.value.password !== signupForm.value.confirmPassword) {
            alert('Passwords do not match')
            return
          }
          if (signupForm.value.password.length < 8) {
            alert('Password must be at least 8 characters long')
            return
          }
          if (emailWarning.value) {
            alert('Please fix the email error before proceeding')
            return
          }
          if (phoneWarning.value) {
            alert('Please fix the phone number error before proceeding')
            return
          }
          alert('Please fill in all required fields')
          return
        }
      }

      if (currentStep.value < 3) {
        currentStep.value++
        // Hide background images after step 0
        if (currentStep.value > 0) {
          showStudentBg.value = false
          showFacultyBg.value = false
        }
        // Create account and send verification email when reaching step 3
        if (currentStep.value === 3) {
          createAccountAndSendVerification()
        }
      }
    }
    
    const previousStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--
      }
    }
    
    const createAccountAndSendVerification = async () => {
      try {
        isLoading.value = true
        
        // Prepare user data for Firestore
        const userData = {
          phone: signupForm.value.phone,
          countryCode: signupForm.value.countryCode,
          role: signupForm.value.role,
          institutionCountry: signupForm.value.institutionCountry,
          institutionState: signupForm.value.institutionState,
          institutionName: signupForm.value.institutionName,
          programType: signupForm.value.programType,
          marketingConsent: signupForm.value.marketingConsent
        }
        
        // Create Firebase account and send verification email
        const result = await signUp(
          signupForm.value.email, 
          signupForm.value.password,
          signupForm.value.firstName,
          signupForm.value.lastName,
          userData
        )
        
        // Store the generated verification code
        generatedCode.value = result.verificationCode
        
        emailVerificationSent.value = true
        console.log('Account created and verification email sent to:', signupForm.value.email)
        
      } catch (error) {
        console.error('Account creation error:', error)
        if (error.code === 'auth/email-already-in-use') {
          emailWarning.value = 'This email address is already registered'
          currentStep.value = 1 // Go back to step 1
        } else if (error.message.includes("Phone number is already registered")) {
          phoneWarning.value = 'This phone number is already registered'
          currentStep.value = 1 // Go back to step 1
        } else {
          alert('Failed to create account: ' + (error.message || 'Please try again.'))
          currentStep.value = 2 // Go back to previous step
        }
      } finally {
        isLoading.value = false
      }
    }
    
    const updateEmail = async () => {
      if (newEmail.value && newEmail.value !== signupForm.value.email) {
        signupForm.value.email = newEmail.value
        signupForm.value.confirmEmail = newEmail.value
        showEmailChange.value = false
        newEmail.value = ''
        
        // Need to recreate account with new email
        emailVerificationSent.value = false
        await createAccountAndSendVerification()
      }
    }
    
    const checkEmailVerification = async () => {
      if (currentUser.value) {
        await currentUser.value.reload()
        if (currentUser.value.emailVerified) {
          alert('Email verified successfully! Welcome to Evolve.')
          router.push('/my-evolve')
        } else {
          alert('Email not verified yet. Please check your inbox and click the verification link.')
        }
      }
    }
    
    const verifyCode = async () => {
      if (verificationCode.value.length !== 6) {
        alert('Please enter a complete 6-digit code')
        return
      }
      
      try {
        isVerifyingCode.value = true
        
        if (currentUser.value) {
          await verifyCodeManually(currentUser.value.uid, verificationCode.value)
          alert('Email verified successfully! Welcome to Evolve.')
          router.push('/my-evolve')
        } else {
          alert('Please wait for account creation to complete')
        }
      } catch (error) {
        console.error('Code verification error:', error)
        alert('Invalid or expired verification code. Please try again.')
      } finally {
        isVerifyingCode.value = false
      }
    }
    
    const resendVerification = async () => {
      try {
        if (currentUser.value) {
          const result = await resendEmailVerification(currentUser.value)
          generatedCode.value = result.verificationCode
          alert('Verification email resent successfully! Please check your inbox.')
          console.log('New verification code:', result.verificationCode)
        } else {
          alert('No user found. Please try signing up again.')
        }
      } catch (error) {
        console.error('Re-send verification error:', error)
        alert('Failed to resend verification email: ' + (error.message || 'Please try again.'))
      }
    }
    
    const handleSignup = async () => {
      if (!canSubmit.value) {
        if (!signupForm.value.agreeTerms) {
          alert('Please agree to the Terms of Service and Privacy Policy')
          return
        }
        if (!emailVerificationSent.value) {
          alert('Please wait for the verification email to be sent')
          return
        }
      }
      
      // Check if user wants to verify using code or email link
      if (verificationCode.value.length === 6) {
        await verifyCode()
      } else {
        // Redirect to login for email link verification
        alert('Account created! Please check your email and either:\n1. Enter the 6-digit code above, or\n2. Click the verification link in your email, then sign in.')
        router.push('/login')
      }
    }
    
    return {
      signupForm,
      isLoading,
      currentStep,
      steps,
      emailVerificationSent,
      showEmailChange,
      newEmail,
      canProceed,
      canSubmit,
      passwordValid,
      passwordMatchWarning,
      emailWarning,
      emailMatchWarning,
      phoneWarning,
      validatePassword,
      validateEmail,
      validatePhone,
      selectRole,
      nextStep,
      previousStep,
      updateEmail,
      checkEmailVerification,
      verifyCode,
      resendVerification,
      handleSignup,
      // Fading background state
      showStudentBg,
      showFacultyBg,
      showPasswordReq,
      // Verification code
      verificationCode,
      isVerifyingCode,
      generatedCode
    }
  }
}
</script>

<style scoped>
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.fade-scale-enter-to, .fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
.fade-section-enter-active, .fade-section-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-section-enter-from, .fade-section-leave-to {
  opacity: 0;
}
.fade-section-enter-to, .fade-section-leave-from {
  opacity: 1;
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
