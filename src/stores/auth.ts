import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authService } from '@/services/AuthService'
import type { EffectiveRole, PublicUser, RegisterInput, UpdateProfileInput } from '@/models/User'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<PublicUser | null>(null)
  const initialized = ref(false)

  function ensureInit(): void {
    if (initialized.value) return
    authService.seedAdminIfMissing()
    user.value = authService.getCurrentUser()
    initialized.value = true
  }

  async function login(email: string, password: string): Promise<void> {
    user.value = authService.login(email, password)
  }

  async function register(input: RegisterInput): Promise<void> {
    user.value = authService.register(input)
  }

  function logout(): void {
    authService.logout()
    user.value = null
  }

  function updateProfile(input: UpdateProfileInput): void {
    user.value = authService.updateProfile(input)
  }

  function deleteAccount(): void {
    authService.deleteAccount()
    user.value = null
  }

  const isAuthenticated = computed(() => !!user.value)
  const role = computed<EffectiveRole>(() => (user.value ? user.value.role : 'visitor'))

  return {
    user,
    initialized,
    ensureInit,
    login,
    register,
    logout,
    updateProfile,
    deleteAccount,
    isAuthenticated,
    role,
  }
})
