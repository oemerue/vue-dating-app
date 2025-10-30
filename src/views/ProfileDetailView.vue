<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mockProfiles } from '@/data/mockProfiles'
import type { Profile } from '@/types/profile.types'

const route = useRoute()
const router = useRouter()

const profile = ref<Profile | null>(null)
const loading = ref(true)
const notFound = ref(false)


const profileId = computed(() => parseInt(route.params.id as string))


onMounted(() => {
  loading.value = true
  
  
  setTimeout(() => {
    const foundProfile = mockProfiles.find(p => p.id === profileId.value)
    
    if (foundProfile) {
      profile.value = foundProfile
    } else {
      notFound.value = true
    }
    
    loading.value = false
  }, 300)
})

const goBack = () => {
  router.push('/profiles')
}

const defaultAvatar = computed(() => {
  if (!profile.value) return ''
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.value.username)}&background=ec4899&color=fff&size=400`
})

const avatarSrc = computed(() => {
  return profile.value?.avatar || defaultAvatar.value
})
</script>

<template>
  <section class="space-y-6">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
    </div>

    <!-- Not Found State -->
    <div v-else-if="notFound" class="text-center py-20">
      <div class="text-6xl mb-4">😔</div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
      <p class="text-gray-600 mb-6">The profile you're looking for doesn't exist.</p>
      <button
        @click="goBack"
        class="px-6 py-3 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition-colors"
      >
        Back to Profiles
      </button>
    </div>

    <!-- Profile Detail -->
    <div v-else-if="profile" class="space-y-6">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Profiles
      </button>

      <!-- Profile Header -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Cover / Header Image -->
        <div class="h-48 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
        
        <div class="px-6 pb-6">
          <!-- Avatar -->
          <div class="flex flex-col sm:flex-row sm:items-end gap-6 -mt-16 sm:-mt-20">
            <div class="relative">
              <img 
                :src="avatarSrc"
                :alt="`${profile.username}'s avatar`"
                class="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-4 border-white shadow-xl object-cover"
                @error="($event.target as HTMLImageElement).src = defaultAvatar"
              />
              <div class="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            
            <!-- Name & Basic Info -->
            <div class="flex-1 sm:mb-4">
              <h1 class="text-3xl font-bold text-gray-900 mb-1">
                {{ profile.username }}
              </h1>
              <p class="text-xl text-gray-600 mb-2">{{ profile.age }} years old</p>
              <div class="flex items-center gap-2 text-gray-500">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ profile.city }}, {{ profile.country }}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3 sm:mb-4">
              <button class="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
                Send Message
              </button>
              <button class="px-4 py-3 border-2 border-pink-600 text-pink-600 rounded-lg font-medium hover:bg-pink-50 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Content -->
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- About Section -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              About {{ profile.username }}
            </h2>
            <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ profile.bio }}</p>
          </div>

          <!-- Interests Section -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Interests & Hobbies
            </h2>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="interest in profile.interests"
                :key="interest"
                class="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 rounded-full text-sm font-medium"
              >
                {{ interest }}
              </span>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Profile Info Card -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Profile Info</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <svg class="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Age</p>
                  <p class="font-semibold text-gray-900">{{ profile.age }} years</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Location</p>
                  <p class="font-semibold text-gray-900">{{ profile.city }}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Country</p>
                  <p class="font-semibold text-gray-900">{{ profile.country }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Stats Card -->
          <div class="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 class="text-lg font-bold mb-4">Profile Stats</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-pink-100">Profile Views</span>
                <span class="font-bold text-xl">{{ Math.floor(Math.random() * 500) + 100 }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-pink-100">Interests Match</span>
                <span class="font-bold text-xl">{{ Math.floor(Math.random() * 30) + 70 }}%</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-pink-100">Response Rate</span>
                <span class="font-bold text-xl">{{ Math.floor(Math.random() * 30) + 60 }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
