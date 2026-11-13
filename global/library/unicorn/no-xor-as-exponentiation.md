---
title: "no-xor-as-exponentiation"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-xor-as-exponentiation.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-xor-as-exponentiation

📝 Disallow the bitwise XOR operator where exponentiation was likely intended.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

In JavaScript, `^` is the bitwise XOR operator, not exponentiation. Developers coming from languages like Lua, Julia, R, or MATLAB, or from math notation, often expect `^` to mean “to the power of”, so `2 ^ 32` silently evaluates to `34` instead of `4294967296`. The actual exponentiation operator is `**`.

This rule flags `^` between two decimal integer literals, which is almost always this mistake. Hexadecimal, octal, and binary literals (such as `0xFF ^ 8`) and any non-literal operands (such as `flags ^ MASK`) are ignored, since those are far more likely to be intentional bitwise XOR.

## Examples

```js
// ❌
const kibibyte = 2 ^ 10; // 8, not 1024

// ✅
const kibibyte = 2 ** 10;
```

```js
// ❌
const cube = 3 ^ 3; // 0, not 27

// ✅
const cube = 3 ** 3;
```
