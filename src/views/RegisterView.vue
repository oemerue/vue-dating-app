<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/atoms/Button.vue'
import Input from '@/components/atoms/Input.vue'
import Modal from '@/components/organisms/Modal.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
auth.ensureInit()

const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const showError = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  try {
    await auth.register(formData.value)
    router.push('/profile')
  } catch (e) {
    errorMessage.value = e instanceof Error ? e.message : 'Registrierung fehlgeschlagen.'
    showError.value = true
  }
}
</script>

<template>
  <section class="space-y-6 max-w-md mx-auto">
    <div>
      <h1 class="text-3xl font-extrabold text-gray-900">Register</h1>
      <p class="text-gray-600 mt-2">Create your account.</p>
    </div>

    <form class="space-y-4" @submit.prevent="handleRegister">
      <Input
        v-model="formData.username"
        label="Username *"
        required
        placeholder="Choose a username"
      />
      <Input
        v-model="formData.email"
        label="Email *"
        type="email"
        required
        placeholder="you@example.com"
      />
      <Input
        v-model="formData.password"
        label="Password *"
        type="password"
        required
        placeholder="min. 6 Zeichen"
      />
      <Input
        v-model="formData.confirmPassword"
        label="Confirm Password *"
        type="password"
        required
        placeholder="repeat password"
      />

      <Button type="submit" full-width>Create Account</Button>
    </form>

    <p class="text-center text-gray-600">
      Already have an account?
      <RouterLink to="/login" class="text-pink-600 font-medium hover:underline"
        >Login here</RouterLink
      >
    </p>

    <Modal :show="showError" :message="errorMessage" @close="showError = false" />
  </section>
</template>
