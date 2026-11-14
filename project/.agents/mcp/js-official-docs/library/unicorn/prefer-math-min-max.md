---
title: "prefer-math-min-max"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-math-min-max.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-math-min-max

📝 Prefer `Math.min()` and `Math.max()` over ternaries for simple comparisons.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

This rule enforces the use of `Math.min()` and `Math.max()` functions instead of ternary expressions when performing simple comparisons, such as selecting the minimum or maximum value between two or more options.

By replacing ternary expressions with these functions, the code becomes more concise, easier to understand, and less prone to errors. It also enhances consistency across the codebase, ensuring that the same approach is used for similar operations, ultimately improving the overall readability and maintainability of the code.

## Examples

```js
// ❌
height > 50 ? 50 : height;

// ❌
height >= 50 ? 50 : height;

// ❌
height < 50 ? height : 50;

// ❌
height <= 50 ? height : 50;

// ✅
Math.min(height, 50);
```

```js
// ❌
height > 50 ? height : 50;

// ❌
height >= 50 ? height : 50;

// ❌
height < 50 ? 50 : height;

// ❌
height <= 50 ? 50 : height;

// ✅
Math.max(height, 50);
```

> **Note:**
> This rule offers suggestions instead of autofixes because comparisons and `Math.min()`/`Math.max()` handle `NaN`, signed zero, and non-number values differently. For example, `a > b ? a : b` returns `b` when `a` is `NaN`, while `Math.max(a, b)` returns `NaN`. Check these behaviors before applying a suggestion.
