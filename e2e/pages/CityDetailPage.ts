import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * City Detail Page Object Model
 */
export class CityDetailPage extends BasePage {
  // Locators
  readonly cityName: Locator
  readonly cityDescription: Locator
  readonly likeButton: Locator
  readonly dislikeButton: Locator
  readonly backButton: Locator
  readonly budgetTag: Locator
  readonly regionTag: Locator
  readonly environmentTag: Locator
  readonly seasonTag: Locator

  constructor(page: Page) {
    super(page)
    
    // Initialize locators
    this.cityName = page.locator('h1')
    this.cityDescription = page.locator('p').first()
    this.likeButton = page.locator('button').filter({ hasText: /좋아요|like/i }).first()
    this.dislikeButton = page.locator('button').filter({ hasText: /싫어요|dislike/i }).first()
    this.backButton = page.locator('button:has-text("뒤로")')
    this.budgetTag = page.locator('text=예산:')
    this.regionTag = page.locator('text=지역:')
    this.environmentTag = page.locator('text=환경:')
    this.seasonTag = page.locator('text=최고 계절:')
  }

  /**
   * Navigate to city detail page
   */
  async goto(cityId: string) {
    await this.navigate(`/city/${cityId}`)
    await this.waitForPageLoad()
  }

  /**
   * Click like button
   */
  async clickLike() {
    await this.likeButton.click()
  }

  /**
   * Click dislike button
   */
  async clickDislike() {
    await this.dislikeButton.click()
  }

  /**
   * Go back to previous page
   */
  async goBack() {
    await this.page.goBack()
  }

  /**
   * Expectations
   */
  async expectCityName(name: string) {
    await expect(this.cityName).toContainText(name)
  }

  async expectCityDetailsVisible() {
    await expect(this.cityName).toBeVisible()
    await expect(this.cityDescription).toBeVisible()
  }
}
