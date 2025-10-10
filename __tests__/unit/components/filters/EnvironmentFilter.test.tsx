import { render, screen, fireEvent } from '@testing-library/react'
import EnvironmentFilter from '@/components/filters/EnvironmentFilter'
import { EnvironmentType } from '@/types/filter'

describe('EnvironmentFilter', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  describe('렌더링 테스트', () => {
    it('"환경" 제목이 렌더링됨', () => {
      render(<EnvironmentFilter selected={null} onChange={mockOnChange} />)

      expect(screen.getByText('환경')).toBeInTheDocument()
    })

    it('모든 환경 옵션이 렌더링됨', () => {
      render(<EnvironmentFilter selected={null} onChange={mockOnChange} />)

      expect(screen.getByText('자연친화')).toBeInTheDocument()
      expect(screen.getByText('도심선호')).toBeInTheDocument()
      expect(screen.getByText('카페작업')).toBeInTheDocument()
      expect(screen.getByText('코워킹 필수')).toBeInTheDocument()
    })

    it('옵션 개수가 4개임', () => {
      render(<EnvironmentFilter selected={null} onChange={mockOnChange} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(4)
    })
  })

  describe('선택 테스트', () => {
    it('옵션 클릭 시 선택 상태로 변경됨', () => {
      render(<EnvironmentFilter selected={null} onChange={mockOnChange} />)

      const option = screen.getByText('카페작업')
      fireEvent.click(option)

      expect(mockOnChange).toHaveBeenCalledWith('카페작업')
    })

    it('선택된 옵션에 보라색 스타일 적용', () => {
      render(<EnvironmentFilter selected={'카페작업'} onChange={mockOnChange} />)

      const selectedButton = screen.getByText('카페작업')
      expect(selectedButton).toHaveClass('bg-purple-100', 'text-purple-800', 'border-purple-300')
    })

    it('선택된 옵션을 다시 클릭하면 선택 해제됨', () => {
      render(<EnvironmentFilter selected={'카페작업'} onChange={mockOnChange} />)

      const option = screen.getByText('카페작업')
      fireEvent.click(option)

      expect(mockOnChange).toHaveBeenCalledWith(null)
    })
  })

  describe('콜백 테스트', () => {
    it('옵션 선택 시 onChange 콜백이 호출됨', () => {
      render(<EnvironmentFilter selected={null} onChange={mockOnChange} />)

      fireEvent.click(screen.getByText('자연친화'))
      expect(mockOnChange).toHaveBeenCalledWith('자연친화')
      expect(mockOnChange).toHaveBeenCalledTimes(1)
    })
  })
})
