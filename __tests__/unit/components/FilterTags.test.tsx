import { render, screen } from '@testing-library/react'
import FilterTags from '@/components/FilterTags'
import { City } from '@/types/city'

describe('FilterTags', () => {
  const mockCity: City = {
    id: '1',
    name: '서울',
    description: '수도',
    likes: 42,
    dislikes: 8,
    budget: '200만원',
    region: '수도권',
    environment: '코워킹 필수',
    season: '가을',
  }

  describe('렌더링 테스트', () => {
    it('예산 태그가 올바르게 렌더링됨', () => {
      render(<FilterTags city={mockCity} />)

      expect(screen.getByText('예산:')).toBeInTheDocument()
      expect(screen.getByText('200만원')).toBeInTheDocument()
    })

    it('지역 태그가 올바르게 렌더링됨', () => {
      render(<FilterTags city={mockCity} />)

      expect(screen.getByText('지역:')).toBeInTheDocument()
      expect(screen.getByText('수도권')).toBeInTheDocument()
    })

    it('환경 태그가 올바르게 렌더링됨', () => {
      render(<FilterTags city={mockCity} />)

      expect(screen.getByText('환경:')).toBeInTheDocument()
      expect(screen.getByText('코워킹 필수')).toBeInTheDocument()
    })

    it('계절 태그가 올바르게 렌더링됨', () => {
      render(<FilterTags city={mockCity} />)

      expect(screen.getByText('최고 계절:')).toBeInTheDocument()
      expect(screen.getByText('가을')).toBeInTheDocument()
    })
  })

  describe('스타일링 테스트', () => {
    it('예산 태그에 파란색 스타일이 적용됨', () => {
      render(<FilterTags city={mockCity} />)

      const budgetTag = screen.getByText('200만원')
      expect(budgetTag).toHaveClass('bg-blue-100', 'text-blue-800', 'border-blue-200')
    })

    it('지역 태그에 초록색 스타일이 적용됨', () => {
      render(<FilterTags city={mockCity} />)

      const regionTag = screen.getByText('수도권')
      expect(regionTag).toHaveClass('bg-green-100', 'text-green-800', 'border-green-200')
    })

    it('환경 태그에 보라색 스타일이 적용됨', () => {
      render(<FilterTags city={mockCity} />)

      const environmentTag = screen.getByText('코워킹 필수')
      expect(environmentTag).toHaveClass('bg-purple-100', 'text-purple-800', 'border-purple-200')
    })

    it('city prop이 변경되면 태그 내용이 업데이트됨', () => {
      const { rerender } = render(<FilterTags city={mockCity} />)

      expect(screen.getByText('200만원')).toBeInTheDocument()

      const updatedCity: City = {
        ...mockCity,
        budget: '100만원',
        region: '제주도',
      }

      rerender(<FilterTags city={updatedCity} />)

      expect(screen.getByText('100만원')).toBeInTheDocument()
      expect(screen.getByText('제주도')).toBeInTheDocument()
      expect(screen.queryByText('200만원')).not.toBeInTheDocument()
      expect(screen.queryByText('수도권')).not.toBeInTheDocument()
    })
  })
})
