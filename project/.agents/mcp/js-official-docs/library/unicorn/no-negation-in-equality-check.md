---
title: "no-negation-in-equality-check"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-negation-in-equality-check.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-negation-in-equality-check

📝 Disallow negated expression in equality check.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

A negated expression inside an equality check is easy to misread and often indicates that the negation was applied at the wrong level.

## Examples

```js
// ❌
if (!foo === bar) {}
```

```js
// ❌
if (!foo !== bar) {}
```

```js
// ✅
if (foo !== bar) {}
```

```js
// ✅
if (!(foo === bar)) {}
```
