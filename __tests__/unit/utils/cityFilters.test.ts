import { filterCities, sortCitiesByLikes, filterAndSortCities } from '@/utils/cityFilters'
import { City } from '@/types/city'
import { FilterState } from '@/types/filter'

describe('cityFilters', () => {
  const mockCities: City[] = [
    {
      id: '1',
      name: '서울',
      description: '수도',
      likes: 42,
      dislikes: 8,
      budget: '200만원',
      region: '수도권',
      environment: '코워킹 필수',
      season: '가을',
    },
    {
      id: '2',
      name: '부산',
      description: '항구도시',
      likes: 35,
      dislikes: 6,
      budget: '100~200만원',
      region: '경상도',
      environment: '카페작업',
      season: '여름',
    },
    {
      id: '3',
      name: '제주',
      description: '섬',
      likes: 58,
      dislikes: 3,
      budget: '100~200만원',
      region: '제주도',
      environment: '자연친화',
      season: '봄',
    },
    {
      id: '4',
      name: '대구',
      description: '내륙도시',
      likes: 27,
      dislikes: 12,
      budget: '100만원',
      region: '경상도',
      environment: '도심선호',
      season: '가을',
    },
    {
      id: '5',
      name: '광주',
      description: '예술도시',
      likes: 31,
      dislikes: 9,
      budget: '100만원',
      region: '전라도',
      environment: '카페작업',
      season: '봄',
    },
  ]

  describe('filterCities', () => {
    describe('단일 필터 테스트', () => {
      it('예산 필터만 적용했을 때 올바르게 필터링됨', () => {
        const filters: FilterState = {
          budget: '100만원',
          region: null,
          environment: null,
          season: null,
        }

        const result = filterCities(mockCities, filters)

        expect(result).toHaveLength(2)
        expect(result[0].name).toBe('대구')
        expect(result[1].name).toBe('광주')
        result.forEach(city => expect(city.budget).toBe('100만원'))
      })

      it('지역 필터만 적용했을 때 올바르게 필터링됨', () => {
        const filters: FilterState = {
          budget: null,
          region: '경상도',
          environment: null,
          season: null,
        }

        const result = filterCities(mockCities, filters)

        expect(result).toHaveLength(2)
        expect(result[0].name).toBe('부산')
        expect(result[1].name).toBe('대구')
        result.forEach(city => expect(city.region).toBe('경상도'))
      })

      it('환경 필터만 적용했을 때 올바르게 필터링됨', () => {
        const filters: FilterState = {
          budget: null,
          region: null,
          environment: '카페작업',
          season: null,
        }

        const result = filterCities(mockCities, filters)

        expect(result).toHaveLength(2)
        expect(result[0].name).toBe('부산')
        expect(result[1].name).toBe('광주')
        result.forEach(city => expect(city.environment).toBe('카페작업'))
      })

      it('계절 필터만 적용했을 때 올바르게 필터링됨', () => {
        const filters: FilterState = {
          budget: null,
          region: null,
          environment: null,
          season: '가을',
        }

        const result = filterCities(mockCities, filters)

        expect(result).toHaveLength(2)
        expect(result[0].name).toBe('서울')
        expect(result[1].name).toBe('대구')
        result.forEach(city => expect(city.season).toBe('가을'))
      })
    })

    describe('다중 필터 테스트 (AND 조건)', () => {
      it('예산 + 지역 필터를 함께 적용했을 때', () => {
        const filters: FilterState = {
          budget: '100만원',
          region: '경상도',
          environment: null,
          season: null,
        }

        const result = filterCities(mockCities, filters)

        expect(result).toHaveLength(1)
        expect(result[0].name).toBe('대구')
        expect(result[0].budget).toBe('100만원')
        expect(result[0].region).toBe('경상도')
      })

      it('예산 + 환경 필터를 함께 적용했을 때', () => {
        const filters: FilterState = {
          budget: '100만원',
          region: null,
          environment: '카페작업',
          season: null,
        }

        const result = filterCities(mockCities, filters)

        expect(result).toHaveLength(1)
        expect(result[0].name).toBe('광주')
      })

      it('지역 + 환경 필터를 함께 적용했을 때', () => {
        const filters: FilterState = {
          budget: null,
          region: '경상도',
          environment: '카페작업',
          season: null,
        }

        const result = filterCities(mockCities, filters)

        expect(result).toHaveLength(1)
        expect(result[0].name).toBe('부산')
      })

      it('4개 필터 모두 적용했을 때', () => {
        const filters: FilterState = {
          budget: '100만원',
          region: '전라도',
          environment: '카페작업',
          season: '봄',
        }

        const result = filterCities(mockCities, filters)

        expect(result).toHaveLength(1)
        expect(result[0].name).toBe('광주')
        expect(result[0].budget).toBe('100만원')
        expect(result[0].region).toBe('전라도')
        expect(result[0].environment).toBe('카페작업')
        expect(result[0].season).toBe('봄')
      })
    })

    describe('엣지 케이스', () => {
      it('필터가 모두 null일 때 모든 도시를 반환', () => {
        const filters: FilterState = {
          budget: null,
          region: null,
          environment: null,
          season: null,
        }

        const result = filterCities(mockCities, filters)

        expect(result).toHaveLength(mockCities.length)
        expect(result).toEqual(mockCities)
      })

      it('빈 배열에 필터를 적용했을 때 빈 배열 반환', () => {
        const filters: FilterState = {
          budget: '100만원',
          region: null,
          environment: null,
          season: null,
        }

        const result = filterCities([], filters)

        expect(result).toEqual([])
        expect(result).toHaveLength(0)
      })

      it('필터 조건에 맞는 도시가 없을 때 빈 배열 반환', () => {
        const filters: FilterState = {
          budget: '200만원',
          region: '제주도',
          environment: '코워킹 필수',
          season: '여름',
        }

        const result = filterCities(mockCities, filters)

        expect(result).toEqual([])
        expect(result).toHaveLength(0)
      })
    })
  })

  describe('sortCitiesByLikes', () => {
    it('좋아요 수가 높은 순서대로 정렬됨', () => {
      const result = sortCitiesByLikes(mockCities)

      expect(result[0].name).toBe('제주') // 58
      expect(result[1].name).toBe('서울') // 42
      expect(result[2].name).toBe('부산') // 35
      expect(result[3].name).toBe('광주') // 31
      expect(result[4].name).toBe('대구') // 27
      expect(result).toHaveLength(5)
    })

    it('모든 도시의 좋아요가 동일할 때 순서 유지', () => {
      const sameLikesCities: City[] = mockCities.map((city, index) => ({
        ...city,
        id: `${index}`,
        likes: 10,
      }))

      const result = sortCitiesByLikes(sameLikesCities)

      result.forEach((city, index) => {
        expect(city.id).toBe(sameLikesCities[index].id)
      })
    })

    it('빈 배열을 정렬했을 때 빈 배열 반환', () => {
      const result = sortCitiesByLikes([])

      expect(result).toEqual([])
      expect(result).toHaveLength(0)
    })

    it('도시가 1개만 있을 때 그대로 반환', () => {
      const singleCity = [mockCities[0]]
      const result = sortCitiesByLikes(singleCity)

      expect(result).toEqual(singleCity)
      expect(result).toHaveLength(1)
    })

    it('원본 배열을 변경하지 않음 (불변성 유지)', () => {
      const original = [...mockCities]
      const result = sortCitiesByLikes(mockCities)

      expect(mockCities).toEqual(original)
      expect(result).not.toBe(mockCities)
    })
  })

  describe('filterAndSortCities', () => {
    it('필터링 후 좋아요 순으로 정렬됨', () => {
      const filters: FilterState = {
        budget: null,
        region: '경상도',
        environment: null,
        season: null,
      }

      const result = filterAndSortCities(mockCities, filters)

      expect(result).toHaveLength(2)
      expect(result[0].name).toBe('부산') // 35 likes
      expect(result[1].name).toBe('대구') // 27 likes
    })

    it('필터가 없을 때 전체 도시를 좋아요 순으로 정렬', () => {
      const filters: FilterState = {
        budget: null,
        region: null,
        environment: null,
        season: null,
      }

      const result = filterAndSortCities(mockCities, filters)

      expect(result).toHaveLength(5)
      expect(result[0].likes).toBeGreaterThanOrEqual(result[1].likes)
      expect(result[1].likes).toBeGreaterThanOrEqual(result[2].likes)
    })

    it('필터 결과가 없을 때 빈 배열 반환', () => {
      const filters: FilterState = {
        budget: '200만원',
        region: '제주도',
        environment: null,
        season: null,
      }

      const result = filterAndSortCities(mockCities, filters)

      expect(result).toEqual([])
    })

    it('원본 배열을 변경하지 않음', () => {
      const original = [...mockCities]
      const filters: FilterState = {
        budget: null,
        region: null,
        environment: null,
        season: null,
      }

      const result = filterAndSortCities(mockCities, filters)

      expect(mockCities).toEqual(original)
      expect(result).not.toBe(mockCities)
    })
  })
})
