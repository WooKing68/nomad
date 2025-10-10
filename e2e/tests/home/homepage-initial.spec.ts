import { test, expect } from '../../fixtures'

/**
 * Homepage Initial State Tests
 * 홈페이지 초기 상태 테스트
 */
test.describe('Homepage Initial State', () => {
  test.beforeEach(async ({ page }) => {
    // 포트 7000으로 이동
    await page.goto('http://localhost:7000')
    await page.waitForLoadState('networkidle')
  })

  test('should display logo/title on homepage', async ({ page }) => {
    // 로고/타이틀 확인
    const title = page.locator('h1:has-text("도시 리스트")')
    await expect(title).toBeVisible()
  })

  test('should display city cards on homepage', async ({ page }) => {
    // 도시 카드가 존재하는지 확인 (h3로 도시 이름 확인)
    const cityHeadings = page.locator('h3').filter({
      hasNot: page.locator('text=예산'),
      hasNot: page.locator('text=지역')
    })
    
    // 최소 1개 이상의 도시 카드가 있어야 함
    await expect(cityHeadings.first()).toBeVisible()
    
    // 카드 개수 확인 (6개)
    const count = await cityHeadings.count()
    expect(count).toBeGreaterThanOrEqual(6)
  })

  test('should have no filters applied on initial load', async ({ page }) => {
    // 필터가 선택되지 않은 상태 확인
    // 선택된 필터는 bg-blue-100, bg-green-100 등의 클래스를 가짐
    // 필터 섹션 내부의 버튼만 확인
    const filterSection = page.locator('h2:has-text("필터")').locator('..').locator('..')
    
    const selectedBudgetFilter = filterSection.locator('.bg-blue-100')
    const selectedRegionFilter = filterSection.locator('.bg-green-100')
    const selectedEnvFilter = filterSection.locator('.bg-purple-100')
    const selectedSeasonFilter = filterSection.locator('.bg-orange-100')
    
    // 선택된 필터가 없어야 함
    await expect(selectedBudgetFilter).toHaveCount(0)
    await expect(selectedRegionFilter).toHaveCount(0)
    await expect(selectedEnvFilter).toHaveCount(0)
    await expect(selectedSeasonFilter).toHaveCount(0)
  })

  test('should display all cities when no filters are applied', async ({ page }) => {
    // 필터가 적용되지 않았을 때 모든 도시 표시 확인
    // 데이터베이스에 있는 6개 도시가 모두 표시되어야 함
    const cityNames = ['제주', '서울', '부산', '광주', '대구', '대전']
    
    for (const cityName of cityNames) {
      const city = page.locator(`h3:has-text("${cityName}")`)
      await expect(city).toBeVisible()
    }
  })

  test('should display city cards with correct information', async ({ page }) => {
    // 첫 번째 도시 카드(제주) 상세 정보 확인
    const firstCityName = page.locator('h3:has-text("제주")').first()
    const firstCard = firstCityName.locator('../..')
    
    // 도시 이름
    await expect(firstCityName).toBeVisible()
    
    // 설명
    const description = firstCard.locator('p')
    await expect(description).toBeVisible()
    await expect(description).toContainText('섬')
    
    // 좋아요/싫어요 버튼 (숫자가 있는 버튼)
    const likeButton = firstCard.locator('button:has-text("58")').first()
    const dislikeButton = firstCard.locator('button:has-text("3")').first()
    
    await expect(likeButton).toBeVisible()
    await expect(dislikeButton).toBeVisible()
    
    // 태그들 (예산, 지역, 환경, 계절)
    await expect(firstCard.locator('text=예산:')).toBeVisible()
    await expect(firstCard.locator('text=지역:')).toBeVisible()
    await expect(firstCard.locator('text=환경:')).toBeVisible()
    await expect(firstCard.locator('text=최고 계절:')).toBeVisible()
    
    // 태그 값 확인
    await expect(firstCard.locator('text=100~200만원')).toBeVisible()
    await expect(firstCard.locator('text=제주도')).toBeVisible()
    await expect(firstCard.locator('text=자연친화')).toBeVisible()
    await expect(firstCard.locator('text=봄')).toBeVisible()
  })
})
