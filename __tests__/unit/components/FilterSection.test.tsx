import { render, screen, fireEvent } from '@testing-library/react'
import FilterSection from '@/components/FilterSection'
import { FilterState } from '@/types/filter'

describe('FilterSection', () => {
  const mockOnFilterChange = jest.fn()
  const mockOnFilterReset = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('렌더링 테스트', () => {
    it('"필터" 제목이 렌더링됨', () => {
      render(
        <FilterSection
          onFilterChange={mockOnFilterChange}
          onFilterReset={mockOnFilterReset}
        />
      )

      expect(screen.getByText('필터')).toBeInTheDocument()
    })

    it('"필터 초기화" 버튼이 렌더링됨', () => {
      render(
        <FilterSection
          onFilterChange={mockOnFilterChange}
          onFilterReset={mockOnFilterReset}
        />
      )

      expect(screen.getByText('필터 초기화')).toBeInTheDocument()
    })

    it('BudgetFilter 컴포넌트가 렌더링됨', () => {
      render(
        <FilterSection
          onFilterChange={mockOnFilterChange}
          onFilterReset={mockOnFilterReset}
        />
      )

      expect(screen.getByText('예산')).toBeInTheDocument()
    })

    it('RegionFilter 컴포넌트가 렌더링됨', () => {
      render(
        <FilterSection
          onFilterChange={mockOnFilterChange}
          onFilterReset={mockOnFilterReset}
        />
      )

      expect(screen.getByText('지역')).toBeInTheDocument()
    })

    it('EnvironmentFilter 컴포넌트가 렌더링됨', () => {
      render(
        <FilterSection
          onFilterChange={mockOnFilterChange}
          onFilterReset={mockOnFilterReset}
        />
      )

      expect(screen.getByText('환경')).toBeInTheDocument()
    })

    it('SeasonFilter 컴포넌트가 렌더링됨', () => {
      render(
        <FilterSection
          onFilterChange={mockOnFilterChange}
          onFilterReset={mockOnFilterReset}
        />
      )

      expect(screen.getByText('최고 계절')).toBeInTheDocument()
    })
  })


  describe('필터 변경 테스트', () => {
    it('예산 필터 변경 시 onFilterChange 콜백이 호출됨', () => {
      render(
        <FilterSection
          onFilterChange={mockOnFilterChange}
          onFilterReset={mockOnFilterReset}
        />
      )

      fireEvent.click(screen.getByText('100만원'))

      expect(mockOnFilterChange).toHaveBeenCalledWith({
        budget: '100만원',
        region: null,
        environment: null,
        season: null,
      })
    })

    it('지역 필터 변경 시 onFilterChange 콜백이 호출됨', () => {
      render(
        <FilterSection
          onFilterChange={mockOnFilterChange}
          onFilterReset={mockOnFilterReset}
        />
      )

      fireEvent.click(screen.getByText('수도권'))

      expect(mockOnFilterChange).toHaveBeenCalledWith({
        budget: null,
        region: '수도권',
        environment: null,
        season: null,
      })
    })

    it('환경 필터 변경 시 onFilterChange 콜백이 호출됨', () => {
      render(
        <FilterSection
          onFilterChange={mockOnFilterChange}
          onFilterReset={mockOnFilterReset}
        />
      )

      // 먼저 필터를 설정
      fireEvent.click(screen.getByText('100만원'))
      fireEvent.click(screen.getByText('수도권'))

      // 초기화 버튼 클릭
      fireEvent.click(screen.getByText('필터 초기화'))

      expect(mockOnFilterChange).toHaveBeenCalledWith({
        budget: null,
        region: null,
        environment: null,
        season: null,
      })
    })

    it('초기화 시 onFilterChange 콜백이 호출됨', () => {
      render(
        <FilterSection
          onFilterChange={mockOnFilterChange}
          onFilterReset={mockOnFilterReset}
        />
      )

      fireEvent.click(screen.getByText('필터 초기화'))

      expect(mockOnFilterChange).toHaveBeenCalled()
    })

    it('초기화 시 onFilterReset 콜백이 호출됨', () => {
      render(
        <FilterSection
          onFilterChange={mockOnFilterChange}
          onFilterReset={mockOnFilterReset}
        />
      )

      fireEvent.click(screen.getByText('필터 초기화'))

      expect(mockOnFilterReset).toHaveBeenCalled()
    })
  })


  describe('다중 필터 테스트', () => {
    it('여러 필터를 연속으로 선택했을 때 모두 저장됨', () => {
      render(
        <FilterSection
          onFilterChange={mockOnFilterChange}
          onFilterReset={mockOnFilterReset}
        />
      )

      fireEvent.click(screen.getByText('100만원'))
      fireEvent.click(screen.getByText('수도권'))
      fireEvent.click(screen.getByText('카페작업'))

      expect(mockOnFilterChange).toHaveBeenLastCalledWith({
        budget: '100만원',
        region: '수도권',
        environment: '카페작업',
        season: null,
      })
    })

    it('필터를 선택하고 다시 해제했을 때 null로 변경됨', () => {
      render(
        <FilterSection
          onFilterChange={mockOnFilterChange}
          onFilterReset={mockOnFilterReset}
        />
      )

      fireEvent.click(screen.getByText('100만원'))
      fireEvent.click(screen.getByText('100만원')) // 다시 클릭하여 해제

      expect(mockOnFilterChange).toHaveBeenLastCalledWith({
        budget: null,
        region: null,
        environment: null,
        season: null,
      })
    })
  })
})
