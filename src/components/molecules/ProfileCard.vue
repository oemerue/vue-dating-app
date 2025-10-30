<script setup lang="ts">
import { computed } from 'vue'
import Badge from '@/components/atoms/Badge.vue'
import Button from '@/components/atoms/Button.vue'
import type { Profile } from '@/types/profile.types'

interface Props {
  profile: Profile
}

const props = defineProps<Props>()

const defaultAvatar = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(props.profile.username) + '&background=ec4899&color=fff&size=400'

const avatarSrc = computed(() => props.profile.avatar || defaultAvatar)

const truncatedBio = computed(() => {
  if (props.profile.bio.length > 100) {
    return props.profile.bio.substring(0, 100) + '...'
  }
  return props.profile.bio
})
</script>

<template>
  <article 
    class="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    :aria-label="`Profile of ${profile.username}`"
  >
    <!-- Avatar -->
    <div class="relative h-48 bg-gradient-to-br from-pink-400 to-purple-500 overflow-hidden">
      <img 
        :src="avatarSrc" 
        :alt="`${profile.username}'s profile picture`"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
        @error="($event.target as HTMLImageElement).src = defaultAvatar"
      />
      <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
        {{ profile.age }} years
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-5 space-y-3">
      <!-- Name & Location -->
      <div>
        <h3 class="text-xl font-bold text-gray-900 mb-1 break-words">
          {{ profile.username }}
        </h3>
        <p class="text-sm text-gray-500 flex items-center gap-1">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="truncate">{{ profile.city }}, {{ profile.country }}</span>
        </p>
      </div>
      
      <!-- Bio -->
      <p class="text-gray-600 text-sm line-clamp-2" :title="profile.bio">
        {{ truncatedBio }}
      </p>
      
      <!-- Interests -->
      <div class="flex flex-wrap gap-2" role="list" aria-label="Interests">
        <Badge
          v-for="interest in profile.interests.slice(0, 3)" 
          :key="interest"
          variant="primary"
        >
          {{ interest }}
        </Badge>
        <Badge
          v-if="profile.interests.length > 3"
          variant="secondary"
        >
          +{{ profile.interests.length - 3 }}
        </Badge>
      </div>
      
      <!-- Action Button -->
      <Button
        full-width
        variant="primary"
        class="mt-2"
        @click="() => {}"
      >
        View Profile
      </Button>
    </div>
  </article>
</template>
