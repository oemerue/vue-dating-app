<script setup lang="ts">
interface Props {
  fullWidth?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

withDefaults(defineProps<Props>(), {
  fullWidth: false,
  disabled: false,
  type: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :class="[
      'bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg',
      { 'w-full': fullWidth },
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :type="type"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>
