---
title: "prefer-array-flat-map"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-array-flat-map.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-array-flat-map

📝 Prefer `.flatMap(…)` over `.map(…).flat()` and `.filter(…).flatMap(…)`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

`Array#flatMap` performs `Array#map` and `Array#flat` in one step.

It expresses mapping and flattening directly and avoids intermediate arrays created by separate `map()` or `filter()` calls.

It can also add or remove items during mapping by returning an empty array for items that should be skipped. This rule only reports `.filter().flatMap()` when the `.flatMap()` callback can return multiple items. Single-item callbacks are handled by `unicorn/no-unnecessary-array-flat-map`.

`flatMap()` flattens each callback result immediately, while `map().flat()` waits until all callbacks finish, so the results can differ if a callback mutates an array returned by an earlier callback. The rule autofixes inline arrow functions that return an array literal or an expression without side effects, like `value => value.children`, and offers a suggestion for other callbacks.

## Examples

```js
// ❌
const foo = bar.map(element => unicorn(element)).flat();

// ❌
const foo = bar.map(element => unicorn(element)).flat(1);

// ✅
const foo = bar.flatMap(element => unicorn(element));
```

```js
// ❌
const foo = bar
	.filter(element => element.isUnicorn)
	.flatMap(element => [element.name, element.alias]);

// ✅
const foo = bar.flatMap(element => element.isUnicorn ? [element.name, element.alias] : []);
```

```js
// ✅
const foo = bar.map(element => unicorn(element)).flat(2);
```

```js
// ✅
const foo = bar.map(element => unicorn(element)).foo().flat();
```

```js
// ✅
const foo = bar.flat().map(element => unicorn(element));
```

## Related rules

- unicorn/prefer-array-flat
- unicorn/no-unnecessary-array-flat-map
