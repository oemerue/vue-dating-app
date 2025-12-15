<script setup lang="ts">
import { computed } from 'vue'
import { authService } from '@/services/AuthService'

const profiles = computed(() => authService.listPublicProfiles())
</script>

<template>
  <section class="space-y-6">
    <h1 class="text-3xl font-extrabold text-gray-900">Admin</h1>
    <p class="text-gray-600">Nur Admin darf diese Seite sehen (Permission-based Navigation).</p>

    <div class="border rounded-xl p-4">
      <h2 class="font-semibold mb-2">Registrierte Profile (öffentlich)</h2>
      <ul class="space-y-2">
        <li v-for="p in profiles" :key="p.id" class="border rounded-lg p-3">
          <div class="font-semibold">{{ p.username }}</div>
          <div class="text-gray-600 text-sm">{{ p.bio || '—' }}</div>
        </li>
      </ul>
    </div>
  </section>
</template>
