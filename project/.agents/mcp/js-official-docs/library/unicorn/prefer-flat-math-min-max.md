---
title: "prefer-flat-math-min-max"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-flat-math-min-max.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-flat-math-min-max

📝 Prefer flat `Math.min()` and `Math.max()` calls over nested calls.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

`Math.min()` and `Math.max()` accept any number of arguments, so nesting the same call is unnecessary.

The autofix does not preserve the coercion order of nested arguments: flattening converts them to numbers after later arguments are evaluated.

## Examples

```js
// ❌
const biggest = Math.max(Math.max(a, b), c);

// ✅
const biggest = Math.max(a, b, c);
```

```js
// ❌
const smallest = Math.min(a, Math.min(b, c));

// ✅
const smallest = Math.min(a, b, c);
```

```js
// ✅
const clamped = Math.max(Math.min(value, upper), lower);
```
