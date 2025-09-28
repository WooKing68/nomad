'use client'

import { useState, useEffect } from 'react'
import { Heart, HeartOff } from 'lucide-react'
import { VoteType } from '@/types/user-preferences'
import { getUserVote, setUserVote } from '@/utils/localStorage'

interface LikeButtonsProps {
  cityId: string
  initialLikes: number
  initialDislikes: number
  onVoteChange?: (cityId: string, vote: VoteType, newLikes: number, newDislikes: number) => void
}

export default function LikeButtons({
  cityId,
  initialLikes,
  initialDislikes,
  onVoteChange
}: LikeButtonsProps) {
  const [userVote, setUserVoteState] = useState<VoteType>(null)
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const vote = getUserVote(cityId)
    setUserVoteState(vote)
  }, [cityId])

  const handleVote = (voteType: VoteType) => {
    let newVote: VoteType = voteType
    let newLikes = likes
    let newDislikes = dislikes

    // 현재 투표 상태에 따른 로직
    if (userVote === voteType) {
      // 같은 버튼을 다시 클릭하면 취소
      newVote = null
      if (voteType === 'like') {
        newLikes = likes - 1
      } else {
        newDislikes = dislikes - 1
      }
    } else {
      // 다른 버튼을 클릭하거나 처음 클릭
      if (userVote === 'like' && voteType === 'dislike') {
        // 좋아요에서 싫어요로 변경
        newLikes = likes - 1
        newDislikes = dislikes + 1
      } else if (userVote === 'dislike' && voteType === 'like') {
        // 싫어요에서 좋아요로 변경
        newLikes = likes + 1
        newDislikes = dislikes - 1
      } else if (userVote === null) {
        // 처음 투표
        if (voteType === 'like') {
          newLikes = likes + 1
        } else {
          newDislikes = dislikes + 1
        }
      }
    }

    setUserVoteState(newVote)
    setLikes(newLikes)
    setDislikes(newDislikes)
    setUserVote(cityId, newVote)

    onVoteChange?.(cityId, newVote, newLikes, newDislikes)
  }

  if (!isClient) {
    return (
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-gray-500 hover:bg-gray-50 hover:text-red-500"
        >
          <Heart className="w-5 h-5" />
          <span className="text-sm font-medium">{likes}</span>
        </button>

        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-gray-500 hover:bg-gray-50 hover:text-gray-700"
        >
          <HeartOff className="w-5 h-5" />
          <span className="text-sm font-medium">{dislikes}</span>
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
      <button
        onClick={() => handleVote('like')}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          userVote === 'like'
            ? 'bg-red-50 text-red-600'
            : 'text-gray-500 hover:bg-gray-50 hover:text-red-500'
        }`}
      >
        <Heart
          className={`w-5 h-5 ${userVote === 'like' ? 'fill-current' : ''}`}
        />
        <span className="text-sm font-medium">{likes}</span>
      </button>

      <button
        onClick={() => handleVote('dislike')}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          userVote === 'dislike'
            ? 'bg-gray-100 text-gray-700'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
        }`}
      >
        <HeartOff className="w-5 h-5" />
        <span className="text-sm font-medium">{dislikes}</span>
      </button>
    </div>
  )
}