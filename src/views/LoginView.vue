<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleLogin = () => {
  console.log('Login attempt:', email.value)  
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
        <input
          v-model="email"
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
          v-model="password"
          type="password"
          required
          placeholder="Enter your password"
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>
      
      <button
        type="submit"
        class="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
      >
        Login
      </button>
    </form>

    <p class="text-center text-gray-600">
      Don't have an account? 
      <RouterLink to="/register" class="text-pink-600 font-medium hover:underline">
        Register here
      </RouterLink>
    </p>
  </section>
</template>
