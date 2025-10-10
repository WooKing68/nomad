import { render, screen, fireEvent } from '@testing-library/react'
import SeasonFilter from '@/components/filters/SeasonFilter'
import { SeasonType } from '@/types/filter'

describe('SeasonFilter', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  describe('렌더링 테스트', () => {
    it('"최고 계절" 제목이 렌더링됨', () => {
      render(<SeasonFilter selected={null} onChange={mockOnChange} />)

      expect(screen.getByText('최고 계절')).toBeInTheDocument()
    })

    it('모든 계절 옵션이 렌더링됨', () => {
      render(<SeasonFilter selected={null} onChange={mockOnChange} />)

      expect(screen.getByText('봄')).toBeInTheDocument()
      expect(screen.getByText('여름')).toBeInTheDocument()
      expect(screen.getByText('가을')).toBeInTheDocument()
      expect(screen.getByText('겨울')).toBeInTheDocument()
    })

    it('옵션 개수가 4개임', () => {
      render(<SeasonFilter selected={null} onChange={mockOnChange} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(4)
    })
  })

  describe('선택 테스트', () => {
    it('옵션 클릭 시 선택 상태로 변경됨', () => {
      render(<SeasonFilter selected={null} onChange={mockOnChange} />)

      const option = screen.getByText('가을')
      fireEvent.click(option)

      expect(mockOnChange).toHaveBeenCalledWith('가을')
    })

    it('선택된 옵션에 주황색 스타일 적용', () => {
      render(<SeasonFilter selected={'가을'} onChange={mockOnChange} />)

      const selectedButton = screen.getByText('가을')
      expect(selectedButton).toHaveClass('bg-orange-100', 'text-orange-800', 'border-orange-300')
    })

    it('선택된 옵션을 다시 클릭하면 선택 해제됨', () => {
      render(<SeasonFilter selected={'가을'} onChange={mockOnChange} />)

      const option = screen.getByText('가을')
      fireEvent.click(option)

      expect(mockOnChange).toHaveBeenCalledWith(null)
    })
  })

  describe('콜백 테스트', () => {
    it('옵션 선택 시 onChange 콜백이 호출됨', () => {
      render(<SeasonFilter selected={null} onChange={mockOnChange} />)

      fireEvent.click(screen.getByText('봄'))
      expect(mockOnChange).toHaveBeenCalledWith('봄')
      expect(mockOnChange).toHaveBeenCalledTimes(1)
    })
  })
})
