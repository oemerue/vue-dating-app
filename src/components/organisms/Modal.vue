<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue' 
import Button from '@/components/atoms/Button.vue'

interface Props {
  show: boolean
  title?: string
  message: string
  type?: 'error' | 'success' | 'warning' | 'info'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'error'
})

const emit = defineEmits<{
  close: []
}>()

const iconColor = computed(() => {
  switch (props.type) {
    case 'error': return 'text-red-600'
    case 'success': return 'text-green-600'
    case 'warning': return 'text-yellow-600'
    case 'info': return 'text-blue-600'
    default: return 'text-gray-600'
  }
})

const bgColor = computed(() => {
  switch (props.type) {
    case 'error': return 'bg-red-50'
    case 'success': return 'bg-green-50'
    case 'warning': return 'bg-yellow-50'
    case 'info': return 'bg-blue-50'
    default: return 'bg-gray-50'
  }
})

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.show) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div 
        v-if="show" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? 'modal-title' : undefined"
      >
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="emit('close')"
          aria-hidden="true"
        ></div>
        
        <!-- Modal Content -->
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">
          <!-- Header -->
          <div :class="[bgColor, 'px-6 pt-6 pb-4']">
            <div class="flex items-start gap-4">
              <!-- Icon -->
              <div :class="[iconColor, 'flex-shrink-0']">
                <svg v-if="type === 'error'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <svg v-else-if="type === 'success'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else-if="type === 'warning'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <!-- Title -->
              <div class="flex-1">
                <h3 id="modal-title" class="text-lg font-bold text-gray-900">
                  {{ title || (type === 'error' ? 'Error' : type === 'success' ? 'Success' : 'Notice') }}
                </h3>
              </div>
              
              <!-- Close button -->
              <button
                @click="emit('close')"
                class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
                aria-label="Close modal"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Body -->
          <div class="px-6 py-4">
            <p class="text-gray-700 leading-relaxed">{{ message }}</p>
          </div>
          
          <!-- Footer -->
          <div class="px-6 pb-6">
            <Button
              full-width
              variant="primary"
              @click="emit('close')"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .relative,
.modal-fade-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-fade-enter-from .relative {
  transform: scale(0.9);
  opacity: 0;
}

.modal-fade-leave-to .relative {
  transform: scale(0.9);
  opacity: 0;
}
</style>
