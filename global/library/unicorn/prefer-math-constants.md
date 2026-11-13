---
title: "prefer-math-constants"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-math-constants.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-math-constants

📝 Prefer `Math` constants over their approximate numeric values.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Hand-written numbers like `3.14` or `2.718` are imprecise approximations of `Math` constants. The built-in constants are more precise, self-documenting, and less error-prone than a truncated or rounded literal.

This rule covers the numeric `Math` properties: `Math.PI`, `Math.E`, `Math.LN2`, `Math.LN10`, `Math.LOG2E`, `Math.LOG10E`, `Math.SQRT2`, and `Math.SQRT1_2`.

Since the built-in value is not exactly equal to the approximate literal, replacing it could change a result, so this is a suggestion rather than an auto-fix.

## Examples

```js
// ❌
const area = 3.14 * radius ** 2;

// ✅
const area = Math.PI * radius ** 2;
```

```js
// ❌
const growth = amount * 2.718;

// ✅
const growth = amount * Math.E;
```

```js
// ❌
const diagonal = side * 1.4142;

// ✅
const diagonal = side * Math.SQRT2;
```
