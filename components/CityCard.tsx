import { City } from '@/types/city'
import { VoteType } from '@/types/user-preferences'
import LikeButtons from './LikeButtons'
import FilterTags from './FilterTags'

interface CityCardProps {
  city: City
  onVoteChange?: (cityId: string, vote: VoteType, newLikes: number, newDislikes: number) => void
}

export default function CityCard({ city, onVoteChange }: CityCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          {city.name}
        </h3>
        <LikeButtons
          cityId={city.id}
          initialLikes={city.likes}
          initialDislikes={city.dislikes}
          onVoteChange={onVoteChange}
        />
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {city.description}
      </p>

      <FilterTags city={city} />
    </div>
  )
}