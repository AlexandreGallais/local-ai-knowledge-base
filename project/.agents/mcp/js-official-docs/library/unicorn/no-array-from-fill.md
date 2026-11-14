---
title: "no-array-from-fill"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-array-from-fill.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-array-from-fill

📝 Disallow `.fill()` after `Array.from({length: …})`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

Prefer the `Array.from(…, mapFunction)` argument when creating a fixed length array with generated values.

Calling `.fill()` after `Array.from({length: …})` is usually redundant. For mapped arrays, `Array.from()` can create each value directly.

## Examples

```js
// ❌
Array.from({length: 3}).fill().map((_, index) => index);

// ✅
Array.from({length: 3}, (_, index) => index);
```

```js
// ❌
Array.from({length: 3}).fill({});
```

This creates one object and reuses it for every array element. When each element should be a distinct object, use a mapping function instead:

```js
// ✅
Array.from({length: 3}, () => ({}));
```
