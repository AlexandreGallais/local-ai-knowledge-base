---
title: "prefer-aggregate-error"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-aggregate-error.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-aggregate-error

📝 Prefer `AggregateError` when throwing collected errors.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

This rule enforces using `AggregateError` when a collected array of `Error` instances or built-in `Error` subclasses is checked before throwing a generic `Error`.

`AggregateError` keeps the collected errors available on the thrown error instead of losing them behind a summary message. Fixes preserve the original message and options.

The rule intentionally targets only direct guarded throws where the collection name clearly refers to errors and the error collection is evident from TypeScript annotations or type information. Custom error subclasses require type information. More indirect collection flow is ignored.

## Examples

```ts
// ❌
const errors: Error[] = [new Error('Email is required.')];

if (errors.length > 0) {
	throw new Error('Validation failed.');
}

// ✅
const errors: Error[] = [new Error('Email is required.')];

if (errors.length > 0) {
	throw new AggregateError(errors, 'Validation failed.');
}
```

```ts
// ❌
const validationErrors: TypeError[] = [new TypeError('Invalid email.')];

if (validationErrors.length !== 0) {
	throw new Error('Validation failed.', {cause});
}

// ✅
const validationErrors: TypeError[] = [new TypeError('Invalid email.')];

if (validationErrors.length !== 0) {
	throw new AggregateError(validationErrors, 'Validation failed.', {cause});
}
```
