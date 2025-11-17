<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/atoms/Button.vue'
import Input from '@/components/atoms/Input.vue'

const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleRegister = () => {
  console.log('Register attempt:', formData.value)
}
</script>

<template>
  <section class="space-y-6 max-w-md mx-auto">
    <div>
      <h1 class="text-3xl font-extrabold text-gray-900">Register</h1>
      <p class="text-gray-600 mt-2">Create your account to start meeting new people.</p>
    </div>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Username <span class="text-red-500">*</span>
        </label>
        <Input
          v-model="formData.username"
          type="text"
          required
          placeholder="Choose a username"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Email <span class="text-red-500">*</span>
        </label>
        <Input
          v-model="formData.email"
          type="email"
          required
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Password <span class="text-red-500">*</span>
        </label>
        <Input
          v-model="formData.password"
          type="password"
          required
          placeholder="Create a password"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password <span class="text-red-500">*</span>
        </label>
        <Input
          v-model="formData.confirmPassword"
          type="password"
          required
          placeholder="Confirm your password"
        />
      </div>

      <Button
        type="submit"
        fullWidth
      >
        Create Account
      </Button>
    </form>

    <p class="text-center text-gray-600">
      Already have an account?
      <RouterLink to="/login" class="text-pink-600 font-medium hover:underline">
        Login here
      </RouterLink>
    </p>
  </section>
</template>
