import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },

    { path: '/profiles', name: 'profiles', component: () => import('@/views/ProfilesView.vue') },
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
    { path: '/register', name: 'register', component: () => import('@/views/RegisterView.vue') },

    // NEU (Milestone 2)
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminView.vue'),
      meta: { requiresAuth: true, roles: ['admin'] },
    },

    { path: '/help', name: 'help', component: () => import('@/views/HelpView.vue') },
    { path: '/imprint', name: 'imprint', component: () => import('@/views/ImprintView.vue') },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  auth.ensureInit()

  const requiresAuth = Boolean(to.meta.requiresAuth)
  const roles = to.meta.roles as string[] | undefined

  if (requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (roles && auth.user && !roles.includes(auth.user.role)) {
    return { name: 'home' }
  }
})

export default router