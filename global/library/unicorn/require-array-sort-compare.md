---
title: "require-array-sort-compare"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/require-array-sort-compare.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# require-array-sort-compare

📝 Require a compare function when calling `Array#sort()` or `Array#toSorted()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Without an explicit compare function, `Array#sort()` and `Array#toSorted()` sort elements by converting them to strings, which produces unexpected results for numbers and other non-string values.

A typed array is never reported, because `TypedArray#sort()` already sorts numerically. Most array rules do report a typed array receiver, since it shares `Array`'s method surface.

## Examples

```js
// ❌ - Sorts as strings: [1, 10, 2, 20, 3]
const numbers = [3, 1, 10, 2, 20];
numbers.toSorted();

// ✅ - Properly numeric sort: [1, 2, 3, 10, 20]
const numbers = [3, 1, 10, 2, 20];
numbers.toSorted((a, b) => a - b);
```

```js
// ❌ - String sorting on numbers is wrong
[5, 10, 15, 2, 25].sort();
// → [10, 15, 2, 25, 5] (unexpected!)

// ✅
[5, 10, 15, 2, 25].sort((a, b) => a - b);
// → [2, 5, 10, 15, 25]
```

```js
// ❌ - Sorting strings without explicit compare
const names = ['Alice', 'bob', 'Charlie'];
names.sort();
// → ['Alice', 'Charlie', 'bob'] (case-sensitive)

// ✅ - Case-insensitive sorting
const names = ['Alice', 'bob', 'Charlie'];
names.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));
// → ['Alice', 'bob', 'Charlie']
```

```js
// ✅ - Descending order
const numbers = [3, 1, 4, 1, 5, 9];
numbers.sort((a, b) => b - a); // [9, 5, 4, 3, 1, 1]
```

> **Tip:**
> If you use typed linting, the `@typescript-eslint/require-array-sort-compare` rule is type-aware and can be more accurate.
