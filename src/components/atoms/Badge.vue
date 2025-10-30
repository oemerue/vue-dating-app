<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary'
})

const badgeClasses = computed(() => {
  const variants = {
    primary: 'bg-pink-100 text-pink-700',
    secondary: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700'
  }
  
  return `${variants[props.variant]} px-3 py-1 text-xs font-medium rounded-full`
})
</script>

<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>
