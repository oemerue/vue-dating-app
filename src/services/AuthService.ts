import { StorageService } from '@/services/StorageService'
import type {
  PublicProfile,
  PublicUser,
  RegisterInput,
  UpdateProfileInput,
  User,
} from '@/models/User'

export class AuthService {
  private readonly USERS_KEY = 'vd_users'
  private readonly SESSION_KEY = 'vd_session' // { userId: string }

  seedAdminIfMissing(): void {
    const users = this.getUsers()
    const hasAdmin = users.some((u) => u.role === 'admin')
    if (hasAdmin) return

    const now = new Date().toISOString()
    const admin: User = {
      id: crypto.randomUUID(),
      username: 'Admin',
      email: 'admin@vuedating.com',
      password: 'admin123',
      role: 'admin',
      bio: 'Admin account',
      createdAt: now,
      updatedAt: now,
    }

    users.push(admin)
    this.saveUsers(users)
  }

  register(input: RegisterInput): PublicUser {
    const username = input.username.trim()
    const email = input.email.trim().toLowerCase()
    const password = input.password
    const confirmPassword = input.confirmPassword

    if (!username || !email || !password || !confirmPassword) {
      throw new Error('Bitte alle Pflichtfelder ausfüllen.')
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error('Bitte eine gültige E-Mail eingeben.')
    }
    if (password.length < 6) {
      throw new Error('Passwort muss mindestens 6 Zeichen haben.')
    }
    if (password !== confirmPassword) {
      throw new Error('Passwörter stimmen nicht überein.')
    }

    const users = this.getUsers()
    if (users.some((u) => u.email.toLowerCase() === email)) {
      throw new Error('Diese E-Mail ist bereits registriert.')
    }

    const now = new Date().toISOString()
    const user: User = {
      id: crypto.randomUUID(),
      username,
      email,
      password,
      role: 'user',
      bio: '',
      createdAt: now,
      updatedAt: now,
    }

    users.push(user)
    this.saveUsers(users)

    // Auto-Login nach Registrierung (minimal + praktisch)
    this.setSession(user.id)

    return this.toPublic(user)
  }

  login(emailRaw: string, password: string): PublicUser {
    const email = emailRaw.trim().toLowerCase()
    if (!email || !password) throw new Error('Bitte E-Mail und Passwort eingeben.')

    const users = this.getUsers()
    const user = users.find((u) => u.email.toLowerCase() === email)
    if (!user || user.password !== password) {
      throw new Error('E-Mail oder Passwort ist falsch.')
    }

    this.setSession(user.id)
    return this.toPublic(user)
  }

  logout(): void {
    StorageService.remove(this.SESSION_KEY)
  }

  getCurrentUser(): PublicUser | null {
    const session = StorageService.read<{ userId: string } | null>(this.SESSION_KEY, null)
    if (!session?.userId) return null

    const user = this.getUsers().find((u) => u.id === session.userId)
    return user ? this.toPublic(user) : null
  }

  listPublicProfiles(): PublicProfile[] {
    return this.getUsers()
      .filter((u) => u.role !== 'admin')
      .map((u) => ({ id: u.id, username: u.username, bio: u.bio }))
  }

  updateProfile(input: UpdateProfileInput): PublicUser {
    const session = StorageService.read<{ userId: string } | null>(this.SESSION_KEY, null)
    if (!session?.userId) throw new Error('Nicht eingeloggt.')

    const users = this.getUsers()
    const idx = users.findIndex((u) => u.id === session.userId)
    if (idx === -1) throw new Error('User nicht gefunden.')

    const username = input.username.trim()
    const bio = input.bio.trim()

    if (!username) throw new Error('Username darf nicht leer sein.')

    users[idx] = { ...users[idx]!, username, bio, updatedAt: new Date().toISOString() }

    this.saveUsers(users)
    return this.toPublic(users[idx])
  }

  deleteAccount(): void {
    const session = StorageService.read<{ userId: string } | null>(this.SESSION_KEY, null)
    if (!session?.userId) throw new Error('Nicht eingeloggt.')

    const users = this.getUsers().filter((u) => u.id !== session.userId)
    this.saveUsers(users)
    this.logout()
  }

  // ---- intern ----
  private getUsers(): User[] {
    return StorageService.read<User[]>(this.USERS_KEY, [])
  }

  private saveUsers(users: User[]): void {
    StorageService.write(this.USERS_KEY, users)
  }

  private setSession(userId: string): void {
    StorageService.write(this.SESSION_KEY, { userId })
  }

  private toPublic(u: User): PublicUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = u
    return rest
  }
}

export const authService = new AuthService()
