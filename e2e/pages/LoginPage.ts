import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * Login Page Object Model
 */
export class LoginPage extends BasePage {
  // Locators
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly signupLink: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    super(page)
    
    // Initialize locators (adjust selectors based on actual implementation)
    this.emailInput = page.locator('input[type="email"]')
    this.passwordInput = page.locator('input[type="password"]')
    this.loginButton = page.locator('button:has-text("로그인")')
    this.signupLink = page.locator('a[href="/signup"]')
    this.errorMessage = page.locator('[role="alert"]')
  }

  /**
   * Navigate to login page
   */
  async goto() {
    await this.navigate('/login')
    await this.waitForPageLoad()
  }

  /**
   * Perform login
   */
  async login(email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }

  /**
   * Navigate to signup page
   */
  async goToSignup() {
    await this.signupLink.click()
  }

  /**
   * Expectations
   */
  async expectLoginSuccess() {
    // Wait for navigation away from login page
    await this.page.waitForURL('/')
  }

  async expectLoginError(message?: string) {
    await expect(this.errorMessage).toBeVisible()
    if (message) {
      await expect(this.errorMessage).toContainText(message)
    }
  }
}
