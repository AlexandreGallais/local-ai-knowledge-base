---
title: "no-chained-comparison"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-chained-comparison.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-chained-comparison

📝 Disallow chained comparisons such as `a < b < c`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Unlike in math (or Python), chained comparisons in JavaScript do not check a range. Comparison operators are binary and left-associative, so `a < b < c` parses as `(a < b) < c`. The first comparison evaluates to a boolean, which is then coerced to `0` or `1` and compared with `c`. This is almost always a bug.

Use `&&` to compare each pair of operands separately.

This rule leaves intentional patterns alone: comparing a comparison result against another boolean value with an equality operator, such as `(a > 0) === (b > 0)`, `(a < b) === true`, or `(a > 0) !== Boolean(b)`.

## Examples

```js
// ❌
if (a < b < c) {}

// ✅
if (a < b && b < c) {}
```

```js
// ❌
if (a === b === c) {}

// ✅
if (a === b && b === c) {}
```

```js
// ✅
// Intentionally comparing two boolean results.
if ((a > 0) === (b > 0)) {}
```
