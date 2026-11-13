---
title: "no-unnecessary-slice-end"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unnecessary-slice-end.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unnecessary-slice-end

📝 Disallow using `.length` or `Infinity` as the `end` argument of `{Array,String,TypedArray}#slice()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

When calling `{String,Array,TypedArray}#slice(start, end)`, omitting the `end` argument defaults it to the object's `.length`. Passing it explicitly or using `Infinity` is unnecessary.

## Examples

```js
// ❌
const foo = string.slice(1, string.length);

// ✅
const foo = string.slice(1);
```

```js
// ❌
const foo = string.slice(1, Infinity);

// ✅
const foo = string.slice(1);
```

```js
// ❌
const foo = string.slice(1, Number.POSITIVE_INFINITY);

// ✅
const foo = string.slice(1);
```
