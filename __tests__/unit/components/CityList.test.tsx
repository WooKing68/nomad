import { render, screen } from '@testing-library/react'
import CityList from '@/components/CityList'
import { City } from '@/types/city'

describe('CityList', () => {
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
  ]

  describe('렌더링 테스트', () => {
    it('전달받은 모든 도시가 렌더링됨', () => {
      render(<CityList cities={mockCities} />)

      expect(screen.getByText('서울')).toBeInTheDocument()
      expect(screen.getByText('부산')).toBeInTheDocument()
      expect(screen.getByText('제주')).toBeInTheDocument()
    })

    it('도시 개수만큼 카드가 생성됨', () => {
      render(<CityList cities={mockCities} />)

      const cityNames = ['서울', '부산', '제주']
      cityNames.forEach(name => {
        expect(screen.getByText(name)).toBeInTheDocument()
      })
    })
  })

  describe('빈 상태 테스트', () => {
    it('빈 배열이 전달되면 "필터 조건에 맞는 도시가 없습니다" 메시지 표시', () => {
      render(<CityList cities={[]} />)

      expect(screen.getByText('선택한 필터 조건에 맞는 도시가 없습니다')).toBeInTheDocument()
    })

    it('빈 상태에서 안내 텍스트가 포함됨', () => {
      render(<CityList cities={[]} />)

      expect(screen.getByText(/다른 필터 조건을 선택하거나 필터를 초기화해 보세요/)).toBeInTheDocument()
    })
  })

  describe('그리드 레이아웃 테스트', () => {
    it('grid 클래스가 적용됨', () => {
      const { container } = render(<CityList cities={mockCities} />)

      const gridElement = container.querySelector('.grid')
      expect(gridElement).toBeInTheDocument()
    })

    it('반응형 컬럼 클래스가 적용됨', () => {
      const { container } = render(<CityList cities={mockCities} />)

      const gridElement = container.querySelector('.grid')
      expect(gridElement).toHaveClass('md:grid-cols-2')
      expect(gridElement).toHaveClass('lg:grid-cols-3')
    })
  })
})
