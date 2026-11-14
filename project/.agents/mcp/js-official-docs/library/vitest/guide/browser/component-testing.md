---
title: "Component Testing | Guide (part 1 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/browser/component-testing.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Component Testing

Component testing is a testing strategy that focuses on testing individual UI components in isolation. Unlike end-to-end tests that test entire user flows, component tests verify that each component works correctly on its own, making them faster to run and easier to debug.

Vitest provides comprehensive support for component testing across multiple frameworks including Vue, React, Svelte, Lit, Preact, Qwik, Solid, Marko, and more. This guide covers the specific patterns, tools, and best practices for testing components effectively with Vitest.

## Why Component Testing?

Component testing sits between unit tests and end-to-end tests, offering several advantages:

- **Faster feedback** - Test individual components without loading entire applications
- **Isolated testing** - Focus on component behavior without external dependencies
- **Better debugging** - Easier to pinpoint issues in specific components
- **Comprehensive coverage** - Test edge cases and error states more easily

## Browser Mode for Component Testing

Component testing in Vitest uses **Browser Mode** to run tests in real browser environments using Playwright, WebdriverIO, or preview mode. This provides the most accurate testing environment as your components run in real browsers with actual DOM implementations, CSS rendering, and browser APIs.

### Why Browser Mode?

Browser Mode is the recommended approach for component testing because it provides the most accurate testing environment. Unlike DOM simulation libraries, Browser Mode catches real-world issues that can affect your users.

**Tip:**
Browser Mode catches issues that DOM simulation libraries might miss, including:

- CSS layout and styling problems
- Real browser API behavior
- Accurate event handling and propagation
- Proper focus management and accessibility features

### Purpose of This Guide

This guide focuses specifically on **component testing patterns and best practices** using Vitest's capabilities. While many examples use Browser Mode (as it's the recommended approach), the focus here is on component-specific testing strategies rather than browser configuration details.

For detailed browser setup, configuration options, and advanced browser features, refer to the Browser Mode documentation.

## What Makes a Good Component Test

Good component tests focus on **behavior and user experience** rather than implementation details:

- **Test the contract** - How components receive inputs (props) and produce outputs (events, renders)
- **Test user interactions** - Clicks, form submissions, keyboard navigation
- **Test edge cases** - Error states, loading states, empty states
- **Avoid testing internals** - State variables, private methods, CSS classes

### Component Testing Hierarchy

```
1. Critical User Paths → Always test these
2. Error Handling      → Test failure scenarios
3. Edge Cases          → Empty data, extreme values
4. Accessibility       → Screen readers, keyboard nav
5. Performance         → Large datasets, animations
```

## Component Testing Strategies

### Isolation Strategy

Test components in isolation by mocking dependencies:

```tsx
// For API requests, we recommend MSW (Mock Service Worker)
// See: https://vitest.dev/guide/mocking/requests
//
// vi.mock(import('../api/userService'), () => ({
//   fetchUser: vi.fn().mockResolvedValue({ name: 'John' })
// }))

// Mock child components to focus on parent logic
vi.mock(import('../components/UserCard'), () => ({
  default: vi.fn(({ user }) => `<div>User: ${user.name}</div>`)
}))

test('UserProfile handles loading and data states', async () => {
  const { getByText } = render(<UserProfile userId="123" />)

  // Test loading state
  await expect.element(getByText('Loading...')).toBeInTheDocument()

  // Test for data to load (expect.element auto-retries)
  await expect.element(getByText('User: John')).toBeInTheDocument()
})
```

### Integration Strategy

Test component collaboration and data flow:

```tsx
test('ProductList filters and displays products correctly', async () => {
  const mockProducts = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999 },
    { id: 2, name: 'Book', category: 'Education', price: 29 }
  ]

  const { getByLabelText, getByText } = render(
    <ProductList products={mockProducts} />
  )

  // Initially shows all products
  await expect.element(getByText('Laptop')).toBeInTheDocument()
  await expect.element(getByText('Book')).toBeInTheDocument()

  // Filter by category
  await userEvent.selectOptions(
    getByLabelText(/category/i),
    'Electronics'
  )

  // Only electronics should remain
  await expect.element(getByText('Laptop')).toBeInTheDocument()
  await expect.element(queryByText('Book')).not.toBeInTheDocument()
})
```

## Testing Library Integration

While Vitest provides official packages for popular frameworks (`vitest-browser-vue`, `vitest-browser-react`, `vitest-browser-svelte`), you can integrate with Testing Library for frameworks not yet officially supported.

### When to Use Testing Library

- Your framework doesn't have an official Vitest browser package yet
- You're migrating existing tests that use Testing Library
- You prefer Testing Library's API for specific testing scenarios

### Integration Pattern

The key is using `page.elementLocator()` to bridge Testing Library's DOM output with Vitest's browser mode APIs:

```jsx
// For Solid.js components
import { render } from '@testing-library/solid'
import { page } from 'vitest/browser'

test('Solid component handles user interaction', async () => {
  // Use Testing Library to render the component
  const { baseElement, getByRole } = render(() =>
    <Counter initialValue={0} />
  )

  // Bridge to Vitest's browser mode for interactions and assertions
  const screen = page.elementLocator(baseElement)

  // Use Vitest's page queries for finding elements
  const incrementButton = screen.getByRole('button', { name: /increment/i })

  // Use Vitest's assertions and interactions
  await expect.element(screen.getByText('Count: 0')).toBeInTheDocument()

  // Trigger user interaction using Vitest's page API
  await incrementButton.click()

  await expect.element(screen.getByText('Count: 1')).toBeInTheDocument()
})
```

### Available Testing Library Packages

Popular Testing Library packages that work well with Vitest:

- `@testing-library/solid` - For Solid.js
- `@marko/testing-library` - For Marko
- `@testing-library/svelte` - Alternative to `vitest-browser-svelte`
- `@testing-library/vue` - Alternative to `vitest-browser-vue`

**Migration Path**
If your framework gets official Vitest support later, you can gradually migrate by replacing Testing Library's `render` function while keeping most of your test logic intact.

## Best Practices

### 1. Use Browser Mode for CI/CD

Ensure tests run in real browser environments for the most accurate testing. Browser Mode provides accurate CSS rendering, real browser APIs, and proper event handling.

### 2. Test User Interactions

Simulate real user behavior using Vitest's Interactivity API. Use `page.getByRole()` and `userEvent` methods as shown in our Advanced Testing Patterns:

```tsx
// Good: Test actual user interactions
await page.getByRole('button', { name: /submit/i }).click()
await page.getByLabelText(/email/i).fill('user@example.com')

// Avoid: Testing implementation details
// component.setState({ email: 'user@example.com' })
```

### 3. Test Accessibility

Ensure components work for all users by testing keyboard navigation, focus management, and ARIA attributes. See our Testing Accessibility example for practical patterns:

```tsx
// Test keyboard navigation
await userEvent.keyboard('{Tab}')
await expect.element(document.activeElement).toHaveFocus()

// Test ARIA attributes
await expect.element(modal).toHaveAttribute('aria-modal', 'true')
```

### 4. Mock External Dependencies

Focus tests on component logic by mocking APIs and external services. This makes tests faster and more reliable. See our Isolation Strategy for examples:

```tsx
// For API requests, we recommend using MSW (Mock Service Worker)
// See: https://vitest.dev/guide/mocking/requests
// This provides more realistic request/response mocking

// For module mocking, use the import() syntax
vi.mock(import('../components/UserCard'), () => ({
  default: vi.fn(() => <div>Mocked UserCard</div>)
}))
```

### 5. Use Meaningful Test Descriptions

Write test descriptions that explain the expected behavior, not implementation details:

```tsx
// Good: Describes user-facing behavior
test('shows error message when email format is invalid')
test('disables submit button while form is submitting')

// Avoid: Implementation-focused descriptions
test('calls validateEmail function')
test('sets isSubmitting state to true')
```
