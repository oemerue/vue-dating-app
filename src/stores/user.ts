import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '' as string,
    role: 'anon' as 'anon' | 'user' | 'admin',
  }),
  getters: {
    isAuthenticated: (s) => !!s.token,
    isAdmin: (s) => s.role === 'admin',
  },
  actions: {
    loginDummy() {
      this.token = 'dummy'
      this.role = 'user'
    },
    logout() {
      this.token = ''
      this.role = 'anon'
    },
  },
})
