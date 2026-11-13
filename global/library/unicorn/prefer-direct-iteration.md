---
title: "prefer-direct-iteration"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-direct-iteration.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-direct-iteration

📝 Prefer direct iteration over default iterator method calls.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Some built-ins expose their default iterator through both `Symbol.iterator` and a named method. For example, `Map#entries()` is the same iterator as `Map#Symbol.iterator`, and `Array#values()` is the same iterator as `Array#Symbol.iterator`.

When the result is immediately consumed as an iterable, the named method is redundant.

This rule reports:

- `.entries()` for `Map`, `FormData`, and `URLSearchParams`
- `.values()` for `Array`, typed arrays, and `Set`
- `.keys()` for `Set`

It intentionally does not report unknown receivers, or methods that are not equivalent to the default iterator, such as `Array#entries()`, `Map#values()`, or `Set#entries()`.

With TypeScript type information, this rule can also recognize supported built-ins through type aliases and inferred references. Without type information, it only uses direct syntax and simple annotations.

## Examples

```js
// ❌
const map = new Map();
for (const entry of map.entries()) {}
```

```js
// ✅
const map = new Map();
for (const entry of map) {}
```

```js
// ❌
const array = [1, 2, 3];
const values = [...array.values()];
```

```js
// ✅
const array = [1, 2, 3];
const values = [...array];
```

```js
// ❌
const map = new Map();
const copy = new Map(map.entries());
```

```js
// ✅
const map = new Map();
const copy = new Map(map);
```

```js
// ✅ — `Array#entries()` yields `[index, value]` pairs, while arrays iterate values by default
for (const entry of array.entries()) {}
```

```js
// ✅ — unknown receiver
for (const item of collection.values()) {}
```
