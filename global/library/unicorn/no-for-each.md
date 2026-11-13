---
title: "no-for-each"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-for-each.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-for-each

📝 Prefer `for…of` over the `forEach` method.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Benefits of `for…of` statement over the `forEach` method can include:

- Faster
- Better readability
- Ability to exit early with `break` or `return`
- Ability to skip iterations with `continue`

Additionally, using `for…of` has great benefits if you are using TypeScript, because it does not cause a function boundary to be crossed. This means that type-narrowing earlier on in the current scope will work properly while inside of the loop (without having to re-type-narrow). Furthermore, any mutated variables inside of the loop will be picked up on for the purposes of determining if a variable is being used.

A receiver known not to be an array, such as a `Map` or a `Set`, is ignored. A typed array is reported, since `for…of` iterates it the same way `TypedArray#forEach()` does.

## Examples

```js
// ❌
array.forEach(element => {
	bar(element);
});

// ✅
for (const element of array) {
	bar(element);
}
```

```js
// ❌
array?.forEach(element => {
	bar(element);
});

// ✅
if (array) {
	for (const element of array) {
		bar(element);
	}
}
```

```js
// ❌
array.forEach((element, index) => {
	bar(element, index);
});

// ✅
for (const [index, element] of array.entries()) {
	bar(element, index);
}
```

```js
// ❌
array.forEach((element, index, array) => {
	bar(element, index, array);
});

// ✅
for (const [index, element] of array.entries()) {
	bar(element, index, array);
}
```
