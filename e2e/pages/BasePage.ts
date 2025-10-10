import { Page, Locator, expect } from '@playwright/test'

/**
 * Base Page Object
 * All page objects should extend this class
 */
export class BasePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  /**
   * Navigate to a specific URL
   */
  async navigate(url: string) {
    await this.page.goto(url)
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded')
    await this.page.waitForLoadState('networkidle')
  }

  /**
   * Take a screenshot
   */
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `e2e/screenshots/${name}.png`, fullPage: true })
  }

  /**
   * Get page title
   */
  async getTitle() {
    return await this.page.title()
  }

  /**
   * Get current URL
   */
  getUrl() {
    return this.page.url()
  }

  /**
   * Wait for a specific selector
   */
  async waitForSelector(selector: string, options?: { timeout?: number }) {
    await this.page.waitForSelector(selector, options)
  }

  /**
   * Click an element
   */
  async click(locator: Locator) {
    await locator.click()
  }

  /**
   * Fill input field
   */
  async fill(locator: Locator, text: string) {
    await locator.fill(text)
  }

  /**
   * Get text content
   */
  async getText(locator: Locator) {
    return await locator.textContent()
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator) {
    return await locator.isVisible()
  }

  /**
   * Reload the page
   */
  async reload() {
    await this.page.reload()
  }
}
