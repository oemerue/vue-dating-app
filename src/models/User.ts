export type Role = 'admin' | 'user'
export type EffectiveRole = Role | 'visitor'

export interface User {
  id: string
  username: string
  email: string
  password: string // nur für Milestone (localStorage). In echt: niemals so.
  role: Role
  bio: string
  createdAt: string
  updatedAt: string
}

export type PublicUser = Omit<User, 'password'>

export interface PublicProfile {
  id: string
  username: string
  bio: string
}

export interface RegisterInput {
  salutation: 'male' | 'female' | 'other' | ''
  otherSalutation: string
  username: string
  email: string
  country: string
  password: string
  confirmPassword: string
}

export interface UpdateProfileInput {
  username: string
  bio: string
}
