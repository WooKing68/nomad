import {
  getUserPreferences,
  saveUserPreferences,
  getUserVote,
  setUserVote,
} from '@/utils/localStorage'
import { UserPreferences, VoteType } from '@/types/user-preferences'

describe('localStorage utilities', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  describe('getUserPreferences', () => {
    it('should return preferences when localStorage has data', () => {
      const mockPreferences: UserPreferences = {
        votes: {
          '1': 'like',
          '2': 'dislike',
        },
      }
      localStorage.setItem('k-nomad-user-preferences', JSON.stringify(mockPreferences))

      const result = getUserPreferences()

      expect(result).toEqual(mockPreferences)
      expect(result.votes['1']).toBe('like')
      expect(result.votes['2']).toBe('dislike')
    })

    it('should return default value when localStorage is empty', () => {
      const result = getUserPreferences()

      expect(result).toEqual({ votes: {} })
      expect(Object.keys(result.votes)).toHaveLength(0)
    })

    it('should return default value when localStorage has invalid JSON', () => {
      localStorage.setItem('k-nomad-user-preferences', 'invalid json')

      const result = getUserPreferences()

      expect(result).toEqual({ votes: {} })
    })

    it('should return default value when localStorage throws error', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('localStorage is disabled')
      })

      const result = getUserPreferences()

      expect(result).toEqual({ votes: {} })
    })
  })

  describe('saveUserPreferences', () => {
    it('should save valid preferences to localStorage', () => {
      const preferences: UserPreferences = {
        votes: {
          '1': 'like',
          '3': 'dislike',
        },
      }

      saveUserPreferences(preferences)

      const stored = localStorage.getItem('k-nomad-user-preferences')
      expect(stored).not.toBeNull()
      expect(JSON.parse(stored!)).toEqual(preferences)
    })

    it('should overwrite existing data', () => {
      const oldPreferences: UserPreferences = { votes: { '1': 'like' } }
      const newPreferences: UserPreferences = { votes: { '2': 'dislike' } }

      saveUserPreferences(oldPreferences)
      saveUserPreferences(newPreferences)

      const result = getUserPreferences()
      expect(result).toEqual(newPreferences)
      expect(result.votes['1']).toBeUndefined()
    })

    it('should not throw error when localStorage fails', () => {
      jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Storage full')
      })

      const preferences: UserPreferences = { votes: { '1': 'like' } }

      expect(() => saveUserPreferences(preferences)).not.toThrow()
    })
  })

  describe('getUserVote', () => {
    it('should return like when user voted like', () => {
      const preferences: UserPreferences = {
        votes: { '1': 'like' },
      }
      saveUserPreferences(preferences)

      const result = getUserVote('1')

      expect(result).toBe('like')
    })

    it('should return dislike when user voted dislike', () => {
      const preferences: UserPreferences = {
        votes: { '2': 'dislike' },
      }
      saveUserPreferences(preferences)

      const result = getUserVote('2')

      expect(result).toBe('dislike')
    })

    it('should return null when no vote exists', () => {
      const result = getUserVote('999')

      expect(result).toBeNull()
    })

    it('should return null for empty preferences', () => {
      const result = getUserVote('1')

      expect(result).toBeNull()
    })
  })

  describe('setUserVote', () => {
    it('should save new like vote', () => {
      setUserVote('1', 'like')

      const result = getUserVote('1')
      expect(result).toBe('like')
    })

    it('should save new dislike vote', () => {
      setUserVote('2', 'dislike')

      const result = getUserVote('2')
      expect(result).toBe('dislike')
    })

    it('should change like to dislike', () => {
      setUserVote('1', 'like')
      setUserVote('1', 'dislike')

      const result = getUserVote('1')
      expect(result).toBe('dislike')
    })

    it('should change dislike to like', () => {
      setUserVote('1', 'dislike')
      setUserVote('1', 'like')

      const result = getUserVote('1')
      expect(result).toBe('like')
    })

    it('should delete vote when value is null', () => {
      setUserVote('1', 'like')
      expect(getUserVote('1')).toBe('like')

      setUserVote('1', null)
      expect(getUserVote('1')).toBeNull()
    })

    it('should manage multiple city votes independently', () => {
      setUserVote('1', 'like')
      setUserVote('2', 'dislike')
      setUserVote('3', 'like')

      expect(getUserVote('1')).toBe('like')
      expect(getUserVote('2')).toBe('dislike')
      expect(getUserVote('3')).toBe('like')
    })
  })
})
