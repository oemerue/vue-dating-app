import { ref, computed } from 'vue'
import type { ModalState } from '@/types/profile.types'

export function useModal() {
  const modalState = ref<ModalState>({
    show: false,
    title: '',
    message: '',
    type: 'info'
  })

  const showModal = (
    message: string, 
    title?: string, 
    type: 'error' | 'success' | 'warning' | 'info' = 'info'
  ) => {
    modalState.value = {
      show: true,
      title: title || (type === 'error' ? 'Error' : type === 'success' ? 'Success' : 'Notice'),
      message,
      type
    }
  }

  const hideModal = () => {
    modalState.value.show = false
  }

  const showError = (message: string, title = 'Error') => {
    showModal(message, title, 'error')
  }

  const showSuccess = (message: string, title = 'Success') => {
    showModal(message, title, 'success')
  }

  return {
    modalState: computed(() => modalState.value),
    showModal,
    hideModal,
    showError,
    showSuccess
  }
}
