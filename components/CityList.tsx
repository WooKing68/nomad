'use client'

import { useState } from 'react'
import { City } from '@/types/city'
import { VoteType } from '@/types/user-preferences'
import CityCard from './CityCard'

interface CityListProps {
  cities: City[]
}

export default function CityList({ cities: initialCities }: CityListProps) {
  const [cities, setCities] = useState(initialCities)

  const handleVoteChange = (cityId: string, vote: VoteType, newLikes: number, newDislikes: number) => {
    setCities(prevCities =>
      prevCities.map(city =>
        city.id === cityId
          ? { ...city, likes: newLikes, dislikes: newDislikes }
          : city
      )
    )
  }

  if (cities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-gray-500 text-lg mb-2">
          선택한 필터 조건에 맞는 도시가 없습니다
        </div>
        <div className="text-gray-400 text-sm">
          다른 필터 조건을 선택하거나 필터를 초기화해 보세요
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cities.map((city) => (
        <CityCard
          key={city.id}
          city={city}
          onVoteChange={handleVoteChange}
        />
      ))}
    </div>
  )
}