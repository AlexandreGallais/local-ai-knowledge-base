---
title: "no-useless-fallback-in-spread"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-useless-fallback-in-spread.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-useless-fallback-in-spread

📝 Disallow useless fallback when spreading in object literals.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Spreading falsy values in object literals won't add any unexpected properties, so it's unnecessary to add an empty object as fallback.

For conditional object spread style, see `consistent-conditional-object-spread`.

## Examples

```js
// ❌
const object = {...(foo || {})};

// ❌
const object = {...(foo ?? {})};

// ✅
const object = {...foo};
```

```js
// ✅
const object = {...(foo && {})};
```

```js
// ✅
const array = [...(foo || [])];
```
