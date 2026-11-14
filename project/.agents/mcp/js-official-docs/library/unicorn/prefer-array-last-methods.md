---
title: "prefer-array-last-methods"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-array-last-methods.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-array-last-methods

📝 Prefer last-oriented array methods over `Array#reverse()` or `Array#toReversed()` followed by a method.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Prefer last-oriented array methods over reversing an array and then calling the forward method.

Last-oriented methods express the traversal direction directly and avoid reversing the array before the operation.

This rule reports `.reverse()` and `.toReversed()` followed by `.find()`, `.findIndex()`, `.indexOf()`, or `.reduce()`.

This rule only provides editor suggestions. The replacement can change observable behavior for mutation, sparse arrays, callback index or array arguments, and index-returning methods.

## Examples

```js
// ❌
const result = array.reverse().find(isUnicorn);

// ✅
const result = array.findLast(isUnicorn);
```

```js
// ❌
const result = array.toReversed().reduce(reducer, initialValue);

// ✅
const result = array.reduceRight(reducer, initialValue);
```
