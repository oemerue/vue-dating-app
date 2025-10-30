<script setup lang="ts">
import { ref } from 'vue'

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
        <input
          v-model="formData.username"
          type="text"
          required
          placeholder="Choose a username"
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Email <span class="text-red-500">*</span>
        </label>
        <input
          v-model="formData.email"
          type="email"
          required
          placeholder="your@email.com"
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Password <span class="text-red-500">*</span>
        </label>
        <input
          v-model="formData.password"
          type="password"
          required
          placeholder="Create a password"
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password <span class="text-red-500">*</span>
        </label>
        <input
          v-model="formData.confirmPassword"
          type="password"
          required
          placeholder="Confirm your password"
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>
      
      <button
        type="submit"
        class="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
      >
        Create Account
      </button>
    </form>

    <p class="text-center text-gray-600">
      Already have an account? 
      <RouterLink to="/login" class="text-pink-600 font-medium hover:underline">
        Login here
      </RouterLink>
    </p>
  </section>
</template>
