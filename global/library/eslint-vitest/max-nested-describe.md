---
title: "vitest/max-nested-describe"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/max-nested-describe.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/max-nested-describe

📝 Require describe block to be less than set max value or default value.

⚠️ This rule _warns_ in the 🌐 `all` config.

## Rule Details

Examples of **incorrect** code for this rule with `max: 1`:

```js
describe('outer', () => {
  describe('inner', () => {
    // ...
  })
})
```

Examples of **correct** code for this rule:

```js
describe('inner', () => {
  // ...
})
```

## Options

| Name  | Description                                          | Type   | Default |
| :---- | :--------------------------------------------------- | :----- | :------ |
| `max` | Maximum allowed nesting depth for `describe` blocks. | Number | `5`     |

> Default: `5`

Maximum number of nested `describe` blocks.

```js
{
  max: number
}
```
