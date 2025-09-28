'use client'

import { useState } from 'react'
import { FilterState } from '@/types/filter'
import BudgetFilter from './filters/BudgetFilter'
import RegionFilter from './filters/RegionFilter'
import EnvironmentFilter from './filters/EnvironmentFilter'
import SeasonFilter from './filters/SeasonFilter'

interface FilterSectionProps {
  onFilterChange?: (filters: FilterState) => void
  onFilterReset?: () => void
}

export default function FilterSection({ onFilterChange, onFilterReset }: FilterSectionProps) {
  const [filters, setFilters] = useState<FilterState>({
    budget: null,
    region: null,
    environment: null,
    season: null,
  })

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleReset = () => {
    const resetFilters = {
      budget: null,
      region: null,
      environment: null,
      season: null,
    }
    setFilters(resetFilters)
    onFilterChange?.(resetFilters)
    onFilterReset?.()
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">필터</h2>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          필터 초기화
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <BudgetFilter
          selected={filters.budget}
          onChange={(value) => handleFilterChange('budget', value)}
        />

        <RegionFilter
          selected={filters.region}
          onChange={(value) => handleFilterChange('region', value)}
        />

        <EnvironmentFilter
          selected={filters.environment}
          onChange={(value) => handleFilterChange('environment', value)}
        />

        <SeasonFilter
          selected={filters.season}
          onChange={(value) => handleFilterChange('season', value)}
        />
      </div>
    </div>
  )
}