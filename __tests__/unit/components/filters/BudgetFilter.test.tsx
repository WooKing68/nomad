import { render, screen, fireEvent } from '@testing-library/react'
import BudgetFilter from '@/components/filters/BudgetFilter'
import { BudgetType } from '@/types/filter'

describe('BudgetFilter', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  describe('렌더링 테스트', () => {
    it('"예산" 제목이 렌더링됨', () => {
      render(<BudgetFilter selected={null} onChange={mockOnChange} />)

      expect(screen.getByText('예산')).toBeInTheDocument()
    })

    it('모든 예산 옵션이 렌더링됨', () => {
      render(<BudgetFilter selected={null} onChange={mockOnChange} />)

      expect(screen.getByText('100만원')).toBeInTheDocument()
      expect(screen.getByText('100~200만원')).toBeInTheDocument()
      expect(screen.getByText('200만원')).toBeInTheDocument()
    })

    it('옵션 개수가 3개임', () => {
      render(<BudgetFilter selected={null} onChange={mockOnChange} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(3)
    })
  })

  describe('선택 테스트', () => {
    it('옵션 클릭 시 onChange 콜백이 호출됨', () => {
      render(<BudgetFilter selected={null} onChange={mockOnChange} />)

      const option = screen.getByText('100만원')
      fireEvent.click(option)

      expect(mockOnChange).toHaveBeenCalledWith('100만원')
      expect(mockOnChange).toHaveBeenCalledTimes(1)
    })

    it('선택된 옵션에 파란색 스타일 적용', () => {
      render(<BudgetFilter selected={'100만원'} onChange={mockOnChange} />)

      const selectedButton = screen.getByText('100만원')
      expect(selectedButton).toHaveClass('bg-blue-100', 'text-blue-800', 'border-blue-300')
    })

    it('선택되지 않은 옵션은 회색 스타일 유지', () => {
      render(<BudgetFilter selected={'100만원'} onChange={mockOnChange} />)

      const unselectedButton = screen.getByText('200만원')
      expect(unselectedButton).toHaveClass('bg-gray-50', 'text-gray-700')
    })

    it('선택된 옵션을 다시 클릭하면 선택 해제됨', () => {
      render(<BudgetFilter selected={'100만원'} onChange={mockOnChange} />)

      const option = screen.getByText('100만원')
      fireEvent.click(option)

      expect(mockOnChange).toHaveBeenCalledWith(null)
    })

    it('다른 옵션 클릭 시 이전 선택이 해제됨', () => {
      const { rerender } = render(<BudgetFilter selected={'100만원'} onChange={mockOnChange} />)

      const newOption = screen.getByText('200만원')
      fireEvent.click(newOption)

      expect(mockOnChange).toHaveBeenCalledWith('200만원')
    })
  })

  describe('콜백 테스트', () => {
    it('onChange에 올바른 값이 전달됨', () => {
      render(<BudgetFilter selected={null} onChange={mockOnChange} />)

      fireEvent.click(screen.getByText('100~200만원'))
      expect(mockOnChange).toHaveBeenCalledWith('100~200만원')
    })

    it('선택 해제 시 onChange에 null이 전달됨', () => {
      render(<BudgetFilter selected={'100만원'} onChange={mockOnChange} />)

      fireEvent.click(screen.getByText('100만원'))
      expect(mockOnChange).toHaveBeenCalledWith(null)
    })
  })
})
