---
title: "no-error-property-assignment"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-error-property-assignment.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-error-property-assignment

📝 Disallow assigning to built-in error properties.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

Disallow assigning to built-in error metadata after the error has been constructed.

The built-in `Error` constructors initialize and expose properties such as `name`, `stack`, `cause`, and `AggregateError#errors` as part of the error object. Overwriting them later can make logs, stack traces, or error handling misleading. Pass <example-value> data when constructing the error, or use an application-specific property instead.

This rule intentionally only checks error values that are syntactically known to be built-in errors. It does not infer unknown variables named `error` or custom error subclasses.

## Examples

```js
// ❌
Object.assign(new Error('message'), {name});

// ❌
const error = new Error('message');
error.stack = stack;

// ❌
Object.assign(new AggregateError(errors, 'message'), {errors});
```

```js
// ✅
Object.assign(error, {name});

// ✅
Object.assign(new Error('message'), {code});

// ✅
const error = new Error('message');
error.message = message;
```
