---
title: "no-boolean-sort-comparator"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-boolean-sort-comparator.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-boolean-sort-comparator

📝 Disallow boolean-returning sort comparators.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Comparators passed to `Array#sort()` and `Array#toSorted()` must return a negative number, a positive number, or zero. Returning `true` or `false` is the same as returning `1` or `0`, so the comparator can never say that the first item should come before the second item. This makes sorting unreliable and can produce different results across JavaScript engines.

Use subtraction for numeric values, or `String#localeCompare()` for strings.

This rule complements `require-array-sort-compare`, which only checks that a comparator exists. It also does not overlap with `prefer-simple-sort-comparator`, which simplifies valid numeric comparators that already return numbers.

This rule checks concise comparators, comparators with a single `return` statement, explicit boolean return type annotations, and comparator references that can be statically proven to return booleans. It intentionally does not do full control-flow analysis for multi-branch comparator bodies.

## Examples

```js
// ❌
array.sort((a, b) => a > b);

// ✅
array.sort((a, b) => a - b);
```

```js
// ❌
array.sort((a, b) => a.score >= b.score);

// ✅
array.sort((a, b) => a.score - b.score);
```

```js
// ❌
strings.toSorted((a, b) => a === b);

// ✅
strings.toSorted((a, b) => a.localeCompare(b));
```

```js
// ✅ Sorting strings
array.sort((a, b) => a.localeCompare(b));
```
