import { City } from '@/types/city'

interface FilterTagsProps {
  city: City
}

export default function FilterTags({ city }: FilterTagsProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-600">예산:</span>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200">
          {city.budget}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-600">지역:</span>
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full border border-green-200">
          {city.region}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-600">환경:</span>
        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full border border-purple-200">
          {city.environment}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-600">최고 계절:</span>
        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full border border-orange-200">
          {city.season}
        </span>
      </div>
    </div>
  )
}