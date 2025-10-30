<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()
const isActive = (name: string) => route.name === name
</script>

<template>
  <header class="sticky top-0 z-40 w-full bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
    <nav class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
      <RouterLink to="/" class="font-extrabold text-xl">
        <span class="text-pink-600">Vue</span><span class="text-indigo-600">Dating</span>
      </RouterLink>

      <ul class="hidden md:flex gap-4 text-sm font-medium">
        <li>
          <RouterLink
            :class="['px-3 py-2 rounded-md', isActive('home') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900']"
            to="/"
          >Home</RouterLink>
        </li>
        <li>
          <RouterLink
            :class="['px-3 py-2 rounded-md', isActive('profiles') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900']"
            to="/profiles"
          >Profiles</RouterLink>
        </li>
        <li>
          <RouterLink
            :class="['px-3 py-2 rounded-md', isActive('help') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900']"
            to="/help"
          >Help</RouterLink>
        </li>
        <li>
          <RouterLink
            :class="['px-3 py-2 rounded-md', isActive('imprint') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900']"
            to="/imprint"
          >Imprint</RouterLink>
        </li>
      </ul>

      <div class="flex items-center gap-2">
        <RouterLink to="/login" class="text-sm px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Login</RouterLink>
        <RouterLink to="/register" class="text-sm px-3 py-2 rounded-md text-white bg-pink-600 hover:bg-pink-700">
          Register
        </RouterLink>
      </div>
    </nav>
  </header>
</template>
