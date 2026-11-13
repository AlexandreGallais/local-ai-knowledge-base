---
title: "throw-new-error"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/throw-new-error.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# throw-new-error

📝 Require `new` when creating an error.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

While it's possible to create a new error without using the `new` keyword, it's better to be explicit.

This rule identifies error constructors by names such as `Error`, `TypeError`, and `CustomError`. Calls whose results are immediately called are ignored because they may be factories.

When TypeScript type information is available, calls that return a function or class are also ignored, including factories whose result is stored for later use.

## Examples

```js
// ❌
const error = Error('unicorn');

// ✅
const error = new Error('unicorn');
```

```js
// ❌
throw TypeError('unicorn');

// ✅
throw new TypeError('unicorn');
```

```js
// ❌
throw lib.TypeError('unicorn');

// ✅
throw new lib.TypeError('unicorn');
```
