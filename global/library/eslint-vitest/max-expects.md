---
title: "vitest/max-expects"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/max-expects.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/max-expects

📝 Enforce a maximum number of expect per test.

⚠️ This rule _warns_ in the 🌐 `all` config.

### Rule Details

Examples of **incorrect** code for this rule with `max: 1`:

```js
test('foo', () => {
  expect(1).toBe(1)
  expect(2).toBe(2)
})
```

Examples of **correct** code for this rule:

```js
test('foo', () => {
  expect(1).toBe(1)
})
```

### Options

| Name  | Description                                         | Type   | Default |
| :---- | :-------------------------------------------------- | :----- | :------ |
| `max` | Maximum number of `expect` calls allowed in a test. | Number | `5`     |

> Default: `5`

Maximum number of `expect` per test.

```js
{
  max: number
}
```
