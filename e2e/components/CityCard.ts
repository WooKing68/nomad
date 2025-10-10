import { Locator, expect } from '@playwright/test'

/**
 * City Card Component Object
 * Represents a single city card on the homepage
 */
export class CityCard {
  readonly container: Locator
  readonly cityName: Locator
  readonly description: Locator
  readonly likeButton: Locator
  readonly dislikeButton: Locator
  readonly likesCount: Locator
  readonly dislikesCount: Locator
  readonly budgetTag: Locator
  readonly regionTag: Locator
  readonly environmentTag: Locator
  readonly seasonTag: Locator

  constructor(container: Locator) {
    this.container = container
    this.cityName = container.locator('h3')
    this.description = container.locator('p').first()
    this.likeButton = container.locator('button').filter({ has: container.page().locator('[class*="Heart"]') }).first()
    this.dislikeButton = container.locator('button').filter({ has: container.page().locator('[class*="HeartOff"]') }).first()
    this.likesCount = this.likeButton.locator('span')
    this.dislikesCount = this.dislikeButton.locator('span')
    this.budgetTag = container.locator('text=예산:').locator('..')
    this.regionTag = container.locator('text=지역:').locator('..')
    this.environmentTag = container.locator('text=환경:').locator('..')
    this.seasonTag = container.locator('text=최고 계절:').locator('..')
  }

  /**
   * Get city name
   */
  async getCityName() {
    return await this.cityName.textContent()
  }

  /**
   * Get description
   */
  async getDescription() {
    return await this.description.textContent()
  }

  /**
   * Get likes count
   */
  async getLikesCount() {
    const text = await this.likesCount.textContent()
    return parseInt(text || '0')
  }

  /**
   * Get dislikes count
   */
  async getDislikesCount() {
    const text = await this.dislikesCount.textContent()
    return parseInt(text || '0')
  }

  /**
   * Click the card
   */
  async click() {
    await this.container.click()
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
   * Check if liked
   */
  async isLiked() {
    const classes = await this.likeButton.getAttribute('class')
    return classes?.includes('bg-red') || false
  }

  /**
   * Check if disliked
   */
  async isDisliked() {
    const classes = await this.dislikeButton.getAttribute('class')
    return classes?.includes('bg-gray-100') || false
  }

  /**
   * Get budget value
   */
  async getBudget() {
    return await this.budgetTag.locator('span').last().textContent()
  }

  /**
   * Get region value
   */
  async getRegion() {
    return await this.regionTag.locator('span').last().textContent()
  }

  /**
   * Expectations
   */
  async expectVisible() {
    await expect(this.container).toBeVisible()
  }

  async expectCityName(name: string) {
    await expect(this.cityName).toHaveText(name)
  }

  async expectLikesCount(count: number) {
    await expect(this.likesCount).toHaveText(count.toString())
  }
}
