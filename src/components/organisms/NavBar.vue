<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
auth.ensureInit()

const isActive = (name: string) => route.name === name

const isLoggedIn = computed(() => auth.isAuthenticated)
const isAdmin = computed(() => auth.role === 'admin')

const logout = () => {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <header
    class="sticky top-0 z-40 w-full bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b"
  >
    <nav class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
      <RouterLink to="/" class="font-extrabold text-xl">
        <span class="text-pink-600">Vue</span><span class="text-indigo-600">Dating</span>
      </RouterLink>

      <ul class="hidden md:flex gap-4 text-sm font-medium">
        <li>
          <RouterLink :class="isActive('home') ? 'text-pink-700' : 'text-gray-700'" to="/"
            >Home</RouterLink
          >
        </li>
        <li>
          <RouterLink
            :class="isActive('profiles') ? 'text-pink-700' : 'text-gray-700'"
            to="/profiles"
            >Profiles</RouterLink
          >
        </li>
        <li>
          <RouterLink :class="isActive('help') ? 'text-pink-700' : 'text-gray-700'" to="/help"
            >Help</RouterLink
          >
        </li>
        <li>
          <RouterLink :class="isActive('imprint') ? 'text-pink-700' : 'text-gray-700'" to="/imprint"
            >Imprint</RouterLink
          >
        </li>

        <li v-if="isLoggedIn">
          <RouterLink :class="isActive('profile') ? 'text-pink-700' : 'text-gray-700'" to="/profile"
            >My Profile</RouterLink
          >
        </li>
        <li v-if="isAdmin">
          <RouterLink :class="isActive('admin') ? 'text-pink-700' : 'text-gray-700'" to="/admin"
            >Admin</RouterLink
          >
        </li>
      </ul>

      <div class="flex items-center gap-2">
        <template v-if="!isLoggedIn">
          <RouterLink
            to="/login"
            class="text-sm px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >Login</RouterLink
          >
          <RouterLink
            to="/register"
            class="text-sm px-3 py-2 rounded-md text-white bg-pink-600 hover:bg-pink-700"
          >
            Register
          </RouterLink>
        </template>

        <template v-else>
          <button
            class="text-sm px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            @click="logout"
          >
            Logout
          </button>
        </template>
      </div>
    </nav>
  </header>
</template>
