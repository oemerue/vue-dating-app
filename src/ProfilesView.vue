<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { mockProfiles } from '@/data/mockProfiles'
import type { Profile } from '@/types/profile.types'

const router = useRouter()
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 4

const profiles = ref<Profile[]>(mockProfiles)

const filteredProfiles = computed(() => {
  if (!searchQuery.value) return profiles.value
  
  const query = searchQuery.value.toLowerCase()
  return profiles.value.filter(profile =>
    profile.username.toLowerCase().includes(query) ||
    profile.city.toLowerCase().includes(query) ||
    profile.country.toLowerCase().includes(query) ||
    profile.interests.some(interest => interest.toLowerCase().includes(query))
  )
})

const totalPages = computed(() => 
  Math.ceil(filteredProfiles.value.length / itemsPerPage)
)

const paginatedProfiles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProfiles.value.slice(start, end)
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handleSearch = () => {
  currentPage.value = 1
}

const viewProfile = (profileId: number) => {
  router.push(`/profiles/${profileId}`)
}

const pageNumbers = computed(() => {
  const pages = []
  const maxPagesToShow = 5
  
  let startPage = Math.max(1, currentPage.value - Math.floor(maxPagesToShow / 2))
  let endPage = Math.min(totalPages.value, startPage + maxPagesToShow - 1)
  
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1)
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  
  return pages
})
</script>

<template>
  <section class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Discover Profiles
        </h1>
        <p class="text-gray-600 mt-1">
          Find your perfect match among {{ filteredProfiles.length }} member{{ filteredProfiles.length !== 1 ? 's' : '' }}
        </p>
      </div>
      
      <!-- Search -->
      <div class="relative">
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="search"
          placeholder="Search profiles..."
          class="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-full sm:w-64 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          aria-label="Search profiles"
        />
        <svg 
          class="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <!-- No results message -->
    <div v-if="filteredProfiles.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <h3 class="mt-2 text-lg font-medium text-gray-900">No profiles found</h3>
      <p class="mt-1 text-gray-500">Try adjusting your search terms</p>
    </div>

    <!-- Profiles Grid -->
    <div 
      v-else
      class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="list"
      aria-label="User profiles"
    >
      <div
        v-for="profile in paginatedProfiles"
        :key="profile.id"
        class="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        role="listitem"
      >
        <!-- Avatar -->
        <div class="relative h-48 bg-gradient-to-br from-pink-400 to-purple-500 overflow-hidden">
          <img 
            :src="profile.avatar" 
            :alt="`${profile.username}'s profile picture`"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
            {{ profile.age }} years
          </div>
        </div>

        <!-- Content -->
        <div class="p-4 space-y-3">
          <!-- Name & Location -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-1 break-words">
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
            {{ profile.bio }}
          </p>

          <!-- Interests -->
          <div class="flex flex-wrap gap-2" role="list" aria-label="Interests">
            <span
              v-for="interest in profile.interests.slice(0, 3)"
              :key="interest"
              class="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full"
              role="listitem"
            >
              {{ interest }}
            </span>
            <span
              v-if="profile.interests.length > 3"
              class="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
            >
              +{{ profile.interests.length - 3 }}
            </span>
          </div>

          <!-- Action Button -->
          <button
            @click="viewProfile(profile.id)"
            class="w-full mt-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
            :aria-label="`View profile of ${profile.username}`"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="filteredProfiles.length > 0 && totalPages > 1" class="flex justify-center items-center gap-2 pt-6">
      <!-- Previous Button -->
      <button
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
        :class="[
          'px-3 py-2 rounded-lg font-medium transition-all',
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
        aria-label="Previous page"
      >
        ← Prev
      </button>

      <!-- Page Numbers -->
      <div class="flex gap-1">
        <!-- First Page (if not in range) -->
        <button
          v-if="pageNumbers[0] > 1"
          @click="goToPage(1)"
          class="px-3 py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
          aria-label="Go to page 1"
        >
          1
        </button>
        
        <!-- Ellipsis (if needed) -->
        <span v-if="pageNumbers[0] > 2" class="px-2 py-2 text-gray-500">...</span>

        <!-- Page Numbers -->
        <button
          v-for="page in pageNumbers"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-all',
            page === currentPage
              ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
          :aria-label="`Go to page ${page}`"
          :aria-current="page === currentPage ? 'page' : undefined"
        >
          {{ page }}
        </button>

        <!-- Ellipsis (if needed) -->
        <span v-if="pageNumbers[pageNumbers.length - 1] < totalPages - 1" class="px-2 py-2 text-gray-500">...</span>

        <!-- Last Page (if not in range) -->
        <button
          v-if="pageNumbers[pageNumbers.length - 1] < totalPages"
          @click="goToPage(totalPages)"
          class="px-3 py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
          :aria-label="`Go to page ${totalPages}`"
        >
          {{ totalPages }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
        :class="[
          'px-3 py-2 rounded-lg font-medium transition-all',
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  </section>
</template>
