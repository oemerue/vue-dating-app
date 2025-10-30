<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'page-change': [page: number]
}>()

const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}
</script>

<template>
  <div class="flex justify-center items-center gap-2 pt-4">
    <button
      :disabled="currentPage === 1"
      :class="[
        'px-3 py-2 rounded-lg font-medium transition-colors',
        currentPage === 1 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      ]"
      @click="changePage(currentPage - 1)"
      aria-label="Previous page"
    >
      Previous
    </button>
    
    <button
      v-for="page in totalPages"
      :key="page"
      :class="[
        'px-4 py-2 rounded-lg font-medium transition-colors',
        page === currentPage 
          ? 'bg-pink-600 text-white' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      ]"
      @click="changePage(page)"
      :aria-label="`Go to page ${page}`"
      :aria-current="page === currentPage ? 'page' : undefined"
    >
      {{ page }}
    </button>
    
    <button
      :disabled="currentPage === totalPages"
      :class="[
        'px-3 py-2 rounded-lg font-medium transition-colors',
        currentPage === totalPages 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      ]"
      @click="changePage(currentPage + 1)"
      aria-label="Next page"
    >
      Next
    </button>
  </div>
</template>
