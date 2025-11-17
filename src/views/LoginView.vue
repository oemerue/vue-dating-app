<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/atoms/Button.vue'
import Input from '@/components/atoms/Input.vue'
import Modal from '@/components/organisms/Modal.vue'

const email = ref('')
const password = ref('')

const showErrorModal = ref(false)
const errorMessage = ref('')

const handleLogin = () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please fill in both email and password.'
    showErrorModal.value = true
    return
  }
  console.log('Login attempt:', email.value)
  console.log('Password:', password.value)
}
</script>

<template>
  <section class="space-y-6 max-w-md mx-auto">
    <div>
      <h1 class="text-3xl font-extrabold text-gray-900">Login</h1>
      <p class="text-gray-600 mt-2">Welcome back! Please login to your account.</p>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Email <span class="text-red-500">*</span>
        </label>
        <Input
          v-model="email"
          type="email"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Password <span class="text-red-500">*</span>
        </label>
        <Input
          v-model="password"
          type="password"
          placeholder="Enter your password"
        />
      </div>

      <Button
        type="submit"
        fullWidth
      >
        Login
      </Button>
    </form>

    <p class="text-center text-gray-600">
      Don't have an account?
      <RouterLink to="/register" class="text-pink-600 font-medium hover:underline">
        Register here
      </RouterLink>
    </p>
  </section>

    <Modal
    :show="showErrorModal"
    :message="errorMessage"
    @close="showErrorModal = false"
  />

</template>
