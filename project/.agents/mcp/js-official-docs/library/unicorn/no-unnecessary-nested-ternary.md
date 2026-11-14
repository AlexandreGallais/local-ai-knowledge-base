---
title: "no-unnecessary-nested-ternary"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unnecessary-nested-ternary.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unnecessary-nested-ternary

📝 Disallow unnecessary nested ternary expressions.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Nested ternary expressions are unnecessary when two branches use the same expression and the conditions can be combined with a logical operator.

## Examples

```js
// ❌
a ? (b ? c : d) : d;

// ✅
a && b ? c : d;
```

```js
// ❌
a ? d : (b ? d : c);

// ✅
a || b ? d : c;
```

```js
// ✅
a ? (b ? c : d) : e;
```
