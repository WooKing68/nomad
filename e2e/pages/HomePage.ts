import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * Home Page Object Model
 * Represents the main homepage with city list and filters
 */
export class HomePage extends BasePage {
  // Locators
  readonly pageTitle: Locator
  readonly cityCards: Locator
  readonly filterSection: Locator
  readonly filterResetButton: Locator
  readonly loginLink: Locator
  readonly signupLink: Locator

  constructor(page: Page) {
    super(page)
    
    // Initialize locators
    this.pageTitle = page.locator('h1:has-text("도시 리스트")')
    this.cityCards = page.locator('[data-testid="city-card"]').or(page.locator('.bg-white.rounded-lg.shadow-md.p-6'))
    this.filterSection = page.locator('.bg-white.rounded-lg.shadow-md.p-6').first()
    this.filterResetButton = page.locator('button:has-text("필터 초기화")')
    this.loginLink = page.locator('a[href="/login"]')
    this.signupLink = page.locator('a[href="/signup"]')
  }

  /**
   * Navigate to homepage
   */
  async goto() {
    await this.navigate('/')
    await this.waitForPageLoad()
  }

  /**
   * Get the number of visible city cards
   */
  async getCityCount() {
    return await this.cityCards.count()
  }

  /**
   * Get city names from all visible cards
   */
  async getCityNames() {
    const names: string[] = []
    const count = await this.getCityCount()
    
    for (let i = 0; i < count; i++) {
      const card = this.cityCards.nth(i)
      const name = await card.locator('h3').textContent()
      if (name) names.push(name.trim())
    }
    
    return names
  }

  /**
   * Select a filter option
   */
  async selectFilter(category: 'budget' | 'region' | 'environment' | 'season', value: string) {
    const button = this.page.locator(`button:has-text("${value}")`).first()
    await button.click()
    await this.page.waitForTimeout(500) // Wait for filter to apply
  }

  /**
   * Reset all filters
   */
  async resetFilters() {
    await this.filterResetButton.click()
    await this.page.waitForTimeout(500)
  }

  /**
   * Click on a specific city card
   */
  async clickCity(cityName: string) {
    const cityCard = this.page.locator(`h3:has-text("${cityName}")`).first()
    await cityCard.click()
  }

  /**
   * Get a specific city card by name
   */
  getCityCard(cityName: string) {
    return this.page.locator(`h3:has-text("${cityName}")`).locator('..')
  }

  /**
   * Check if empty state message is visible
   */
  async isEmptyStateVisible() {
    const emptyMessage = this.page.locator('text=선택한 필터 조건에 맞는 도시가 없습니다')
    return await emptyMessage.isVisible()
  }

  /**
   * Navigate to login page
   */
  async goToLogin() {
    await this.loginLink.click()
  }

  /**
   * Navigate to signup page
   */
  async goToSignup() {
    await this.signupLink.click()
  }

  /**
   * Expectations / Assertions
   */
  async expectPageLoaded() {
    await expect(this.pageTitle).toBeVisible()
  }

  async expectCityVisible(cityName: string) {
    await expect(this.page.locator(`h3:has-text("${cityName}")`)).toBeVisible()
  }

  async expectCityNotVisible(cityName: string) {
    await expect(this.page.locator(`h3:has-text("${cityName}")`)).not.toBeVisible()
  }

  async expectCityCount(count: number) {
    await expect(this.cityCards).toHaveCount(count)
  }

  async expectEmptyState() {
    await expect(this.page.locator('text=선택한 필터 조건에 맞는 도시가 없습니다')).toBeVisible()
  }
}
