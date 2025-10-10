# K-Nomad Test Suite

## 📋 Overview

This test suite provides comprehensive coverage for the K-Nomad city recommendation platform.

## 🧪 Test Statistics

- **Total Test Cases**: 148+
- **Test Files**: 13
- **Coverage Goal**: 85%+

### Test Breakdown by Category

| Category | Test Files | Test Cases |
|----------|-----------|------------|
| Utility Functions | 2 | 48 |
| Filter Components | 4 | 40 |
| Display Components | 2 | 18 |
| Interactive Components | 1 | 20 |
| Container Components | 2 | 22 |
| Integration Tests | 1 | 5 |

## 🚀 Running Tests

### Install Dependencies

First, install the required testing dependencies:

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Generate Coverage Report

```bash
npm run test:coverage
```

## 📁 Test Structure

```
__tests__/
├── unit/
│   ├── utils/
│   │   ├── cityFilters.test.ts
│   │   └── localStorage.test.ts
│   └── components/
│       ├── filters/
│       │   ├── BudgetFilter.test.tsx
│       │   ├── RegionFilter.test.tsx
│       │   ├── EnvironmentFilter.test.tsx
│       │   └── SeasonFilter.test.tsx
│       ├── CityCard.test.tsx
│       ├── CityList.test.tsx
│       ├── FilterSection.test.tsx
│       ├── FilterTags.test.tsx
│       └── LikeButtons.test.tsx
├── integration/
│   └── filterFlow.test.tsx
├── mocks/
│   ├── cities.ts
│   └── localStorage.ts
└── setup/
    └── testUtils.tsx
```

## 🎯 Test Coverage Areas

### 1. Utility Functions (Priority: Highest)
- ✅ City filtering logic
- ✅ Sorting by likes
- ✅ Combined filter and sort operations
- ✅ LocalStorage operations
- ✅ User vote management

### 2. Filter Components
- ✅ Budget filter
- ✅ Region filter
- ✅ Environment filter
- ✅ Season filter

### 3. Display Components
- ✅ Filter tags rendering
- ✅ City list rendering
- ✅ Empty state handling

### 4. Interactive Components
- ✅ Like/Dislike button behavior
- ✅ Vote state management
- ✅ LocalStorage integration

### 5. Container Components
- ✅ Filter section coordination
- ✅ City card interaction
- ✅ Navigation integration

### 6. Integration Tests
- ✅ Complete filter flow
- ✅ Multi-filter scenarios
- ✅ Sorting verification

## 🔧 Configuration

### Jest Configuration

The project uses `jest.config.js` with Next.js integration:

- Test environment: jsdom
- Setup file: `jest.setup.ts`
- Path aliases: `@/*` mapped to project root
- Coverage threshold: 85% for all metrics

### Mock Setup

Global mocks are configured in `jest.setup.ts`:
- localStorage
- Next.js router
- React Testing Library DOM matchers

## 📊 Coverage Goals

| Metric | Target |
|--------|--------|
| Statements | 85% |
| Branches | 85% |
| Functions | 85% |
| Lines | 85% |

## 🐛 Debugging Tests

### Run Specific Test File

```bash
npm test cityFilters.test.ts
```

### Run Tests Matching Pattern

```bash
npm test -- --testNamePattern="filter"
```

### Verbose Output

```bash
npm test -- --verbose
```

## 📝 Writing New Tests

### Test Template

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import YourComponent from '@/components/YourComponent'

describe('YourComponent', () => {
  beforeEach(() => {
    // Setup
  })

  describe('Feature Group', () => {
    it('should do something specific', () => {
      // Arrange
      render(<YourComponent />)

      // Act
      fireEvent.click(screen.getByText('Button'))

      // Assert
      expect(screen.getByText('Result')).toBeInTheDocument()
    })
  })
})
```

### Best Practices

1. **AAA Pattern**: Arrange, Act, Assert
2. **Descriptive Names**: Use clear, descriptive test names
3. **Isolation**: Each test should be independent
4. **Mock External Dependencies**: Use mocks for localStorage, API calls, etc.
5. **Test User Behavior**: Focus on what users see and do

## 🔍 Common Issues

### Issue: Tests fail with localStorage errors

**Solution**: Ensure `jest.setup.ts` is properly configured with localStorage mock.

### Issue: Component not rendering

**Solution**: Check if all required props are provided and mocks are set up.

### Issue: Async tests timing out

**Solution**: Use `waitFor` from `@testing-library/react` and increase timeout if needed.

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Next.js Testing](https://nextjs.org/docs/testing)

## ✅ Test Checklist

- [x] Utility functions tested
- [x] All components have unit tests
- [x] Integration tests cover main flows
- [x] Mock data is comprehensive
- [x] Coverage threshold met
- [x] All tests passing
- [x] Documentation complete

---

**Last Updated**: October 2025
**Maintained By**: K-Nomad Development Team
