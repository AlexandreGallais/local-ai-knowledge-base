---
title: "vitest/consistent-each-for"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/consistent-each-for.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/consistent-each-for

📝 Enforce using `.each` or `.for` consistently.

⚠️ This rule _warns_ in the 🌐 `all` config.

## Rule Details

Vitest provides two ways to run parameterized tests: `.each` and `.for`. This rule enforces consistency in the usage of these methods.

**Key <example-value>:**

- **`.each`**: Spreads array arguments to individual parameters
- **`.for`**: Keeps arrays intact, provides better TestContext support

This rule allows you to configure which method to prefer for different test function types (`test`, `it`, `describe`, `suite`).

Examples of **incorrect** code when configured to prefer `.for`:

```js
// { test: 'for' }
test.each([[1, 1, 2]])('test', (a, b, expected) => {
  expect(a + b).toBe(expected)
})
```

```js
// { describe: 'for' }
describe.each([[1], [2]])('suite %s', (n) => {
  test('test', () => {})
})
```

Examples of **correct** code when configured to prefer `.for`:

```js
// { test: 'for' }
test.for([[1, 1, 2]])('test', ([a, b, expected]) => {
  expect(a + b).toBe(expected)
})
```

```js
// { describe: 'for' }
describe.for([[1], [2]])('suite %s', ([n]) => {
  test('test', () => {})
})
```

Examples of **incorrect** code when configured to prefer `.each`:

```js
// { test: 'each' }
test.for([[1, 1, 2]])('test', ([a, b, expected]) => {
  expect(a + b).toBe(expected)
})
```

Examples of **correct** code when configured to prefer `.each`:

```js
// { test: 'each' }
test.each([[1, 1, 2]])('test', (a, b, expected) => {
  expect(a + b).toBe(expected)
})
```

```js
// { test: 'each' }
test.skip.each([[1, 2]])('test', (a, b) => {
  expect(a).toBeLessThan(b)
})
```

## Options

| Name       | Description                      | Type   | Choices       |
| :--------- | :------------------------------- | :----- | :------------ |
| `describe` | Preferred method for `describe`. | String | `each`, `for` |
| `it`       | Preferred method for `it`.       | String | `each`, `for` |
| `suite`    | Preferred method for `suite`.    | String | `each`, `for` |
| `test`     | Preferred method for `test`.     | String | `each`, `for` |

## Configuration

Typical configuration to enforce `.for` for tests and `.each` for describe blocks:

```js
// eslint.config.js
export default [
  {
    rules: {
      'vitest/consistent-each-for': [
        'warn',
        {
          test: 'for',
          it: 'for',
          describe: 'each',
          suite: 'each',
        },
      ],
    },
  },
]
```

You can configure each function type independently. If a function type is not configured, the rule won't enforce any preference for it.
