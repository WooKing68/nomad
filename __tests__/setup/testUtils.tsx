import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Custom render function that includes providers if needed
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, { ...options })
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'
export { customRender as render }

// Common test utilities
export const waitForLoadingToFinish = () => {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

export const createMockCity = (overrides = {}) => ({
  id: '1',
  name: 'Test City',
  description: 'Test description',
  likes: 10,
  dislikes: 2,
  budget: '100만원' as const,
  region: '수도권' as const,
  environment: '카페작업' as const,
  season: '봄' as const,
  ...overrides,
})
