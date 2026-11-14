---
title: "prefer-number-coercion"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-number-coercion.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-number-coercion

📝 Prefer `Number()` over `parseFloat()` and base-10 `parseInt()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

`parseFloat()` and `parseInt()` parse the longest valid numeric prefix and ignore trailing invalid text. `Number()` parses the whole value, so it better matches code that expects a stringified number.

Keep using `parseFloat()` when you intentionally want to extract a numeric prefix, like parsing `'50px'` as `50`.

This rule does not report `parseInt(value)` without a radix. Use ESLint's `radix` rule if you want to require explicit radices.

## Examples

```js
// ❌
const number = parseFloat(value);

// ✅
const number = Number(value);
```

```js
// ❌
const number = Number.parseFloat(value);

// ✅
const number = Number(value);
```

```js
// ❌
const integer = parseInt(value, 10);

// ✅
const integer = Math.trunc(Number(value));
```

```js
// ❌
const integer = Number.parseInt(value, 10);

// ✅
const integer = Math.trunc(Number(value));
```

```js
// ✅
const integer = parseInt(value);
```

```js
// ✅
const integer = Number.parseInt(value, 16);
```
