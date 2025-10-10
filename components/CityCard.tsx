import { City } from '@/types/city'
import { VoteType } from '@/types/user-preferences'
import { useRouter } from 'next/navigation'
import LikeButtons from './LikeButtons'
import FilterTags from './FilterTags'

interface CityCardProps {
  city: City
  onVoteChange?: (cityId: string, vote: VoteType, newLikes: number, newDislikes: number) => void
}

export default function CityCard({ city, onVoteChange }: CityCardProps) {
  const router = useRouter()

  const handleCardClick = (e: React.MouseEvent) => {
    // LikeButtons 영역 클릭 시에는 페이지 이동하지 않음
    const target = e.target as HTMLElement
    if (target.closest('[data-like-buttons]')) {
      return
    }

    router.push(`/city/${city.id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
          {city.name}
        </h3>
        <div data-like-buttons>
          <LikeButtons
            cityId={city.id}
            initialLikes={city.likes}
            initialDislikes={city.dislikes}
            onVoteChange={onVoteChange}
          />
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {city.description}
      </p>

      <FilterTags city={city} />
    </div>
  )
}