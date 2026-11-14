---
title: "no-mismatched-map-key"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-mismatched-map-key.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-mismatched-map-key

📝 Disallow checking a Map key <example-value> accessing a different key.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

When you check a key with `Map#has()`, accesses to the same map in the guarded branch should use the same key. A different key is usually a copy-paste mistake.

This rule intentionally only reports simple, obvious cases.

Branches that reassign the checked map receiver are ignored.

## Examples

```js
// ❌
const value = map.has(key) ? map.get(anotherKey) : fallback;

// ✅
const value = map.has(key) ? map.get(key) : fallback;
```

```js
// ❌
if (!map.has(key)) {
	map.set(anotherKey, value);
}

// ✅
if (!map.has(key)) {
	map.set(key, value);
}
```
