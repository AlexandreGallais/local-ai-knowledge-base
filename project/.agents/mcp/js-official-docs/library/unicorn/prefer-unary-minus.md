---
title: "prefer-unary-minus"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-unary-minus.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-unary-minus

📝 Prefer the unary minus operator over multiplying or dividing by `-1`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Multiplying or dividing a value by `-1` is a roundabout way to negate it. The unary minus operator (`-x`) is shorter and states the intent directly.

This rule flags:

- `x * -1` and `-1 * x`
- `x / -1`

Division is not commutative, so `-1 / x` is left alone (it is `-1 / x`, not `-x`).

## Examples

```js
// ❌
const inverted = value * -1;

// ✅
const inverted = -value;
```

```js
// ❌
const flipped = -1 * someNumber;

// ✅
const flipped = -someNumber;
```

```js
// ❌
const divided = value / -1;

// ✅
const divided = -value;
```
