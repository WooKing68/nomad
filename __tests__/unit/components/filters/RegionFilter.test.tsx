import { render, screen, fireEvent } from '@testing-library/react'
import RegionFilter from '@/components/filters/RegionFilter'
import { RegionType } from '@/types/filter'

describe('RegionFilter', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  describe('렌더링 테스트', () => {
    it('"지역" 제목이 렌더링됨', () => {
      render(<RegionFilter selected={null} onChange={mockOnChange} />)

      expect(screen.getByText('지역')).toBeInTheDocument()
    })

    it('모든 지역 옵션이 렌더링됨', () => {
      render(<RegionFilter selected={null} onChange={mockOnChange} />)

      expect(screen.getByText('전체')).toBeInTheDocument()
      expect(screen.getByText('수도권')).toBeInTheDocument()
      expect(screen.getByText('경상도')).toBeInTheDocument()
      expect(screen.getByText('전라도')).toBeInTheDocument()
      expect(screen.getByText('강원도')).toBeInTheDocument()
      expect(screen.getByText('제주도')).toBeInTheDocument()
      expect(screen.getByText('충청도')).toBeInTheDocument()
    })

    it('옵션 개수가 7개임', () => {
      render(<RegionFilter selected={null} onChange={mockOnChange} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(7)
    })
  })

  describe('선택 테스트', () => {
    it('옵션 클릭 시 선택 상태로 변경됨', () => {
      render(<RegionFilter selected={null} onChange={mockOnChange} />)

      const option = screen.getByText('수도권')
      fireEvent.click(option)

      expect(mockOnChange).toHaveBeenCalledWith('수도권')
    })

    it('선택된 옵션에 초록색 스타일 적용', () => {
      render(<RegionFilter selected={'수도권'} onChange={mockOnChange} />)

      const selectedButton = screen.getByText('수도권')
      expect(selectedButton).toHaveClass('bg-green-100', 'text-green-800', 'border-green-300')
    })

    it('선택된 옵션을 다시 클릭하면 선택 해제됨', () => {
      render(<RegionFilter selected={'수도권'} onChange={mockOnChange} />)

      const option = screen.getByText('수도권')
      fireEvent.click(option)

      expect(mockOnChange).toHaveBeenCalledWith(null)
    })

    it('"전체" 옵션도 다른 옵션과 동일하게 동작', () => {
      const { unmount } = render(<RegionFilter selected={null} onChange={mockOnChange} />)

      const buttons = screen.getAllByText('전체')
      fireEvent.click(buttons[0])
      expect(mockOnChange).toHaveBeenCalledWith('전체')

      mockOnChange.mockClear()
      unmount()

      render(<RegionFilter selected={'전체'} onChange={mockOnChange} />)
      const buttonsSelected = screen.getAllByText('전체')
      fireEvent.click(buttonsSelected[0])
      expect(mockOnChange).toHaveBeenCalledWith(null)
    })
  })

  describe('콜백 테스트', () => {
    it('옵션 선택 시 onChange 콜백이 호출됨', () => {
      render(<RegionFilter selected={null} onChange={mockOnChange} />)

      fireEvent.click(screen.getByText('경상도'))
      expect(mockOnChange).toHaveBeenCalledWith('경상도')
      expect(mockOnChange).toHaveBeenCalledTimes(1)
    })

    it('onChange에 올바른 값이 전달됨', () => {
      render(<RegionFilter selected={null} onChange={mockOnChange} />)

      fireEvent.click(screen.getByText('제주도'))
      expect(mockOnChange).toHaveBeenCalledWith('제주도')
    })
  })
})
