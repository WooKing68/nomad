import { Page } from '@playwright/test'

/**
 * Wait for animation to complete
 */
export async function waitForAnimation(page: Page, selector: string, timeout = 3000) {
  const element = page.locator(selector)
  await element.waitFor({ state: 'visible', timeout })
  
  // Wait for any CSS transitions/animations to complete
  await page.waitForTimeout(300)
}

/**
 * Wait for filter update
 */
export async function waitForFilterUpdate(page: Page) {
  // Wait for filter state to update
  await page.waitForTimeout(500)
  
  // Wait for network idle in case there are API calls
  await page.waitForLoadState('networkidle', { timeout: 5000 })
}

/**
 * Wait for element to be stable (not moving)
 */
export async function waitForElementStable(page: Page, selector: string) {
  const element = page.locator(selector)
  
  let previousBox = await element.boundingBox()
  await page.waitForTimeout(100)
  let currentBox = await element.boundingBox()
  
  while (
    previousBox?.x !== currentBox?.x ||
    previousBox?.y !== currentBox?.y
  ) {
    previousBox = currentBox
    await page.waitForTimeout(100)
    currentBox = await element.boundingBox()
  }
}

/**
 * Wait for URL change
 */
export async function waitForUrlChange(page: Page, expectedUrl: string | RegExp, timeout = 5000) {
  await page.waitForURL(expectedUrl, { timeout })
}

/**
 * Wait for text to appear
 */
export async function waitForText(page: Page, text: string, timeout = 5000) {
  await page.waitForSelector(`text=${text}`, { timeout })
}

/**
 * Wait for element count
 */
export async function waitForElementCount(
  page: Page,
  selector: string,
  count: number,
  timeout = 5000
) {
  await page.waitForFunction(
    ({ selector, count }) => {
      return document.querySelectorAll(selector).length === count
    },
    { selector, count },
    { timeout }
  )
}
