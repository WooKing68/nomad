# E2E Tests with Playwright

This directory contains end-to-end tests for the K-Nomad application using Playwright.

## 📁 Folder Structure

```
e2e/
├── tests/              # Test files organized by feature
│   ├── home/          # Homepage tests
│   ├── auth/          # Authentication tests
│   ├── city-detail/   # City detail page tests
│   └── workflows/     # End-to-end workflow tests
├── pages/             # Page Object Models
├── components/        # Component Objects
├── fixtures/          # Test fixtures and custom test setup
├── utils/             # Helper functions
├── data/              # Test data (JSON files)
└── screenshots/       # Screenshot storage
```

## 🚀 Running Tests

### Run all tests
```bash
npm run test:e2e
```

### Run with UI mode (recommended for development)
```bash
npm run test:e2e:ui
```

### Run in headed mode (see browser)
```bash
npm run test:e2e:headed
```

### Run specific browser
```bash
npm run test:e2e:chrome
npm run test:e2e:firefox
npm run test:e2e:webkit
npm run test:e2e:mobile
```

### Debug tests
```bash
npm run test:e2e:debug
```

### View test report
```bash
npm run test:e2e:report
```

### Generate test code (Codegen)
```bash
npm run test:e2e:codegen
```

## 📝 Writing Tests

### Using Fixtures

Tests should use the custom fixtures that provide page objects:

```typescript
import { test, expect } from '../../fixtures'

test('example test', async ({ homePage }) => {
  await homePage.goto()
  await homePage.expectPageLoaded()
})
```

### Available Fixtures

- `homePage` - HomePage instance
- `loginPage` - LoginPage instance
- `signupPage` - SignupPage instance
- `cityDetailPage` - CityDetailPage instance

### Page Object Pattern

All page interactions should go through Page Objects:

```typescript
// Good ✅
await homePage.selectFilter('budget', '100만원')
await homePage.expectCityCount(2)

// Bad ❌
await page.click('button:has-text("100만원")')
await expect(page.locator('.city-card')).toHaveCount(2)
```

## 🧪 Test Organization

### Test Structure

```typescript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto()
  })

  test('should do something', async ({ homePage }) => {
    // Arrange
    await homePage.selectFilter('budget', '100만원')
    
    // Act
    const count = await homePage.getCityCount()
    
    // Assert
    expect(count).toBe(2)
  })
})
```

### Test Categories

1. **Smoke Tests** - Critical path tests
2. **Functional Tests** - Feature-specific tests
3. **Workflow Tests** - End-to-end user journeys
4. **Visual Tests** - Screenshot comparison (future)

## 🔧 Configuration

Main configuration is in `playwright.config.ts`:

- Test directory: `./e2e/tests`
- Base URL: `http://localhost:3000`
- Browsers: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- Retries: 2 on CI, 0 locally
- Reporters: HTML, JSON, List

## 📊 Best Practices

1. **Use Page Objects** - All interactions through POM
2. **Use Fixtures** - Leverage custom fixtures for setup
3. **Explicit Waits** - Use `waitFor` instead of `setTimeout`
4. **Independence** - Each test should be independent
5. **Descriptive Names** - Test names should describe behavior
6. **Clean Up** - Use `beforeEach` to reset state

## 🐛 Debugging

### Debug Mode
```bash
npm run test:e2e:debug
```

### Screenshots on Failure
Screenshots are automatically captured on test failure in `test-results/`

### Video Recording
Videos are recorded for failed tests only

### Trace Viewer
Traces are captured on first retry. View with:
```bash
npx playwright show-trace trace.zip
```

## 📈 CI/CD Integration

Tests run automatically on CI with:
- 2 retries for flaky tests
- Serial execution (workers: 1)
- HTML and JSON reports
- Automatic artifact upload

## 🔗 Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)

---

**Status**: Test structure created, awaiting test implementation
**Last Updated**: October 2025
