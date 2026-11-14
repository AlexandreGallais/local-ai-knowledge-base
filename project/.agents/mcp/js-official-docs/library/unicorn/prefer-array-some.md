---
title: "prefer-array-some"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-array-some.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-array-some

📝 Prefer `.some(…)` over `.filter(…).length` check and `.{find,findLast,findIndex,findLastIndex}(…)`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

`Array#some` directly expresses an existence check, making it clearer than inspecting a result or found value.

Prefer using `Array#some` over:

- Non-zero length check on the result of `Array#filter()`.

We only check `.filter().length > 0` and `.filter().length !== 0`. These two non-zero length check styles are allowed in `unicorn/explicit-length-check` rule. It is recommended to use them together.

- Using `Array#find()` or `Array#findLast()` to ensure at least one element in the array passes a given check.

- Comparing the result of `Array#find()` or `Array#findLast()` with `undefined`.

- Using `Array#findIndex()` or `Array#findLastIndex()` to ensure at least one element in the array passes a given check.

`.find()` and `.findLast()` replacements are suggestions because matches can be falsy. Replacing `.findLast()` also changes iteration order.

`.findIndex()` checks are autofixed. `.findLastIndex()` and `.filter().length` checks are autofixed only for inline callbacks without side effects; otherwise, suggestions are offered because callback count or order can change.

This rule skips receivers known to be neither an array nor a typed array, from syntax, TypeScript annotations, or TypeScript type information. Unknown receivers are still checked.

`.find()` and `.findLast()` results stored in `const` variables are checked when every use is a direct argument to global `Boolean()`. Other boolean contexts require a known array or typed array. Variables with TypeScript type annotations are skipped.

## Examples

```js
// ❌
const hasUnicorn = array.filter(element => isUnicorn(element)).length > 0;

// ❌
const hasUnicorn = array.filter(element => isUnicorn(element)).length !== 0;

// ❌
const hasUnicorn = array.find(element => isUnicorn(element)) !== undefined;

// ❌
const hasUnicorn = array.find(element => isUnicorn(element)) != null;

// ✅
const hasUnicorn = array.some(element => isUnicorn(element));
```

```js
// ❌
if (array.find(element => isUnicorn(element))) {
	// …
}

// ✅
if (array.some(element => isUnicorn(element))) {
	// …
}
```

```js
// ❌
const found = array.find(item => item > 2);
Boolean(found);

// ✅
const found = array.some(item => item > 2);
Boolean(found);
```

```js
// ❌
const foo = unicorns.find(unicorn => unicorn.isRainbow) ? bar : baz;
```

```js
// ✅
const foo = unicorns.some(unicorn => unicorn.isRainbow) ? bar : baz;
```

```js
// ❌
const hasUnicorn = array.findLast(element => isUnicorn(element)) !== undefined;
```

```js
// ✅
const hasUnicorn = array.some(element => isUnicorn(element));
```

```js
// ❌
const hasUnicorn = array.findLast(element => isUnicorn(element)) != null;
```

```js
// ✅
const hasUnicorn = array.some(element => isUnicorn(element));
```

```js
// ❌
const hasUnicorn = array.findIndex(element => isUnicorn(element)) !== -1;
```

```js
// ✅
const hasUnicorn = array.some(element => isUnicorn(element));
```

```js
// ❌
const hasUnicorn = array.findLastIndex(element => isUnicorn(element)) !== -1;
```

```js
// ✅
const hasUnicorn = array.some(element => isUnicorn(element));
```

```js
// ❌
const foo = unicorns.findLast(unicorn => unicorn.isRainbow) ? bar : baz;
```

```js
// ✅
const foo = unicorns.some(unicorn => unicorn.isRainbow) ? bar : baz;
```

```vue
<template>
	<!-- ❌ -->
	<div v-if="array.find(element => isUnicorn(element))">Vue</div>

	<!-- ❌ -->
	<div v-if="array.filter(element => isUnicorn(element)).length > 0">Vue</div>

	<!-- ✅ -->
	<div v-if="array.some(element => isUnicorn(element))">Vue</div>
</template>
```

```vue
<template>
	<!-- ❌ -->
	<div v-if="array.findLast(element => isUnicorn(element))">Vue</div>

	<!-- ✅ -->
	<div v-if="array.some(element => isUnicorn(element))">Vue</div>
</template>
```
