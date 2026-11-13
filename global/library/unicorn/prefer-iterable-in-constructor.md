---
title: "prefer-iterable-in-constructor"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-iterable-in-constructor.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-iterable-in-constructor

📝 Prefer passing iterables directly to constructors instead of filling empty collections.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Some built-in constructors accept the values they should contain. Creating an empty collection and immediately filling it with a `for…of` loop is unnecessary when the constructor can consume the iterable directly.

This rule reports simple adjacent loops that fill an empty `Set`, `WeakSet`, `Map`, `WeakMap`, or `URLSearchParams`. It also reports `new URLSearchParams(Object.entries(record))`.

When a function that can run during the loop references the collection, the loop replacement is a suggestion, because the function could run while the constructor reads the source, before the collection is initialized.

`URLSearchParams` is only reported for `Object.entries(record)` because `new URLSearchParams(record)` can consume string-keyed records directly. The rule skips obvious non-record sources like arrays, strings, nullish values, primitive numbers, and constructor calls, including in the initializer of a `const` variable. Generic pair iterables are intentionally not reported for `URLSearchParams#set()` because duplicate names can make the loop behavior differ from constructor behavior.

`FormData` is intentionally unsupported because its constructor accepts a form and optional submitter, not arbitrary entries.

Exotic custom iterator behavior, symbol-keyed records hidden behind variables, and shadowed built-ins are intentionally unsupported. The rule skips object literals with computed properties and `Map` array literals that are not array pairs, directly or in the initializer of a `const` variable, but it does not try to prove whether other variables contain custom iterables or symbol keys.

## Examples

```js
// ❌
const set = new Set();
for (const item of items) {
	set.add(item);
}

// ✅
const set = new Set(items);
```

```js
// ❌
const map = new Map();
for (const [key, value] of entries) {
	map.set(key, value);
}

// ✅
const map = new Map(entries);
```

```js
// ❌
const searchParameters = new URLSearchParams();
for (const [key, value] of Object.entries(record)) {
	searchParameters.set(key, value);
}

// ✅
const searchParameters = new URLSearchParams(record);
```

```js
// ❌
const searchParameters = new URLSearchParams(Object.entries(record));

// ✅
const searchParameters = new URLSearchParams(record);
```

```js
// ✅ because generic pair iterables can behave differently with duplicate names
const searchParameters = new URLSearchParams();
for (const [key, value] of entries) {
	searchParameters.set(key, value);
}
```
