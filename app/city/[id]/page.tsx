'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { City } from '@/types/city'
import { VoteType } from '@/types/user-preferences'
import { cities } from '@/data/cities'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import LikeButtons from '@/components/LikeButtons'

export default function CityDetailPage() {
  const params = useParams()
  const cityId = params.id as string
  const [city, setCity] = useState<City | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundCity = cities.find(c => c.id === cityId)
    setCity(foundCity || null)
    setLoading(false)
  }, [cityId])

  const handleVoteChange = (cityId: string, vote: VoteType, newLikes: number, newDislikes: number) => {
    if (city && city.id === cityId) {
      setCity({
        ...city,
        likes: newLikes,
        dislikes: newDislikes
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600">
          도시 정보를 불러오는 중...
        </div>
      </div>
    )
  }

  if (!city) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            도시를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-8">
            요청하신 도시 정보가 존재하지 않습니다.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            메인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            도시 목록으로 돌아가기
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Basic City Information */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* City Image Placeholder */}
            <div className="w-full md:w-1/3">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-lg">
                  {city.name} 이미지
                </span>
              </div>
            </div>

            {/* City Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {city.name}
              </h1>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {city.description}
              </p>

              {/* Tags */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium">예산</div>
                  <div className="text-blue-900 font-semibold">{city.budget}</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-sm text-green-600 font-medium">지역</div>
                  <div className="text-green-900 font-semibold">{city.region}</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-sm text-purple-600 font-medium">환경</div>
                  <div className="text-purple-900 font-semibold">{city.environment}</div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="text-sm text-orange-600 font-medium">계절</div>
                  <div className="text-orange-900 font-semibold">{city.season}</div>
                </div>
              </div>

              {/* Like/Dislike Interactive Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <LikeButtons
                  cityId={city.id}
                  initialLikes={city.likes}
                  initialDislikes={city.dislikes}
                  onVoteChange={handleVoteChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder for future sections */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            상세 정보
          </h2>
          <p className="text-gray-600">
            추가 상세 정보가 곧 업데이트될 예정입니다.
          </p>
        </div>
      </div>
    </div>
  )
}