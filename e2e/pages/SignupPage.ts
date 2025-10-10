import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * Signup Page Object Model
 */
export class SignupPage extends BasePage {
  // Locators
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly confirmPasswordInput: Locator
  readonly signupButton: Locator
  readonly loginLink: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    super(page)
    
    // Initialize locators (adjust based on actual implementation)
    this.emailInput = page.locator('input[type="email"]')
    this.passwordInput = page.locator('input[type="password"]').first()
    this.confirmPasswordInput = page.locator('input[type="password"]').last()
    this.signupButton = page.locator('button:has-text("회원가입")')
    this.loginLink = page.locator('a[href="/login"]')
    this.errorMessage = page.locator('[role="alert"]')
  }

  /**
   * Navigate to signup page
   */
  async goto() {
    await this.navigate('/signup')
    await this.waitForPageLoad()
  }

  /**
   * Perform signup
   */
  async signup(email: string, password: string, confirmPassword?: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    if (this.confirmPasswordInput) {
      await this.confirmPasswordInput.fill(confirmPassword || password)
    }
    await this.signupButton.click()
  }

  /**
   * Navigate to login page
   */
  async goToLogin() {
    await this.loginLink.click()
  }

  /**
   * Expectations
   */
  async expectSignupSuccess() {
    // Wait for navigation to login or home page
    await this.page.waitForURL(/\/(login)?/)
  }

  async expectSignupError(message?: string) {
    await expect(this.errorMessage).toBeVisible()
    if (message) {
      await expect(this.errorMessage).toContainText(message)
    }
  }
}
