<script setup lang="ts">
interface Props {
  modelValue: string
  type?: string
  placeholder?: string
  label?: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
console.log('emit', emit)
</script>

<template>
  <div class="w-full">
    <label v-if="label">
      {{ label }}
    </label>

    <div class="border border-gray-300 rounded-lg">
      <input
        :value="modelValue"
        :type="type"
        :required="required"
        :placeholder="placeholder"
        class="w-full px-4 py-2 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>

