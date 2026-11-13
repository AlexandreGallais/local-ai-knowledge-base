---
title: "prefer-bigint-literals"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-bigint-literals.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-bigint-literals

📝 Prefer `BigInt` literals over the constructor.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

`BigInt` literals (with the `n` suffix) are more concise and efficient than calling the `BigInt()` constructor. Literals are evaluated at parse time, while constructor calls happen at runtime.

## Examples

```js
// ❌ - Constructor call
const bigint = BigInt(1);

// ✅ - Literal is more concise
const bigint = 1n;
```

```js
// ❌
const large = BigInt('9007199254740991');

// ✅
const large = 9007199254740991n;
```

```js
// ❌
const hex = BigInt('0xFF');

// ✅
const hex = 0xFFn;
```

```js
// ✅ - When you need to compute the value dynamically
const computed = BigInt(getSomeNumber());
```

```js
// ✅ - When working with very large numbers
const astronomicalNumber = 999999999999999999999999n;
```
