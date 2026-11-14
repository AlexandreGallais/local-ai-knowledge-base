---
title: "vitest/prefer-comparison-matcher"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-comparison-matcher.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-comparison-matcher

📝 Enforce using the built-in comparison matchers.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

This rule checks for comparisons in a test that could be replaced with one of the following built-in comparison matchers:

- `toBeGreaterThan`
- `toBeGreaterThanOrEqual`
- `toBeLessThan`
- `toBeLessThanOrEqual`

Examples of **incorrect** code for this rule:

```js
expect(x > 5).toBe(true)
expect(x < 7).not.toEqual(true)
expect(x <= y).toStrictEqual(true)
```

Examples of **correct** code for this rule:

```js
expect(x).toBeGreaterThan(5)
expect(x).not.toBeLessThanOrEqual(7)
expect(x).toBeLessThanOrEqual(y)

// special case - see below
expect(x < 'Carl').toBe(true)
// Rule only works on inters and big integers
```

Without type information, comparisons of string variables such as `expect(start < end).toBe(true)` are still reported, and the fix gives a matcher that throws for strings. Enable the plugin's `typecheck` setting so that comparisons are only reported when both operands are numbers or bigints:

```js
export default [
  {
    settings: {
      vitest: {
        typecheck: true,
      },
    },
  },
]
```
