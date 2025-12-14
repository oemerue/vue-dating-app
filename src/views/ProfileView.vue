<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from '@/components/atoms/Button.vue'
import Input from '@/components/atoms/Input.vue'
import Modal from '@/components/organisms/Modal.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
auth.ensureInit()

// reaktiv (damit Template automatisch updatet)
const current = computed(() => auth.user)

// Form-Felder (einfach einmal initial aus dem Store)
const username = ref(auth.user?.username ?? '')
const bio = ref(auth.user?.bio ?? '')

// Error-Modal
const showError = ref(false)
const errorMessage = ref('')

function showErr(e: unknown, fallback: string) {
  errorMessage.value = e instanceof Error ? e.message : fallback
  showError.value = true
}

function save() {
  try {
    auth.updateProfile({ username: username.value, bio: bio.value })
  } catch (e) {
    showErr(e, 'Update fehlgeschlagen.')
  }
}

function removeAccount() {
  try {
    auth.deleteAccount()
  } catch (e) {
    showErr(e, 'Löschen fehlgeschlagen.')
  }
}
</script>

<template>
  <section v-if="current" class="space-y-6 max-w-xl">
    <div>
      <h1 class="text-3xl font-extrabold text-gray-900">Mein Profil</h1>
      <p class="text-gray-600 mt-2">Profil bearbeiten / löschen (CRUD).</p>
    </div>

    <div class="space-y-4">
      <Input v-model="username" label="Username *" required placeholder="Username" />

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea
          v-model="bio"
          rows="4"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Kurzbeschreibung…"
        ></textarea>
      </div>

      <div class="flex gap-2">
        <Button type="button" @click="save">Speichern</Button>
        <Button type="button" @click="removeAccount">Account löschen</Button>
      </div>
    </div>
  </section>

  <section v-else class="max-w-xl">
    <p class="text-gray-600">Bitte einloggen.</p>
  </section>

  <Modal :show="showError" :message="errorMessage" @close="showError = false" />
</template>
