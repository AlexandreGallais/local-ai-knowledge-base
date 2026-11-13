---
title: "consistent-date-clone"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/consistent-date-clone.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# consistent-date-clone

📝 Prefer passing `Date` directly to the constructor when cloning.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

The `Date` constructor can clone a `Date` object directly when passed as an argument. This is simpler and more efficient than extracting the timestamp with `.getTime()`.

> Note: This approach requires ES2015 (ES6) or later. In older environments, `new Date(date)` converts to a string first, but modern JavaScript handles this correctly.

## Examples

```js
// ❌
new Date(date.getTime());

// ✅
new Date(date);
```

```js
// ❌
const cloned = new Date(originalDate.getTime());

// ✅
const cloned = new Date(originalDate);
```

```js
// ✅
// When you need just the timestamp value
const timestamp = date.getTime();
```
