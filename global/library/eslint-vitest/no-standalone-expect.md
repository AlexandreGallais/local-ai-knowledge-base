---
title: "vitest/no-standalone-expect"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-standalone-expect.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-standalone-expect

📝 Disallow using `expect` outside of `it` or `test` blocks.

💼⚠️ This rule is enabled in the ✅ `recommended` config. This rule _warns_ in the 🌐 `all` config.

## Rule Details

This rule aims to prevent the use of `expect` outside of `it` or `test` blocks.

### Options

| Name                           | Description                                                 | Type     | Default |
| :----------------------------- | :---------------------------------------------------------- | :------- | :------ |
| `additionalTestBlockFunctions` | Additional functions that should be treated as test blocks. | String[] | `[]`    |

```json
{
  "vitest/no-standalone-expect": [
    "error",
    {
      "additionalTestBlockFunctions": ["test"]
    }
  ]
}
```

example:

```js
// invalid

expect(1).toBe(1)

// valid

it('should be 1', () => {
  expect(1).toBe(1)
})
```
