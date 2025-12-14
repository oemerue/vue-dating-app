export class StorageService {
  static read<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return fallback
      return JSON.parse(raw) as T
    } catch {
      return fallback
    }
  }

  static write<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  static remove(key: string): void {
    localStorage.removeItem(key)
  }
}
