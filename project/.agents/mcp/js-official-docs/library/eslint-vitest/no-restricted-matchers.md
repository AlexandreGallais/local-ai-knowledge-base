---
title: "vitest/no-restricted-matchers"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-restricted-matchers.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-restricted-matchers

📝 Disallow the use of certain matchers.

⚠️ This rule _warns_ in the 🌐 `all` config.

### Rule Details

This rule disallows the use of certain matchers.

### Options

```json
{
  "vitest/no-restricted-matchers": [
    "error",
    {
      "not": null
    }
  ]
}
```

Examples of **incorrect** code for this rule with the above configuration

```js
expect(a).not.toBe(b)
```

Examples of **correct** code for this rule with the above configuration

```js
expect(a).toBe(b)
```
