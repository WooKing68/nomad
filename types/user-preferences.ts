export type VoteType = 'like' | 'dislike' | null

export interface UserVote {
  cityId: string
  vote: VoteType
}

export interface UserPreferences {
  votes: Record<string, VoteType>
}