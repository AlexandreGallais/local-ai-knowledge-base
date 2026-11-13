---
title: "no-array-fill-with-reference-type"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-array-fill-with-reference-type.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-array-fill-with-reference-type

📝 Disallow using reference values as `Array#fill()` values.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

`Array#fill()` uses the same value for every array element. When that value is a reference, mutating one element also affects the others.

Create the value inside an `Array.from()` mapping function when each array element should receive a fresh object.

A receiver known not to be an array is ignored, including a typed array, since `TypedArray#fill()` coerces the value to a number and no two elements can end up sharing a reference. Unknown receivers are still reported.

Without type-aware linting, TypeScript calls to local function declarations and `const` function initializers are classified from explicit return annotations. Variable annotations, assertions, generics, overloads, imports, and inferred returns require type-aware linting.

## Examples

```js
// ❌
new Array(3).fill({});
```

```js
// ✅
Array.from({length: 3}, () => ({}));
```

```js
// ❌
const value = new Map();
array.fill(value);
```

```js
// ✅
array.fill(0);
```
