---
title: "no-impossible-length-comparison"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-impossible-length-comparison.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-impossible-length-comparison

📝 Disallow impossible comparisons against `.length` or `.size`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

The `length` property of arrays and strings, and the `size` property of built-in collections, represent a count, so they cannot be negative. Comparing them against a negative bound, or checking whether they are at least zero, is either always `false` or always `true`, which usually means the wrong value or comparison operator was used.

## Examples

```js
// ❌
if (array.length < 0) {}

// ❌
if (string.length === -1) {}

// ❌
if (set.size <= -1) {}

// ❌
if (array.length >= 0) {}
```

```js
// ✅
if (array.length === 0) {}

// ✅
if (array.length > 0) {}

// ✅
if (set.size >= 1) {}
```

This rule intentionally ignores obvious custom object shape checks such as `dimensions.width && dimensions.length < 0`, where `length` may be a domain-specific property instead of collection cardinality. For other intentional custom negative `length` or `size` properties, use an ESLint disable comment.
