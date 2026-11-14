---
title: "no-unnecessary-boolean-comparison"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unnecessary-boolean-comparison.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unnecessary-boolean-comparison

📝 Disallow unnecessary comparisons against boolean literals.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Comparing a value that is already known to be boolean against `true` or `false` adds noise without changing the result.

This rule only reports comparisons where the non-literal side is known to be boolean. It intentionally does not report unknown values like `value === true`, because strict identity comparison against `true` is not equivalent to a truthiness check.

JSDoc and TypeScript annotations support checks after string transformations and array joins, such as `text.trim().includes('unicorn')` and `values.join(',').includes('unicorn')`.

## Examples

```js
// ❌
if ((a > b) === true) {}

// ✅
if (a > b) {}
```

```js
// ❌
if ((a > b) === false) {}

// ✅
if (!(a > b)) {}
```

```js
// ❌
const active = Boolean(value) !== false;

// ✅
const active = Boolean(value);
```

```js
// ✅
if (value === true) {}
```
