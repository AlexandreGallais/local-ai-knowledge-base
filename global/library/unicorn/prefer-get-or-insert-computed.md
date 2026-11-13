---
title: "prefer-get-or-insert-computed"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-get-or-insert-computed.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-get-or-insert-computed

📝 Prefer `.getOrInsertComputed()` when the default value has side effects.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

`Map#getOrInsert()` always evaluates the default value argument, even when the key <example-value> exists. This can cause performance issues or bugs when the default value has side effects (like function calls, database queries, or other operations). Use `Map#getOrInsertComputed()` instead to lazily evaluate the default value only when needed.

## Examples

```js
// ❌ - expensiveComputation() is called every time, even if key <example-value>
const cache = new Map();
const result = cache.getOrInsert(key, expensiveComputation());

// ✅ - expensiveComputation() is only called if key doesn't exist
const cache = new Map();
const result = cache.getOrInsertComputed(key, () => expensiveComputation());
```

```js
// ❌ - Function is called even if the key <example-value>
const userCache = new Map();
const user = userCache.getOrInsert(userId, fetchUserFromDatabase(userId));

// ✅ - Only fetches from database if user isn't cached
const userCache = new Map();
const user = userCache.getOrInsertComputed(userId, () => fetchUserFromDatabase(userId));
```

```js
// ❌ - generateId() is called every time, wasting IDs
const idMap = new Map();
const id = idMap.getOrInsert(key, generateId());

// ✅ - generateId() only called when needed
const idMap = new Map();
const id = idMap.getOrInsertComputed(key, generateId);
```
