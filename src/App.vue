<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/organisms/NavBar.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
auth.ensureInit()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
    <NavBar />
    <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white/90 rounded-2xl shadow-2xl p-6 md:p-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>
