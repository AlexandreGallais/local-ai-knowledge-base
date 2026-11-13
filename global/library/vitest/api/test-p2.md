---
title: "Test (part 2 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/test.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Test (part 2 of 2)

## test.each

- **Alias:** `it.each`

**Tip:**
While `test.each` is provided for Jest compatibility,
Vitest also has `test.for` with an additional feature to integrate `TestContext`.

Use `test.each` when you need to run the same test with different variables.
You can inject parameters with printf formatting in the test name in the order of the test function parameters.

- `%s`: string
- `%d`: number
- `%i`: integer
- `%f`: floating point value
- `%j`: json
- `%o`: object
- `%#`: 0-based index of the test case
- `%$`: 1-based index of the test case
- `%%`: single percent sign ('%')

```ts
import { expect, test } from 'vitest'

test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('add(%i, %i) -> %i', (a, b, expected) => {
  expect(a + b).toBe(expected)
})

// this will return
// ✓ add(1, 1) -> 2
// ✓ add(1, 2) -> 3
// ✓ add(2, 1) -> 3
```

You can also access object properties and array elements with `$` prefix:

```ts
test.each([
  { a: 1, b: 1, expected: 2 },
  { a: 1, b: 2, expected: 3 },
  { a: 2, b: 1, expected: 3 },
])('add($a, $b) -> $expected', ({ a, b, expected }) => {
  expect(a + b).toBe(expected)
})

// this will return
// ✓ add(1, 1) -> 2
// ✓ add(1, 2) -> 3
// ✓ add(2, 1) -> 3

test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('add($0, $1) -> $2', (a, b, expected) => {
  expect(a + b).toBe(expected)
})

// this will return
// ✓ add(1, 1) -> 2
// ✓ add(1, 2) -> 3
// ✓ add(2, 1) -> 3
```

You can also access Object attributes with `.`, if you are using objects as arguments:

```ts
test.each`
a               | b      | expected
${{ val: 1 }}   | ${'b'} | ${'1b'}
${{ val: 2 }}   | ${'b'} | ${'2b'}
${{ val: 3 }}   | ${'b'} | ${'3b'}
`('add($a.val, $b) -> $expected', ({ a, b, expected }) => {
  expect(a.val + b).toBe(expected)
})

// this will return
// ✓ add(1, b) -> 1b
// ✓ add(2, b) -> 2b
// ✓ add(3, b) -> 3b
```

- First row should be column names, separated by `|`;
- One or more subsequent rows of data supplied as template literal expressions using `${value}` syntax.

```ts
import { expect, test } from 'vitest'

test.each`
  a               | b      | expected
  ${1}            | ${1}   | ${2}
  ${'a'}          | ${'b'} | ${'ab'}
  ${[]}           | ${'b'} | ${'b'}
  ${{}}           | ${'b'} | ${'[object Object]b'}
  ${{ asd: 1 }}   | ${'b'} | ${'[object Object]b'}
`('returns $expected when $a is added $b', ({ a, b, expected }) => {
  expect(a + b).toBe(expected)
})
```

**Tip:**
Vitest formats interpolated title values with its display formatter. If the value is too truncated, you can increase taskTitleValueFormatTruncate in your config file.

## test.for

- **Alias:** `it.for`

Alternative to `test.each` to provide `TestContext`.

The difference from `test.each` lies in how arrays are provided in the arguments.
Non-array arguments to `test.for` (including template string usage) work exactly the same as for `test.each`.

```ts
// `each` spreads arrays
test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('add(%i, %i) -> %i', (a, b, expected) => { // [!code --]
  expect(a + b).toBe(expected)
})

// `for` doesn't spread arrays (notice the square brackets around the arguments)
test.for([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('add(%i, %i) -> %i', ([a, b, expected]) => { // [!code ++]
  expect(a + b).toBe(expected)
})
```

The 2nd argument is `TestContext` and can be used for concurrent snapshots, for example:

```ts
test.concurrent.for([
  [1, 1],
  [1, 2],
  [2, 1],
])('add(%i, %i)', ([a, b], { expect }) => {
  expect(a + b).toMatchSnapshot()
})
```

## test.describe <Version>4.1.0</Version> {#test-describe}

Scoped `describe`. See describe for more information.

## test.suite <Version>4.1.0</Version> {#test-suite}

Alias for `suite`. See describe for more information.

## test.beforeEach

Scoped `beforeEach` hook that inherits types from `test.extend`. See beforeEach for more information.

## test.afterEach

Scoped `afterEach` hook that inherits types from `test.extend`. See afterEach for more information.

## test.beforeAll

Scoped `beforeAll` hook that inherits types from `test.extend`. See beforeAll for more information.

## test.afterAll

Scoped `afterAll` hook that inherits types from `test.extend`. See afterAll for more information.

## test.aroundEach <Version>4.1.0</Version> {#test-aroundeach}

Scoped `aroundEach` hook that inherits types from `test.extend`. See aroundEach for more information.

## test.aroundAll <Version>4.1.0</Version> {#test-aroundall}

Scoped `aroundAll` hook that inherits types from `test.extend`. See aroundAll for more information.

## bench <Experimental /> {#bench}

**Updated in Vitest 5**
The benchmarking API has been rewritten. `bench` is no longer a top-level import from `vitest`, and the `bench.skip` / `bench.only` / `bench.todo` helpers have been removed. `bench` is now a test-context fixture accessed from inside a `test()`.

See the Benchmarking guide for the new API.
