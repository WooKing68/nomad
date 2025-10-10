import { Locator, expect } from '@playwright/test'

/**
 * Filter Section Component Object
 */
export class FilterSection {
  readonly container: Locator
  readonly resetButton: Locator

  constructor(container: Locator) {
    this.container = container
    this.resetButton = container.locator('button:has-text("필터 초기화")')
  }

  /**
   * Select a budget filter
   */
  async selectBudget(value: string) {
    const button = this.container.locator(`button:has-text("${value}")`).first()
    await button.click()
  }

  /**
   * Select a region filter
   */
  async selectRegion(value: string) {
    const button = this.container.locator(`button:has-text("${value}")`).first()
    await button.click()
  }

  /**
   * Select an environment filter
   */
  async selectEnvironment(value: string) {
    const button = this.container.locator(`button:has-text("${value}")`).first()
    await button.click()
  }

  /**
   * Select a season filter
   */
  async selectSeason(value: string) {
    const button = this.container.locator(`button:has-text("${value}")`).first()
    await button.click()
  }

  /**
   * Reset all filters
   */
  async reset() {
    await this.resetButton.click()
  }

  /**
   * Check if a filter is selected
   */
  async isFilterSelected(value: string) {
    const button = this.container.locator(`button:has-text("${value}")`).first()
    const classes = await button.getAttribute('class')
    return classes?.includes('bg-blue-100') || 
           classes?.includes('bg-green-100') || 
           classes?.includes('bg-purple-100') || 
           classes?.includes('bg-orange-100') || 
           false
  }

  /**
   * Expectations
   */
  async expectVisible() {
    await expect(this.container).toBeVisible()
  }

  async expectFilterSelected(value: string) {
    const isSelected = await this.isFilterSelected(value)
    expect(isSelected).toBe(true)
  }
}
