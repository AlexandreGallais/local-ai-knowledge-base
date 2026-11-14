---
title: "no-array-reverse"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-array-reverse.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-array-reverse

📝 Prefer `Array#toReversed()` over `Array#reverse()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Prefer using `Array#toReversed()` over `Array#reverse()`.

`Array#reverse()` modifies the original array, while `Array#toReversed()` returns a new reversed array.

## Examples

```js
// ❌
const reversed = [...array].reverse();

// ✅
const reversed = [...array].toReversed();
```

## Options

Type: `object`

### allowExpressionStatement

Type: `boolean`\
Default: `true`

This rule allows `array.reverse()` to be used as an expression statement by default.\
Pass `allowExpressionStatement: false` to forbid `Array#reverse()` even if it's an expression statement.

```js
/* eslint unicorn/no-array-reverse: ["error", {"allowExpressionStatement": false}] */
// ❌
array.reverse();
```

## Related rules

- unicorn/no-array-sort
