<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import Button from '@/components/atoms/Button.vue'
import Input from '@/components/atoms/Input.vue'
import Modal from '@/components/organisms/Modal.vue'
import { useAuthStore } from '@/stores/auth'
import type { RegisterInput } from '@/models/User'

const router = useRouter()
const auth = useAuthStore()
auth.ensureInit()

// DACH = D (Deutschland), A (Austria), CH (Switzerland)
const countries = [
  'Germany', 'Austria', 'Switzerland',
  'France', 'Italy', 'Spain', 'Ukraine', 'United Kingdom', 'USA', 'Poland'
]

const formData = ref<RegisterInput>({
  salutation: '',
  otherSalutation: '',
  username: '',
  email: '',
  country: '',
  password: '',
  confirmPassword: '',
})

const showError = ref(false)
const errorMessage = ref('')

// YUP
const registerSchema = yup.object({
  salutation: yup.string().required('Salutation is required'),
  // "otherSalutation"  salutation === 'Other'
  otherSalutation: yup.string().when('salutation', {
    is: 'other',
    then: (schema) => schema.required('Please specify detail').max(30, 'Max 30 chars'),
    otherwise: (schema) => schema.notRequired()
  }),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  country: yup.string().required('Country is required'),
  password: yup.string()
    .required('Password is required')
    .min(12, 'Min 12 characters')
    .matches(/[a-z]/, 'Must contain lowercase')
    .matches(/[A-Z]/, 'Must contain uppercase')
    .matches(/\d/, 'Must contain number')
    .matches(/[@$!%*?&]/, 'Must contain symbol (@$!%*?&)'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
})

const handleRegister = async () => {
  try {
    await registerSchema.validate(formData.value, { abortEarly: true })
    await auth.register(formData.value)

    router.push('/profile')
  } catch (e) {
    if (e instanceof yup.ValidationError) {
      errorMessage.value = e.message
    } else if (e instanceof Error) {
      errorMessage.value = e.message
    } else {
      errorMessage.value = 'Registration failed.'
    }
    showError.value = true
  }
}
</script>

<template>
  <section class="space-y-6 max-w-md mx-auto py-10">
    <div>
      <h1 class="text-3xl font-extrabold text-gray-900">Register</h1>
      <p class="text-gray-600 mt-2">Create your account with extended details.</p>
    </div>

    <form class="space-y-4" @submit.prevent="handleRegister">

      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700">Salutation *</label>
        <select
          v-model="formData.salutation"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
        >
          <option value="" disabled>Select...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div v-if="formData.salutation === 'other'">
        <Input
          v-model="formData.otherSalutation"
          label="Details (max 30) *"
          placeholder="Please specify..."
          maxlength="30"
        />
        </div>

      <Input
        v-model="formData.username"
        label="Username *"
        placeholder="Choose a username"
      />

      <Input
        v-model="formData.email"
        label="Email *"
        type="email"
        placeholder="you@example.com"
      />

      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700">Country *</label>
        <select
          v-model="formData.country"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
        >
          <option value="" disabled>Select Country...</option>
          <option v-for="c in countries" :key="c" :value="c">
            {{ c }}
          </option>
        </select>
      </div>

      <Input
        v-model="formData.password"
        label="Password *"
        type="password"
        placeholder="Min 12 chars, A-Z, 0-9, symbol"
      />

      <Input
        v-model="formData.confirmPassword"
        label="Confirm Password *"
        type="password"
        placeholder="Repeat password"
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
