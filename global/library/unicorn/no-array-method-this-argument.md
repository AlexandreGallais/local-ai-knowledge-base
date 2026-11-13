---
title: "no-array-method-this-argument"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-array-method-this-argument.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-array-method-this-argument

📝 Disallow using the `this` argument in array methods.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

The rule disallows using the `thisArg` argument in array methods:

- If the callback is an arrow function or a bound function, the `thisArg` won't affect it.
- If you intend to use a custom `this` in the callback, it's better to use the variable directly or use `callback.bind(thisArg)`.

This rule checks the following array methods that accept `thisArg`:

- `Array.from()`
- `Array.fromAsync()`
- `Array#every()`
- `Array#filter()`
- `Array#find()`
- `Array#findLast()`
- `Array#findIndex()`
- `Array#findLastIndex()`
- `Array#flatMap()`
- `Array#forEach()`
- `Array#map()`
- `Array#some()`

This rule is fixable when the callback is an arrow function, the `thisArg` argument is an identifier, a literal, or `this`, and the fix can be applied without removing comments. Any other `thisArg` with an arrow callback can be removed with a suggestion, since evaluating it could run code or throw.

A receiver known not to be an array, such as a `Set` or a custom type that declares a same-named method, is ignored. Unknown receivers are still reported. A typed array is reported, since it takes the same `thisArg` parameter.

## Examples

```js
// ❌
const foo = bar.find(element => isUnicorn(element), baz);

// ✅
const foo = bar.find(element => isUnicorn(element));
```

```js
// ❌
const foo = bar.map(function (element) {
	return this.unicorn(element);
}, baz);

// ✅
const foo = bar.map(element => {
	return baz.unicorn(element);
});

// ✅
const foo = bar.map(function (element) {
	return this.unicorn(element);
}.bind(baz));
```
