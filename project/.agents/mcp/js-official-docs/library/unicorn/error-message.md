---
title: "error-message"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/error-message.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# error-message

📝 Enforce passing a `message` value when creating a built-in error.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

This rule enforces a `message` value to be passed in when creating an instance of a built-in `Error` object, which leads to more readable and debuggable code.

## Examples

```js
// ❌
throw new Error();

// ❌
throw new Error('');

// ✅
throw new Error('Unexpected property.');
```

```js
// ❌
throw new TypeError();

// ✅
throw new TypeError('Array expected.');
```

```js
// ❌
const error = new AggregateError(errors);

// ✅
const error = new AggregateError(errors, 'Promises rejected.');
```

```js
// ❌
const error = new SuppressedError(error, suppressed);

// ✅
const error = new SuppressedError(error, suppressed, 'This is a suppressed error.');
```
