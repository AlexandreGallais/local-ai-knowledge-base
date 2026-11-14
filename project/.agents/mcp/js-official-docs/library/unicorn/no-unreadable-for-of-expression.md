---
title: "no-unreadable-for-of-expression"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unreadable-for-of-expression.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unreadable-for-of-expression

📝 Disallow unreadable iterable expressions in `for…of` and `for await…of` loop headers.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

Keep `for…of` and `for await…of` loop headers easy to scan. Complex iterable expressions should be moved to a named variable before the loop.

This rule allows identifiers, property chains, array literals, simple calls, and `Object.keys()`, `Object.values()`, or `Object.entries()` calls with a simple argument.

Direct `.map()` and `.filter()` calls that would be reported by `no-duplicate-loops` are intentionally ignored by this rule.

Native iterator helper chains are considered complex in loop headers.

## Examples

```js
// ❌
for (const item of getItems(createArgument(seed))) {
	console.log(item);
}

// ✅
const argument = createArgument(seed);
for (const item of getItems(argument)) {
	console.log(item);
}
```

```js
// ❌
for (const key of Object.keys(Object.fromEntries(entries))) {
	console.log(key);
}

// ✅
const object = Object.fromEntries(entries);
for (const key of Object.keys(object)) {
	console.log(key);
}
```

```js
// ✅
for (const item of getItems(argument)) {
	console.log(item);
}
```

```js
// ✅
for (const item of items) {
	console.log(item);
}
```

```js
// ✅
for (const value of Object.values(object)) {
	console.log(value);
}
```
