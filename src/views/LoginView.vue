<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from '@/components/atoms/Button.vue'
import Input from '@/components/atoms/Input.vue'
import Modal from '@/components/organisms/Modal.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
auth.ensureInit()

const email = ref('')
const password = ref('')

const showErrorModal = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    await auth.login(email.value, password.value)
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch (e) {
    errorMessage.value = e instanceof Error ? e.message : 'Login fehlgeschlagen.'
    showErrorModal.value = true
  }
}
</script>

<template>
  <section class="space-y-6 max-w-md mx-auto">
    <div>
      <h1 class="text-3xl font-extrabold text-gray-900">Login</h1>
      <p class="text-gray-600 mt-2">Bitte logge dich ein.</p>
    </div>

    <form class="space-y-4" @submit.prevent="handleLogin">
      <Input v-model="email" label="Email *" type="email" required placeholder="you@example.com" />
      <Input
        v-model="password"
        label="Password *"
        type="password"
        required
        placeholder="••••••••"
      />
      <Button type="submit" full-width>Login</Button>
    </form>

    <p class="text-center text-gray-600">
      Don't have an account?
      <RouterLink to="/register" class="text-pink-600 font-medium hover:underline"
        >Register here</RouterLink
      >
    </p>

    <Modal :show="showErrorModal" :message="errorMessage" @close="showErrorModal = false" />
  </section>
</template>
