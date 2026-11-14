---
title: "no-magic-array-flat-depth"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-magic-array-flat-depth.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-magic-array-flat-depth

📝 Disallow a magic number as the `depth` argument in `Array#flat(…).`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

When calling `Array#flat(depth)`, the depth argument should normally be `1` or `Infinity`, otherwise it should be a meaningful variable name or explained with a comment.

A bare depth number does not explain why that particular nesting depth is required, so naming or commenting it preserves intent for readers.

ESLint disable and enable directives are not treated as explanations.

## Examples

```js
// ❌
const foo = array.flat(2);
```

```js
// ❌
const foo = array.flat(99);
```

```js
// ✅
const foo = array.flat();
```

```js
// ✅
const foo = array.flat(Number.POSITIVE_INFINITY);
```

```js
// ✅
const foo = array.flat(Infinity);
```

```js
// ✅
const foo = array.flat(depth);
```

```js
// ✅
const foo = array.flat(/* The depth is always 2 */ 2);
```
