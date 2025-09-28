'use client'

import { useState, useMemo } from 'react'
import CityList from '@/components/CityList'
import FilterSection from '@/components/FilterSection'
import { cities } from '@/data/cities'
import { FilterState } from '@/types/filter'
import { filterAndSortCities } from '@/utils/cityFilters'

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    budget: null,
    region: null,
    environment: null,
    season: null,
  })

  const filteredAndSortedCities = useMemo(() => {
    return filterAndSortCities(cities, filters)
  }, [filters])

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  const handleFilterReset = () => {
    setFilters({
      budget: null,
      region: null,
      environment: null,
      season: null,
    })
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            도시 리스트
          </h1>
          <div className="flex gap-4">
            <a
              href="/login"
              className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              로그인
            </a>
            <a
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              회원가입
            </a>
          </div>
        </div>

        <FilterSection
          onFilterChange={handleFilterChange}
          onFilterReset={handleFilterReset}
        />

        <CityList cities={filteredAndSortedCities} />
      </div>
    </main>
  )
}