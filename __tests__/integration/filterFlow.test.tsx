import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import Home from '@/app/page'

describe('Filter Flow Integration', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should update city list when filter is selected', async () => {
    const { container } = render(<Home />)

    // Initial state: all cities shown
    expect(screen.getByText('서울')).toBeInTheDocument()
    expect(screen.getByText('부산')).toBeInTheDocument()
    expect(screen.getByText('제주')).toBeInTheDocument()

    // Find filter section and click budget filter
    const filterSection = container.querySelector('.bg-white.rounded-lg.shadow-md')
    const budgetButton = within(filterSection as HTMLElement).getAllByText('100만원')[0]
    fireEvent.click(budgetButton)

    // Filtered results shown
    await waitFor(() => {
      expect(screen.getByText('대구')).toBeInTheDocument()
      expect(screen.getByText('광주')).toBeInTheDocument()
      expect(screen.queryByText('서울')).not.toBeInTheDocument()
    })
  })

  it('should apply multiple filters with AND logic', async () => {
    const { container } = render(<Home />)

    const filterSection = container.querySelector('.bg-white.rounded-lg.shadow-md')

    // Select budget filter
    const budgetButton = within(filterSection as HTMLElement).getAllByText('100만원')[0]
    fireEvent.click(budgetButton)

    // Select region filter
    const regionButton = within(filterSection as HTMLElement).getByText('경상도')
    fireEvent.click(regionButton)

    // Only cities matching both conditions
    await waitFor(() => {
      expect(screen.getByText('대구')).toBeInTheDocument()
      expect(screen.queryByText('광주')).not.toBeInTheDocument()
      expect(screen.queryByText('부산')).not.toBeInTheDocument()
    })
  })

  it('should reset filters and show all cities', async () => {
    const { container } = render(<Home />)

    const filterSection = container.querySelector('.bg-white.rounded-lg.shadow-md')

    // Select filter
    const budgetButton = within(filterSection as HTMLElement).getAllByText('100만원')[0]
    fireEvent.click(budgetButton)

    // Reset
    fireEvent.click(screen.getByText('필터 초기화'))

    // All cities shown again
    await waitFor(() => {
      expect(screen.getByText('서울')).toBeInTheDocument()
      expect(screen.getByText('부산')).toBeInTheDocument()
      expect(screen.getByText('제주')).toBeInTheDocument()
    })
  })

  it('should show empty message when no cities match', async () => {
    const { container } = render(<Home />)

    const filterSection = container.querySelector('.bg-white.rounded-lg.shadow-md')

    // Select contradictory filters
    const budgetButton = within(filterSection as HTMLElement).getAllByText('200만원')[0]
    fireEvent.click(budgetButton)
    
    const regionButton = within(filterSection as HTMLElement).getByText('제주도')
    fireEvent.click(regionButton)

    // Empty state message shown
    await waitFor(() => {
      expect(screen.getByText('선택한 필터 조건에 맞는 도시가 없습니다')).toBeInTheDocument()
    })
  })

  it('should sort cities by likes in descending order', async () => {
    render(<Home />)

    // Wait for cities to render
    await waitFor(() => {
      const cityCards = screen.getAllByRole('heading', { level: 3 })
      const cityNames = cityCards.map(card => card.textContent)

      // Order: Jeju(58) > Seoul(42) > Busan(35) > Gwangju(31) > Daegu(27) > Daejeon(24)
      expect(cityNames[0]).toBe('제주')
      expect(cityNames[1]).toBe('서울')
      expect(cityNames[2]).toBe('부산')
    })
  })
})
