---
title: "no-confusing-array-splice"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-confusing-array-splice.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-confusing-array-splice

📝 Disallow confusing uses of `Array#{splice,toSpliced}()`.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

💡 This rule is manually fixable by editor suggestions.

Some `Array#splice()` and `Array#toSpliced()` calls are harder to read than the operation they express.

Use assignment when replacing one element in place, and use `Array#with()` when creating a copy with one element replaced. Resolve negative indexes before assigning with bracket notation.

For insertion at `-1`, prefer spelling out the intended boundary behavior instead of relying on `splice()` index normalization.

This rule does not automatically fix code because `splice()`, `toSpliced()`, assignment, and `with()` behave differently for return values, negative indexes, and out-of-range indexes.

## Examples

```js
// ❌
array.splice(index, 1, element);

// ✅
array[index] = element;
```

```js
// ❌
const result = array.toSpliced(index, 1, element);

// ✅
const result = array.with(index, element);
```

```js
// ❌
array.splice(-1, 0, element);

// ✅
const insertionIndex = Math.max(array.length - 1, 0);
array.splice(insertionIndex, 0, element);
```

```js
// ❌
const result = array.toSpliced(-1, 0, element);

// ✅
const insertionIndex = Math.max(array.length - 1, 0);
const result = array.toSpliced(insertionIndex, 0, element);
```
