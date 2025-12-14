<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { authService } from '@/services/AuthService'
import type { PublicProfile } from '@/models/User'

const profiles = ref<PublicProfile[]>([])

onMounted(() => {
  profiles.value = authService.listPublicProfiles()
})
</script>

<template>
  <section class="space-y-6">
    <h1 class="text-2xl font-bold">Profiles</h1>
    <p class="text-gray-600">Öffentliche Profile (aus Registrierung).</p>

    <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <li v-for="p in profiles" :key="p.id" class="border rounded-xl p-4">
        <div class="flex items-center gap-3">
          <div class="h-12 w-12 rounded-full bg-gray-200" />
          <div>
            <p class="font-semibold">{{ p.username }}</p>
            <p class="text-gray-500 text-sm">{{ p.bio || '—' }}</p>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
