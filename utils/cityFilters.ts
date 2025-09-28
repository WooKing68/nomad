import { City } from '@/types/city'
import { FilterState } from '@/types/filter'

export function filterCities(cities: City[], filters: FilterState): City[] {
  return cities.filter(city => {
    if (filters.budget && city.budget !== filters.budget) {
      return false
    }

    if (filters.region && city.region !== filters.region) {
      return false
    }

    if (filters.environment && city.environment !== filters.environment) {
      return false
    }

    if (filters.season && city.season !== filters.season) {
      return false
    }

    return true
  })
}

export function sortCitiesByLikes(cities: City[]): City[] {
  return [...cities].sort((a, b) => b.likes - a.likes)
}

export function filterAndSortCities(cities: City[], filters: FilterState): City[] {
  const filtered = filterCities(cities, filters)
  return sortCitiesByLikes(filtered)
}