export interface Profile {
  id: number
  username: string
  age: number
  city: string
  country: string
  bio: string
  avatar: string
  interests: string[]
}

export interface ModalState {
  show: boolean
  title: string
  message: string
  type: 'error' | 'success' | 'warning' | 'info'
}
