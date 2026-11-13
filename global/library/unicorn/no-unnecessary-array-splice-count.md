---
title: "no-unnecessary-array-splice-count"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unnecessary-array-splice-count.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unnecessary-array-splice-count

📝 Disallow using `.length` or `Infinity` as the `deleteCount` or `skipCount` argument of `Array#{splice,toSpliced}()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

When calling `Array#splice(start, deleteCount)` and `Array#toSpliced(start, skipCount)`, omitting the `deleteCount` and `skipCount` argument will delete or skip all elements after `start`. Using `.length` or `Infinity` is unnecessary.

## Examples

```js
// ❌
const foo = array.toSpliced(1, array.length);

// ✅
const foo = array.toSpliced(1);
```

```js
// ❌
const foo = array.toSpliced(1, Infinity);

// ✅
const foo = array.toSpliced(1);
```

```js
// ❌
const foo = array.toSpliced(1, Number.POSITIVE_INFINITY);

// ✅
const foo = array.toSpliced(1);
```

```js
// ❌
array.splice(1, array.length);

// ✅
array.splice(1);
```

```js
// ❌
array.splice(1, Infinity);

// ✅
array.splice(1);
```

```js
// ❌
array.splice(1, Number.POSITIVE_INFINITY);

// ✅
array.splice(1);
```
