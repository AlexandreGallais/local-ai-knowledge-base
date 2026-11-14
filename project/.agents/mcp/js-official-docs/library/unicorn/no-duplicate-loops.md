---
title: "no-duplicate-loops"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-duplicate-loops.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-duplicate-loops

📝 Disallow `.map()` and `.filter()` in `for…of` and `for await…of` loop headers.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

Using `.map()` or `.filter()` directly in a `for…of` or `for await…of` loop header creates an intermediate array and then iterates over that array. Move the operation into the loop body when that preserves the intended behavior, so the original collection is only iterated once.

Known iterator helper chains are ignored because iterator helpers are lazy and do not create an intermediate array. This includes chains rooted in `Iterator.from()`, `Iterator.concat()`, `Iterator.zip()`, `Iterator.zipKeyed()`, `.entries()`, `.keys()`, `.values()`, and `.matchAll()`.

## Examples

```js
// ❌
for (const value of values.map(value => value.property)) {
	console.log(value);
}

// ✅
for (const value of values) {
	console.log(value.property);
}
```

```js
// ❌
for (const value of values.filter(value => value.isEnabled)) {
	console.log(value);
}

// ✅
for (const value of values) {
	if (value.isEnabled) {
		console.log(value);
	}
}
```

This rule intentionally only reports direct `.map()` and `.filter()` calls in `for…of` and `for await…of` loop headers. More complex cases like precomputed aliases, consecutive loops, `Array.from(iterable)`, and `[...iterable]` are intentionally ignored.

For async mapping, keep concurrency behavior in mind. For example, `items.map(async item => fetch(item))` starts the promises before the loop, while moving the `await fetch(item)` call into the loop body runs it sequentially.
