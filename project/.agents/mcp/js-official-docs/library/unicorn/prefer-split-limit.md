---
title: "prefer-split-limit"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-split-limit.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-split-limit

📝 Prefer `String#split()` with a limit.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

When you only need a prefix of the results from splitting a string, pass a `limit` to `String#split()`. This can improve performance by allowing the method to stop once enough parts have been produced, and it makes your intent clearer.

This rule checks two patterns with a non-empty string literal or regular expression literal separator: direct array destructuring in a variable declaration or standalone assignment expression, and direct access using a statically known non-negative integer index.

## Examples

```js
// ❌ - Splits entire string, then accesses index 0
const protocol = url.split(':')[0]; // Could be long URL

// ✅ - Splits into at most one part
const protocol = url.split(':', 1)[0]; // More efficient
```

```js
// ❌ - Gets second part from full split
const [, filename] = path.split('/');

// ✅ - Splits into at most two parts while preserving the destructuring
const [, filename] = path.split('/', 2);
```

```js
// ❌
const part = csvLine.split(',')[3];

// ✅ - Limit is the index plus one so the element can be produced
const part = csvLine.split(',', 4)[3];
```

```js
// ✅ - Accessing negative index (needs full array)
const lastPart = string.split('/').at(-1);

// ✅ - Unknown separator or index
const parts = string.split(dynamicSeparator)[unknownIndex];

// ✅ - The rest element needs all remaining parts
const [firstPart, ...remainingParts] = string.split('/');
```

> **Note:**
> Performance benefits depend on the JavaScript engine. The main benefit is clearer intent showing you only need specific parts.
