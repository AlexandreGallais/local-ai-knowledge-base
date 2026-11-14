---
title: "vitest/no-conditional-expect"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-conditional-expect.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-conditional-expect

📝 Disallow conditional expects.

💼⚠️ This rule is enabled in the ✅ `recommended` config. This rule _warns_ in the 🌐 `all` config.

## Rule Details

This rule aims to prevent false positive test results by highlighting conditional expect statements.

Examples of **incorrect** code for this rule:

```ts
test('foo', () => {
  if (false) {
    expect(1).toBe(1)
  }
})

test.for([null, { bar: 'baz' }])('quux', (value) => {
  const expected = value === null ? expected : expect.stringContaining(expected)
  expect(actual).toEqual(expected)
})
```

Examples of **correct** code for this rule:

```ts
test('foo', () => {
  expect(1).toBe(1)
})

test.for([null, expect.objectContaining({ bar: 'baz' })])(
  'quux',
  (expected) => {
    expect(actual).toEqual(expected)
  },
)
```

## Options

| Name               | Description                                                      | Type    | Default |
| :----------------- | :--------------------------------------------------------------- | :------ | :------ |
| `expectAssertions` | Enable/disable whether expect.assertions() is taken into account | Boolean | `false` |

#### expectAssertions

```json
{
  "rules": {
    "vitest/no-conditional-expect": ["error", { "expectAssertions": true }]
  }
}
```

Enable/disable whether to take the usage of `expect.assertions()` into account. Setting this to true will allow conditional expressions only if a call to `expect.assertions()` is also made.

```ts
test('foo', () => {
  expect.assertions(1)

  if (true) {
    expect(1).toBe(1)
  }
})
```
