import { UserPreferences, VoteType } from '@/types/user-preferences'

const STORAGE_KEY = 'k-nomad-user-preferences'

export function getUserPreferences(): UserPreferences {
  if (typeof window === 'undefined') {
    return { votes: {} }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return { votes: {} }
    }
    return JSON.parse(stored)
  } catch {
    return { votes: {} }
  }
}

export function saveUserPreferences(preferences: UserPreferences): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
  } catch {
    // 로컬 스토리지 저장 실패 시 무시
  }
}

export function getUserVote(cityId: string): VoteType {
  const preferences = getUserPreferences()
  return preferences.votes[cityId] || null
}

export function setUserVote(cityId: string, vote: VoteType): void {
  const preferences = getUserPreferences()

  if (vote === null) {
    delete preferences.votes[cityId]
  } else {
    preferences.votes[cityId] = vote
  }

  saveUserPreferences(preferences)
}