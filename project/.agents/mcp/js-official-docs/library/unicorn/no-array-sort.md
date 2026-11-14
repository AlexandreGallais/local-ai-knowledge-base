---
title: "no-array-sort"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-array-sort.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-array-sort

📝 Prefer `Array#toSorted()` over `Array#sort()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Prefer using `Array#toSorted()` over `Array#sort()`.

`Array#sort()` modifies the original array, while `Array#toSorted()` returns a new sorted array.

Known non-array receivers, such as `URLSearchParams`, are ignored, including when their type is provided by JSDoc.

## Examples

```js
// ❌
const sorted = [...array].sort();

// ✅
const sorted = array.toSorted();
```

```js
// ❌
const sorted = [...iterable].sort();

// ✅
const sorted = [...iterable].toSorted();
```

```js
// ❌
const sorted = [...array].sort((a, b) => a - b);

// ✅
const sorted = array.toSorted((a, b) => a - b);
```

## Options

Type: `object`

### allowExpressionStatement

Type: `boolean`\
Default: `true`

This rule allows `array.sort()` to be used as an expression statement by default.\
Pass `allowExpressionStatement: false` to forbid `Array#sort()` even if it's an expression statement.

```js
/* eslint unicorn/no-array-sort: ["error", {"allowExpressionStatement": false}] */
// ❌
array.sort();

// ✅
const sortedArray = array.toSorted();
```

## Related rules

- unicorn/no-array-reverse
