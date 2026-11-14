---
title: "no-useless-delete-check"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-useless-delete-check.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-useless-delete-check

📝 Disallow unnecessary existence checks before deletion.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Deletion is already safe when the property, key, or value does not exist, so an existence guard is usually unnecessary.

This rule reports simple `in` checks before deleting from known objects, and `.has()` checks before deleting from local `const` `Map`, `Set`, `WeakMap`, and `WeakSet` instances.

The rule is conservative. It ignores `else` branches, compound conditions, unknown receivers, `Object.hasOwn()`, `hasOwnProperty()`, custom collections, type-only collection annotations, type-only TypeScript intersection types, and cases where removing the guard may be observable.

Collection cases are automatically fixed when doing so preserves comments. Object deletion is provided as a suggestion because `Proxy` traps can make unconditional `delete` observable.

## Examples

```js
// ❌
const object = {};

if (key in object) {
	delete object[key];
}

// ✅
delete object[key];
```

```js
// ❌
const map = new Map();

if (map.has(key)) {
	map.delete(key);
}

// ✅
map.delete(key);
```

```js
// ❌
const set = new Set();

if (set.has(value)) {
	set.delete(value);
}

// ✅
set.delete(value);
```

```js
// ✅
const map = new Map();

if (map.has(key)) {
	map.delete(key);
} else {
	handleMissingKey();
}
```
