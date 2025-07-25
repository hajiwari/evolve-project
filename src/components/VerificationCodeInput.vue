<template>
  <div class="verification-code-input">
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
    </label>
    <div class="flex space-x-2 justify-center">
      <input
        v-for="(digit, index) in digits"
        :key="index"
        :ref="el => inputRefs[index] = el"
        v-model="digits[index]"
        type="text"
        maxlength="1"
        class="w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
        :class="[
          hasError ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50',
          digits[index] ? 'bg-white border-primary' : ''
        ]"
        @input="onInput(index, $event)"
        @keydown="onKeyDown(index, $event)"
        @paste="onPaste($event)"
      />
    </div>
    <div v-if="hasError" class="mt-2 text-sm text-orange-500">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { ref, computed, nextTick, watch } from 'vue'

export default {
  name: 'VerificationCodeInput',
  props: {
    label: {
      type: String,
      default: 'Enter 6-digit verification code'
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const digits = ref(['', '', '', '', '', ''])
    const inputRefs = ref([])
    const hasError = ref(false)
    const errorMessage = ref('')

    // Watch for external value changes
    watch(() => props.modelValue, (newValue) => {
      if (newValue && newValue.length === 6) {
        digits.value = newValue.split('')
      } else if (!newValue) {
        digits.value = ['', '', '', '', '', '']
      }
    }, { immediate: true })

    // Computed value for the complete code
    const code = computed(() => digits.value.join(''))

    // Watch digits and emit changes
    watch(code, (newCode) => {
      emit('update:modelValue', newCode)
    })

    const validateInput = (value) => {
      const isValid = /^\d*$/.test(value)
      if (!isValid) {
        hasError.value = true
        errorMessage.value = 'Only numbers are allowed'
        setTimeout(() => {
          hasError.value = false
          errorMessage.value = ''
        }, 3000)
      }
      return isValid
    }

    const onInput = (index, event) => {
      const value = event.target.value
      
      // Validate input (only numbers)
      if (!validateInput(value)) {
        // Clear invalid input
        digits.value[index] = ''
        return
      }

      // Update the digit
      digits.value[index] = value

      // Move to next input if digit was entered
      if (value && index < 5) {
        nextTick(() => {
          inputRefs.value[index + 1]?.focus()
        })
      }
    }

    const onKeyDown = (index, event) => {
      // Handle backspace
      if (event.key === 'Backspace') {
        if (!digits.value[index] && index > 0) {
          // Move to previous input if current is empty
          nextTick(() => {
            inputRefs.value[index - 1]?.focus()
          })
        } else {
          // Clear current digit
          digits.value[index] = ''
        }
      }
      // Handle arrow keys
      else if (event.key === 'ArrowLeft' && index > 0) {
        nextTick(() => {
          inputRefs.value[index - 1]?.focus()
        })
      }
      else if (event.key === 'ArrowRight' && index < 5) {
        nextTick(() => {
          inputRefs.value[index + 1]?.focus()
        })
      }
    }

    const onPaste = (event) => {
      event.preventDefault()
      const pastedData = event.clipboardData.getData('text').trim()
      
      // Validate pasted data (only 6 digits)
      if (/^\d{6}$/.test(pastedData)) {
        digits.value = pastedData.split('')
        // Focus the last input
        nextTick(() => {
          inputRefs.value[5]?.focus()
        })
      } else {
        hasError.value = true
        errorMessage.value = 'Please paste a valid 6-digit code'
        setTimeout(() => {
          hasError.value = false
          errorMessage.value = ''
        }, 3000)
      }
    }

    return {
      digits,
      inputRefs,
      hasError,
      errorMessage,
      onInput,
      onKeyDown,
      onPaste
    }
  }
}
</script>

<style scoped>
.verification-code-input input:focus {
  transform: scale(1.05);
}
</style>
