---
title: "prefer-has-check"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-has-check.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-has-check

📝 Prefer `.has()` when checking existence.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Prefer `.has()` over `.get()` when checking whether an item exists.

`.has()` directly checks membership without conflating absence with a stored value.

This rule is conservative. It reports `Map`, `ReadonlyMap`, and `WeakMap` only when TypeScript type information, simple TypeScript annotations, or inline `new Map(...)` or `new WeakMap(...)` constructors prove stored values cannot be confused with a missing value. It also reports explicit `null` comparisons and loose `undefined` comparisons for `URLSearchParams`, `Headers`, and `FormData`.

## Examples

```ts
// ❌
declare const map: Map<string, object>;

if (map.get(key)) {
	// …
}

// ✅
if (map.has(key)) {
	// …
}
```

```ts
// ❌
declare const map: Map<string, object>;

map.get(key) !== undefined;

// ✅
map.has(key);
```

```js
// ❌
new Map([[key, {}]]).get(key) !== undefined;

// ✅
new Map([[key, {}]]).has(key);
```

```js
// ❌
new URLSearchParams().get(name) !== null;

// ✅
new URLSearchParams().has(name);
```

```ts
// ✅
// `false` is a valid stored value, so this is a value check, not an existence check.
declare const map: Map<string, boolean>;

if (map.get(key)) {
	// …
}
```
