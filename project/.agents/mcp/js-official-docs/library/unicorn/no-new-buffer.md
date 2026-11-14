---
title: "no-new-buffer"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-new-buffer.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-new-buffer

📝 Enforce the use of `Buffer.from()` and `Buffer.alloc()` instead of the deprecated `new Buffer()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Enforces the use of Buffer.from and Buffer.alloc() instead of new Buffer(), which has been deprecated since Node.js 4.

When the first argument's type is unknown, the rule offers suggestions because additional arguments do not distinguish a numeric size from data. A string encoding as the second argument is the exception, since both forms throw for a numeric input, so `new Buffer(data, 'base64')` is automatically fixed.

Numeric inputs with extra arguments are also offered as suggestions because removing those arguments can change errors or evaluation. Numeric inputs with only a size are automatically fixed.

## Examples

```js
// ❌
const buffer = new Buffer('7468697320697320612074c3a97374', 'hex');

// ✅
const buffer = Buffer.from('7468697320697320612074c3a97374', 'hex');
```

```js
// ❌
const buffer = new Buffer([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);

// ✅
const buffer = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72])
```

```js
// ❌
const buffer = new Buffer(10);

// ✅
const buffer = Buffer.alloc(10);
```
