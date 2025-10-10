 be idle
 */
export async function waitForNetworkIdle(page: Page, timeout = 5000) {
  await page.waitForLoadState('networkidle', { timeout })
}

/**
 * Wait for a specific amount of time
 */
export async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Mock API response
 */
export async function mockApiResponse(
  page: Page,
  url: string | RegExp,
  response: any,
  status = 200
) {
  await page.route(url, (route) => {
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(response),
    })
  })
}

/**
 * Take a screenshot with timestamp
 */
export async function takeTimestampedScreenshot(page: Page, name: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  await page.screenshot({
    path: `e2e/screenshots/${name}-${timestamp}.png`,
    fullPage: true,
  })
}

/**
 * Scroll to element
 */
export async function scrollToElement(page: Page, selector: string) {
  await page.locator(selector).scrollIntoViewIfNeeded()
}

/**
 * Get all text contents from elements
 */
export async function getAllTextContents(page: Page, selector: string) {
  return await page.locator(selector).allTextContents()
}

/**
 * Check if element exists
 */
export async function elementExists(page: Page, selector: string) {
  return (await page.locator(selector).count()) > 0
}
