---
title: "no-array-sort-for-min-max"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-array-sort-for-min-max.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-array-sort-for-min-max

📝 Disallow sorting arrays to get the minimum or maximum value.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Sorting an entire array just to read the first or last item does unnecessary `O(n log n)` work. Use `Math.min()` or `Math.max()` for numeric minimum and maximum values.

This rule reports only simple numeric comparators. Custom comparators, string sorting, object-key <example-value>, and multi-key <example-value> are ignored.

This rule is not autofixable because replacing a sort chain can change behavior. `Array#sort()` mutates, empty arrays produce different results, sparse arrays and `NaN` can behave differently, and spreading very large arrays can fail. Editor suggestions are provided for the common case where the replacement is intended.

## Examples

```js
// ❌
const minimum = array.sort((a, b) => a - b)[0];

// ❌
const minimum = array.toSorted((a, b) => a - b).at(0);

// ✅
const minimum = Math.min(...array);
```

```js
// ❌
const maximum = array.sort((a, b) => a - b).at(-1);

// ❌
const maximum = array.toSorted((a, b) => b - a)[0];

// ✅
const maximum = Math.max(...array);
```

```js
// ✅
const sorted = array.toSorted((a, b) => a - b);

// ✅
const first = array.toSorted((a, b) => a.value - b.value)[0];
```
