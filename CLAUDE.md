# K-Nomad 프로젝트 개발 가이드

> Claude AI를 활용한 개발 히스토리 및 프로젝트 구조 문서

## 📋 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [테스트 구조](#테스트-구조)
   - [Unit & Integration Tests](#unit--integration-tests)
   - [E2E Tests with Playwright](#e2e-tests-with-playwright)
3. [개발 가이드](#개발-가이드)
4. [주요 기술 스택](#주요-기술-스택)

---

## 프로젝트 개요

K-Nomad는 디지털 노마드를 위한 한국 도시 추천 플랫폼입니다.
사용자가 예산, 지역, 환경, 계절 등의 필터를 통해 자신에게 맞는 도시를 찾을 수 있습니다.

### 핵심 기능
- 🏙️ 도시 리스트 및 상세 정보 제공
- 🔍 다중 필터링 시스템 (예산/지역/환경/계절)
- 👍 좋아요/싫어요 시스템
- 💾 LocalStorage 기반 사용자 선호도 저장
- 🔐 Supabase 기반 인증 시스템

---

## 테스트 구조

### Unit & Integration Tests

**위치**: `__tests__/`

프로젝트는 Jest와 React Testing Library를 사용한 포괄적인 단위/통합 테스트를 포함합니다.

#### 폴더 구조
```
__tests__/
├── unit/
│   ├── components/
│   │   ├── filters/
│   │   │   ├── BudgetFilter.test.tsx
│   │   │   ├── RegionFilter.test.tsx
│   │   │   ├── EnvironmentFilter.test.tsx
│   │   │   └── SeasonFilter.test.tsx
│   │   ├── CityCard.test.tsx
│   │   ├── CityList.test.tsx
│   │   ├── FilterSection.test.tsx
│   │   ├── FilterTags.test.tsx
│   │   └── LikeButtons.test.tsx
│   └── utils/
│       ├── cityFilters.test.ts
│       └── localStorage.test.ts
└── integration/
    └── filterFlow.test.tsx
```

#### 테스트 통계
- **총 테스트 스위트**: 12개
- **총 테스트 케이스**: 131개
- **통과율**: 96.9% (127 passed, 4 failed)
- **실행 시간**: ~17초

#### 주요 테스트 영역
1. **컴포넌트 테스트** (80개)
   - 필터 컴포넌트 (40개)
   - 디스플레이 컴포넌트 (16개)
   - 인터랙티브 컴포넌트 (20개)
   - 컨테이너 컴포넌트 (4개)

2. **유틸리티 테스트** (48개)
   - 필터링 로직
   - localStorage 조작
   - 정렬 알고리즘

3. **통합 테스트** (5개)
   - 전체 필터링 플로우
   - 사용자 인터랙션

#### 테스트 실행 명령어
```bash
# 모든 테스트 실행
npm test

# Watch 모드
npm run test:watch

# 커버리지 리포트
npm run test:coverage
```

---

### E2E Tests with Playwright

**위치**: `e2e/`

Playwright를 사용한 엔드투엔드 테스트로 실제 사용자 시나리오를 검증합니다.

#### 폴더 구조

```
e2e/
├── tests/                      # 테스트 파일
│   ├── home/                   # 홈페이지 테스트
│   │   ├── city-list.spec.ts
│   │   ├── filtering.spec.ts
│   │   └── like-interaction.spec.ts
│   ├── auth/                   # 인증 테스트
│   │   ├── login.spec.ts
│   │   └── signup.spec.ts
│   ├── city-detail/            # 도시 상세 페이지
│   └── workflows/              # 워크플로우 테스트
│       └── filter-workflow.spec.ts
│
├── pages/                      # Page Object Models
│   ├── BasePage.ts             # 기본 페이지 클래스
│   ├── HomePage.ts             # 홈페이지 POM
│   ├── LoginPage.ts            # 로그인 페이지 POM
│   ├── SignupPage.ts           # 회원가입 페이지 POM
│   └── CityDetailPage.ts       # 도시 상세 페이지 POM
│
├── components/                 # Component Objects
│   ├── CityCard.ts             # 도시 카드 컴포넌트
│   └── FilterSection.ts        # 필터 섹션 컴포넌트
│
├── fixtures/                   # 테스트 픽스처
│   └── index.ts                # 커스텀 픽스처 설정
│
├── utils/                      # 헬퍼 함수
│   ├── test-helpers.ts         # 공통 테스트 헬퍼
│   └── wait-helpers.ts         # 대기 관련 헬퍼
│
├── data/                       # 테스트 데이터
│   ├── cities.json             # 도시 테스트 데이터
│   └── users.json              # 사용자 테스트 데이터
│
├── screenshots/                # 스크린샷 저장
│   └── baseline/
│
└── README.md                   # E2E 테스트 가이드
```

#### 설계 원칙

1. **Page Object Model (POM) 패턴**
   - 모든 페이지 상호작용을 클래스로 캡슐화
   - 셀렉터와 로직을 중앙에서 관리
   - 테스트 코드의 가독성과 유지보수성 향상

2. **Component Objects**
   - 재사용 가능한 UI 컴포넌트를 별도 객체로 관리
   - CityCard, FilterSection 등 공통 컴포넌트 추상화

3. **Custom Fixtures**
   - Playwright의 픽스처 시스템 활용
   - 페이지 객체를 자동으로 주입
   - 테스트 코드 간소화

4. **Helper Functions**
   - localStorage 조작
   - 네트워크 대기
   - API 모킹
   - 스크린샷 캡처

#### Page Object Model 예시

```typescript
// BasePage.ts - 모든 페이지의 기본 클래스
export class BasePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async navigate(url: string) {
    await this.page.goto(url)
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded')
    await this.page.waitForLoadState('networkidle')
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `e2e/screenshots/${name}.png`, 
      fullPage: true 
    })
  }
}

// HomePage.ts - 홈페이지 전용 메서드
export class HomePage extends BasePage {
  readonly cityCards: Locator
  readonly filterSection: Locator

  constructor(page: Page) {
    super(page)
    this.cityCards = page.locator('[data-testid="city-card"]')
    this.filterSection = page.locator('.filter-section')
  }

  async goto() {
    await this.navigate('/')
    await this.waitForPageLoad()
  }

  async selectFilter(category: string, value: string) {
    const button = this.page.locator(`button:has-text("${value}")`)
    await button.click()
    await this.page.waitForTimeout(500)
  }

  async getCityCount() {
    return await this.cityCards.count()
  }

  async expectCityVisible(cityName: string) {
    await expect(this.page.locator(`h3:has-text("${cityName}")`))
      .toBeVisible()
  }
}
```

#### Custom Fixtures 사용법

```typescript
// fixtures/index.ts
import { test as base } from '@playwright/test'
import { HomePage } from '../pages/HomePage'

type TestFixtures = {
  homePage: HomePage
  loginPage: LoginPage
  signupPage: SignupPage
}

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await use(homePage)
  },
  // ... 다른 픽스처들
})

// 테스트에서 사용
import { test, expect } from '../../fixtures'

test('should filter cities', async ({ homePage }) => {
  await homePage.goto()
  await homePage.selectFilter('budget', '100만원')
  await homePage.expectCityCount(2)
})
```

#### 테스트 실행 명령어

```bash
# 모든 E2E 테스트 실행
npm run test:e2e

# UI 모드 (개발 시 추천)
npm run test:e2e:ui

# Headed 모드 (브라우저 보면서)
npm run test:e2e:headed

# 디버그 모드
npm run test:e2e:debug

# 특정 브라우저
npm run test:e2e:chrome
npm run test:e2e:firefox
npm run test:e2e:webkit
npm run test:e2e:mobile

# HTML 리포트 보기
npm run test:e2e:report

# 코드 생성 (Codegen)
npm run test:e2e:codegen
```

#### Playwright 설정 (`playwright.config.ts`)

```typescript
export default defineConfig({
  testDir: './e2e/tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list']
  ],
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 12'] } },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

#### 테스트 카테고리

1. **홈페이지 테스트** (`tests/home/`)
   - 도시 리스트 표시
   - 필터링 기능
   - 좋아요/싫어요 인터랙션
   - 정렬 기능

2. **인증 테스트** (`tests/auth/`)
   - 로그인
   - 회원가입
   - 로그아웃

3. **도시 상세 페이지** (`tests/city-detail/`)
   - 상세 정보 표시
   - 좋아요/싫어요 기능

4. **워크플로우 테스트** (`tests/workflows/`)
   - 전체 필터링 플로우
   - 탐색 → 좋아요 플로우
   - 인증 플로우

#### Helper Functions

**test-helpers.ts**
```typescript
// LocalStorage 조작
export async function clearLocalStorage(page: Page)
export async function setLocalStorage(page: Page, key: string, value: any)
export async function getLocalStorage(page: Page, key: string)

// 네트워크
export async function waitForNetworkIdle(page: Page, timeout = 5000)

// API 모킹
export async function mockApiResponse(
  page: Page, 
  url: string | RegExp, 
  response: any
)

// 스크린샷
export async function takeTimestampedScreenshot(page: Page, name: string)
```

**wait-helpers.ts**
```typescript
// 애니메이션 대기
export async function waitForAnimation(page: Page, selector: string)

// 필터 업데이트 대기
export async function waitForFilterUpdate(page: Page)

// 요소 안정화 대기
export async function waitForElementStable(page: Page, selector: string)

// URL 변경 대기
export async function waitForUrlChange(page: Page, expectedUrl: string)
```

#### 테스트 데이터 관리

**cities.json**
```json
{
  "validCities": [
    {
      "id": "1",
      "name": "서울",
      "description": "한국의 수도",
      "budget": "200만원",
      "region": "수도권"
    }
  ],
  "filterOptions": {
    "budget": ["100만원", "100~200만원", "200만원"],
    "region": ["전체", "수도권", "경상도", ...]
  }
}
```

**users.json**
```json
{
  "validUser": {
    "email": "test@example.com",
    "password": "Test1234!"
  },
  "invalidUsers": {
    "invalidEmail": { ... },
    "shortPassword": { ... }
  }
}
```

#### 모범 사례

1. **Page Object 사용**
   ```typescript
   // ✅ Good
   await homePage.selectFilter('budget', '100만원')
   await homePage.expectCityCount(2)
   
   // ❌ Bad
   await page.click('button:has-text("100만원")')
   await expect(page.locator('.city-card')).toHaveCount(2)
   ```

2. **명시적 대기**
   ```typescript
   // ✅ Good
   await page.waitForSelector('.city-card')
   
   // ❌ Bad
   await page.waitForTimeout(3000)
   ```

3. **독립적인 테스트**
   ```typescript
   test.beforeEach(async ({ homePage }) => {
     await homePage.goto()
     // 각 테스트마다 초기 상태로 시작
   })
   ```

4. **명확한 테스트 이름**
   ```typescript
   // ✅ Good
   test('should filter cities by budget and show only matching results')
   
   // ❌ Bad
   test('filter test')
   ```

#### 브라우저 지원

- ✅ **Desktop Chrome** (Chromium)
- ✅ **Desktop Firefox**
- ✅ **Desktop Safari** (WebKit)
- ✅ **Mobile Chrome** (Pixel 5)
- ✅ **Mobile Safari** (iPhone 12)

#### CI/CD 최적화

- **재시도**: CI 환경에서 2회 자동 재시도
- **병렬 실행**: 로컬에서는 병렬, CI에서는 순차
- **캐싱**: 브라우저 바이너리 캐싱
- **아티팩트**: 실패 시 스크린샷, 비디오, 트레이스 업로드

---

## 개발 가이드

### 테스트 작성 워크플로우

#### 1. Unit/Integration 테스트 먼저
```bash
# 1. 컴포넌트/함수 개발
# 2. 테스트 작성
npm run test:watch

# 3. 테스트 통과 확인
npm test
```

#### 2. E2E 테스트로 검증
```bash
# 1. UI 모드로 테스트 개발
npm run test:e2e:ui

# 2. Codegen으로 빠른 시작 (선택사항)
npm run test:e2e:codegen

# 3. 실제 시나리오 테스트
npm run test:e2e:headed
```

### 새로운 페이지 추가 시

1. **Page Object 생성**
   ```typescript
   // e2e/pages/NewPage.ts
   export class NewPage extends BasePage {
     // 로케이터 정의
     // 메서드 구현
   }
   ```

2. **Fixture에 추가**
   ```typescript
   // e2e/fixtures/index.ts
   export const test = base.extend<TestFixtures>({
     newPage: async ({ page }, use) => {
       await use(new NewPage(page))
     }
   })
   ```

3. **테스트 작성**
   ```typescript
   // e2e/tests/new-page/feature.spec.ts
   test('should work', async ({ newPage }) => {
     await newPage.goto()
     // ...
   })
   ```

### 디버깅 팁

#### Unit Tests
```bash
# 특정 테스트만 실행
npm test -- filtering.test

# Watch 모드로 개발
npm run test:watch

# 커버리지 확인
npm run test:coverage
```

#### E2E Tests
```bash
# UI 모드 (가장 추천)
npm run test:e2e:ui

# 디버그 모드
npm run test:e2e:debug

# 브라우저 보면서
npm run test:e2e:headed

# 트레이스 뷰어
npx playwright show-trace trace.zip
```

---

## 주요 기술 스택

### Frontend
- **Framework**: Next.js 15.1.0
- **React**: 19.0.0
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: Radix UI, Lucide React
- **Type Safety**: TypeScript 5

### Testing
- **Unit/Integration**: Jest 29.7.0 + React Testing Library 14.3.1
- **E2E**: Playwright 1.55.1
- **Test Coverage**: Jest Coverage

### Backend & Auth
- **Authentication**: Supabase
- **Database**: Supabase (PostgreSQL)

### Development Tools
- **Linting**: ESLint 8
- **Package Manager**: npm
- **Version Control**: Git

---

## 프로젝트 통계

### 테스트 커버리지

| 카테고리 | Unit Tests | E2E Tests | 합계 |
|---------|-----------|-----------|------|
| 컴포넌트 | 80 | 예정 | 80+ |
| 유틸리티 | 48 | - | 48 |
| 통합 | 5 | 예정 | 5+ |
| **합계** | **133** | **예정** | **133+** |

### 파일 구조

```
프로젝트 루트/
├── app/                    # Next.js 앱 디렉토리
├── components/             # React 컴포넌트
├── utils/                  # 유틸리티 함수
├── types/                  # TypeScript 타입 정의
├── data/                   # 정적 데이터
├── __tests__/             # Unit & Integration 테스트
├── e2e/                   # E2E 테스트 (Playwright)
├── playwright.config.ts   # Playwright 설정
├── jest.config.js        # Jest 설정
└── package.json          # 프로젝트 메타데이터
```

---

## 📚 추가 리소스

- **Unit Tests 가이드**: `__tests__/README.md` (작성 예정)
- **E2E Tests 가이드**: `e2e/README.md` ✅
- **프로젝트 사양서**: `SPEC.md` ✅
- **Playwright 공식 문서**: https://playwright.dev
- **Jest 공식 문서**: https://jestjs.io

---

**Last Updated**: 2025-10-03  
**Claude Version**: Sonnet 4.5  
**Project Status**: 🟢 Active Development
