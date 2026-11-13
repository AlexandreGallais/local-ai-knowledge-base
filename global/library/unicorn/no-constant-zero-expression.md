---
title: "no-constant-zero-expression"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-constant-zero-expression.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-constant-zero-expression

📝 Disallow arithmetic and bitwise operations that always evaluate to `0`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Multiplying by `0`, doing a bitwise AND with `0`, or dividing `0` by something always produces `0` regardless of the other operand. This is almost never intentional. It usually means a typo, leftover debugging code, or a misunderstanding (for example, `* 1` was intended, or the wrong variable is being used).

This rule flags:

- `x * 0` and `0 * x`
- `x & 0` and `0 & x`
- `0 / x`

In JavaScript these do not always reduce to a clean `0`: a non-numeric or non-finite operand can produce `NaN`, a negative operand can produce `-0`, and the operand may have side effects. Replacing the expression with `0` could therefore change behavior and would hide the underlying mistake, so the rule only offers a suggestion to replace with `0` when the whole expression provably folds to exactly `0`.

## Examples

```js
// ❌
const total = price * 0;

// ✅
const total = 0;
```

```js
// ❌
const flags = mask & 0;

// ✅
const flags = 0;
```

```js
// ❌
const ratio = 0 / count;

// ✅
const ratio = 0;
```
