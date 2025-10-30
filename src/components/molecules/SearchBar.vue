<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search profiles...'
})

const emit = defineEmits<{
  search: [query: string]
}>()

const searchQuery = ref('')

const handleSearch = () => {
  emit('search', searchQuery.value)
}
</script>

<template>
  <div class="relative">
    <input
      v-model="searchQuery"
      type="search"
      :placeholder="placeholder"
      class="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-full sm:w-64 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
      @input="handleSearch"
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
</template>
