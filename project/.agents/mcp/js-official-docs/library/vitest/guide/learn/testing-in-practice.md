---
title: "Testing in Practice | Guide (part 1 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/learn/testing-in-practice.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Testing in Practice

The previous pages covered the Vitest API: assertions, mocking, snapshots, and test lifecycle hooks. This page focuses on applying those tools to real code. It covers how to decide what to test, how to structure tests effectively, and how to organize test files as a project grows.

## What to Test

When you sit down to write tests for a function or module, start by thinking about its **contract**: what does it promise to do for the code that calls it? The contract is defined by its inputs (arguments, configuration) and its outputs (return values, side effects, errors). These are the things your tests should verify.

Consider a `formatPrice` function:

```js
export function formatPrice(amount, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}
```

The contract here is: given an amount and a currency code, return a formatted price string. Good tests for this function would cover:

```js
import { expect, test } from 'vitest'
import { formatPrice } from './formatPrice.js'

test('formats USD prices', () => {
  expect(formatPrice(10, 'USD')).toBe('$10.00')
})

test('formats EUR prices', () => {
  expect(formatPrice(10, 'EUR')).toBe('€10.00')
})

test('handles zero', () => {
  expect(formatPrice(0, 'USD')).toBe('$0.00')
})

test('handles negative amounts', () => {
  expect(formatPrice(-5.5, 'USD')).toBe('-$5.50')
})

test('rounds to two decimal places', () => {
  expect(formatPrice(10.999, 'USD')).toBe('$11.00')
})
```

Notice what these tests _don't_ do. They don't check which internal `Intl.NumberFormat` options were passed, or whether an intermediate variable was set. They only check the output.

**Tip:**
A good rule of thumb: if someone refactors the internals but the output stays the same, should the test break? If it would, you're probably testing implementation details rather than behavior.

## Structuring a Test

Most tests follow a natural three-part structure, sometimes called "Arrange, Act, Assert":

1. **Set up** the data your test needs
2. **Call** the function or perform the action you're testing
3. **Check** that the result matches your expectations

```js
test('removes an item from the list', () => {
  // Set up
  const list = new ShoppingList()
  list.add('milk')
  list.add('bread')

  // Act
  list.remove('milk')

  // Check
  expect(list.getItems()).toEqual(['bread'])
})
```

You don't need comments labeling each section. The structure becomes natural once you've written a few tests. The important thing is keeping each test focused on one behavior.

### One Behavior Per Test

If you find yourself writing "and" in a test name ("formats price and handles errors and logs the result"), that's a sign you should split it into separate tests.

### Descriptive Names

Write test names that describe the behavior, not the implementation. "returns formatted price for USD" is better than "calls Intl.NumberFormat with correct options". When a test fails, the name should tell you what broke without having to read the test body.

## Testing Edge Cases

After covering the main behavior, think about the boundaries. What happens at the edges? What inputs are unusual but valid? What should happen when things go wrong?

Here's an example with a `parseAge` function that takes user input and returns a number:

```js
export function parseAge(input) {
  const age = Number(input)
  if (Number.isNaN(age) || age < 0 || age > 150) {
    throw new Error(`Invalid age: ${input}`)
  }
  return Math.floor(age)
}
```

The happy path is straightforward, but the edge cases are where bugs hide:

```js
import { expect, test } from 'vitest'
import { parseAge } from './parseAge.js'

test('parses a valid age', () => {
  expect(parseAge('25')).toBe(25)
})

test('rounds down decimal ages', () => {
  expect(parseAge('25.9')).toBe(25)
})

test('handles zero', () => {
  expect(parseAge('0')).toBe(0)
})

test('handles the upper boundary', () => {
  expect(parseAge('150')).toBe(150)
})

test('throws for negative numbers', () => {
  expect(() => parseAge('-1')).toThrow('Invalid age: -1')
})

test('throws for numbers above 150', () => {
  expect(() => parseAge('151')).toThrow('Invalid age: 151')
})

test('throws for non-numeric strings', () => {
  expect(() => parseAge('abc')).toThrow('Invalid age: abc')
})

test('throws for empty string', () => {
  expect(() => parseAge('')).toThrow('Invalid age: ')
})
```

You don't need to test every possible input. Focus on the boundaries (0, 150, 151, -1), the error paths, and the types of inputs your function might realistically receive.

**Tip:**
If you're unsure whether an edge case matters, ask yourself: could a real user or a real caller trigger this? If yes, test it.

### Property-Based Testing

For functions with a wide range of valid inputs, manually choosing edge cases can only go so far. **Property-based testing** is a technique where you describe the _properties_ that should hold for any input, and the testing framework generates hundreds of random inputs to try to find one that breaks.

For example, you might say "for any valid age string, `parseAge` should return a non-negative integer" and let the tool find the counterexample. fast-check is a popular property-based testing library that integrates well with Vitest. It's an advanced technique, but worth knowing about as your testing needs grow.

## When to Mock

Mocking is a powerful tool, but it's easy to overuse.

### Slow Dependencies

Network requests, file system operations, and database calls can make your tests take seconds instead of milliseconds. Replace them with mocks to keep the feedback loop fast.

For HTTP requests specifically, consider using Mock Service Worker instead of mocking fetch directly. See the Mocking Requests guide for setup instructions.

### Non-Deterministic Values

If your code depends on the current date, a random number, or a UUID generator, mock those to make your tests predictable. Vitest provides `vi.useFakeTimers()` and `vi.setSystemTime()` for controlling time in tests.

### What Not to Mock

Don't mock the thing you're testing. If you're testing a `UserService`, don't mock the `UserService`. Mock its _dependencies_ (the database, the email sender) and let the service itself run for real.

Also, prefer real implementations when they're fast and reliable. If a dependency is a simple in-memory data structure or a pure function, there's no reason to mock it. The closer your tests are to real usage, the more confidence they give you.

**Tip:**
Only reach for mocks when the real thing is slow, flaky, or has side effects you can't control in a test.

## Fixing Bugs with Tests

When you find a bug, it's tempting to jump straight into the code and fix it. A better approach is to write a failing test first that reproduces the bug, then fix the code and watch the test turn green.

This has several benefits. The test proves the bug is real and not just a misunderstanding. It documents exactly what was broken. And it prevents the same bug from coming back later, because the test will catch it if someone accidentally reintroduces the same problem.

Here's what this looks like in practice. Suppose users report that `parseAge` crashes when given a string with leading spaces like `" 25"`. First, write a test that reproduces the problem:

```js
test('handles leading spaces', () => {
  expect(parseAge(' 25')).toBe(25)
})
```

Run it and confirm it fails. Now you know exactly what's broken and have a clear target. Fix the implementation:

```js
export function parseAge(input) {
  const age = Number(input.trim())
  // ...
}
```

Run the test again. It passes. The bug is fixed, and you have a regression test that will catch it if someone removes the `.trim()` call later.

**Tip:**
If you use AI agents to fix bugs, configure them to follow the same principle: reproduce the issue with a failing test first, then fix the code. This prevents the agent from "fixing" a bug by changing the test instead of the code, and gives you confidence that the fix actually works.

## Organizing Test Files

There's no single right way to organize tests, but some patterns scale better than others.

### File Layout

The simplest starting point is one test file per source file. For every `utils.js`, there's a `utils.test.js` right next to it. This makes it easy to find the tests for any given piece of code, and most editors will show them side by side in the file tree:

```
src/
  utils.js
  utils.test.js
  formatPrice.js
  formatPrice.test.js
```

Some teams prefer a separate `__tests__` or `test` directory instead. Either approach works. The important thing is consistency across the project. Vitest's `include` pattern matches both layouts by default.

### Grouping with `describe`

When a module exports multiple functions, use `describe` blocks to group the tests for each one. This keeps the test output organized and makes it clear which function a failing test belongs to:

```js
describe('formatPrice', () => {
  test('formats USD prices', () => { /* ... */ })
  test('handles zero', () => { /* ... */ })
})

describe('parseAmount', () => {
  test('parses valid amounts', () => { /* ... */ })
  test('throws for invalid input', () => { /* ... */ })
})
```

Avoid nesting `describe` blocks more than one or two levels deep. Deeply nested test trees are hard to read and usually mean the source module is doing too many things at once.

### Splitting Large Files

As a project grows, some test files will inevitably get long. If a test file grows beyond a few hundred lines, consider splitting it by theme or feature area. For example, `userService.test.js` might become `userService.creation.test.js` and `userService.auth.test.js`. This also makes it faster to run a subset of tests during development.

### Naming Tests

Test names matter more than you might expect. When a test fails in CI, the name is often the first thing someone reads. Names like "works correctly" or "handles edge case" don't tell you what broke.

Prefer names that describe the specific behavior: "returns 0 for an empty cart", "throws if the email format is invalid", "preserves existing items when adding a new one". The test output should read like a specification of what the module does.
