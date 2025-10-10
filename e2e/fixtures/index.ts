import { test as base } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { SignupPage } from '../pages/SignupPage'
import { CityDetailPage } from '../pages/CityDetailPage'

/**
 * Extended test fixtures with page objects
 */
type TestFixtures = {
  homePage: HomePage
  loginPage: LoginPage
  signupPage: SignupPage
  cityDetailPage: CityDetailPage
}

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await use(homePage)
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await use(loginPage)
  },

  signupPage: async ({ page }, use) => {
    const signupPage = new SignupPage(page)
    await use(signupPage)
  },

  cityDetailPage: async ({ page }, use) => {
    const cityDetailPage = new CityDetailPage(page)
    await use(cityDetailPage)
  },
})

export { expect } from '@playwright/test'
