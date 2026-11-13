---
title: "no-for-loop"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-for-loop.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-for-loop

📝 Do not use a `for` loop that can be replaced with a `for-of` loop.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

There's no reason to use old school for loops anymore for the common case. You can instead use for-of loop (with `.entries()` if you need to access the index).

Off-by-one errors are one of the most common bugs in software. Swift actually removed this completely from the language..

This rule is fixable unless index or element variables were used outside of the loop.

## Examples

```js
// ❌
for (let index = 0; index < array.length; index++) {
	const element = array[index];
	console.log(index, element);
}

// ✅
for (const [index, element] of array.entries()) {
	console.log(index, element);
}
```

```js
// ❌
for (let index = 0; index < array.length; index++) {
	const element = array[index];
	console.log(element);
}

// ✅
for (const element of array) {
	console.log(element);
}
```
