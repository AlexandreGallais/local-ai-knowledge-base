---
title: "no-new-array"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-new-array.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-new-array

📝 Disallow `new Array()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

The ESLint built-in rule `no-array-constructor` enforces using an array literal instead of the `Array` constructor, but it still allows using the `Array` constructor with **one** argument. This rule fills that gap.

When using the `Array` constructor with one argument, it's not clear whether the argument is meant to be the length of the array or the only element.

This rule is fixable if the argument is known not to be a number. A spread argument gets a suggestion instead.

## Examples

```js
// ❌
const length = 10;
const array = new Array(length);
```

A length has no equivalent rewrite, so this is reported without a fix. `new Array(length)` creates `length` holes, and `Array.from({length})` creates `length` `undefined` values instead, which is observable wherever a hole is skipped or counted:

```js
const array = new Array(3);
array.filter(() => true).length; // 0
Array.from({length: 3}).filter(() => true).length; // 3
```

```js
// ❌
const array = new Array(onlyElement);

// ✅
const array = [onlyElement];
```

```js
const items = ['foo', 'bar'];

// ❌
const array = new Array(...items);
```

```js
const items = ['foo', 'bar'];

// ✅
const array = [...items];
```
