<script setup lang="ts">
import Button from '@/components/atoms/Button.vue'

interface Props {
  show: boolean
  title?: string
  message: string
}

withDefaults(defineProps<Props>(), {
  title: 'Error'
})

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/50"
        @click="emit('close')"
      ></div>

      <!-- Modal Content -->
      <div class="relative bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h3 class="text-lg font-bold mb-2">{{ title }}</h3>
        <p class="text-gray-700 mb-4">{{ message }}</p>

        <Button
          full-width
          @click="emit('close')"
        >
          Close
        </Button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Optional: einfache Fade-Animation */
</style>
