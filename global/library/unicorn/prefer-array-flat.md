---
title: "prefer-array-flat"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-array-flat.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-array-flat

📝 Prefer `Array#flat()` over legacy techniques to flatten arrays.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

ES2019 introduced a new method `Array#flat()` that flattens arrays.

The native method expresses flattening directly and avoids verbose or indirect flattening patterns.

A value known not to be an array is ignored, including a typed array and `arguments`, since the `.flat()` replacement does not exist on it. Unknown values are still reported.

## Examples

```js
// ❌
const foo = array.flatMap(x => x);

// ❌
const foo = array.reduce((a, b) => a.concat(b), []);

// ✅ Not reported. A spread in the reducer spreads the elements rather than the arrays, so `['ab'].reduce((a, b) => [...a, ...b], [])` is `['a', 'b']` where `['ab'].flat()` is `['ab']`
const foo = array.reduce((a, b) => [...a, ...b], []);

// ❌
const foo = [].concat(...array);

// ❌
const foo = [].concat.apply([], array);

// ❌
const foo = Array.prototype.concat.apply([], array);

// ❌
const foo = Array.prototype.concat.call([], ...array);

// ❌
const foo = _.flatten(array);

// ❌
const foo = lodash.flatten(array);

// ❌
const foo = underscore.flatten(array);

// ✅
const foo = array.flat();
```

This rule intentionally does not report plain concat normalization like `[].concat(value)` or `Array.prototype.concat.call([], value)`. Those patterns do not consume an array of concat arguments, so they are better handled by `prefer-spread`, which can replace ordinary `Array#concat()` usage.

## Options

Type: `object`

### functions

Type: `string[]`

You can also check custom functions that flatten arrays.

`_.flatten()`, `lodash.flatten()`, and `underscore.flatten()` are always checked.

Example:

```js
{
	'unicorn/prefer-array-flat': [
		'error',
		{
			functions: [
				'flatArray',
				'utils.flat'
			]
		}
	]
}
```

```js
/* eslint unicorn/prefer-array-flat: ["error", {"functions": ["utils.flat"]}] */
// ❌
const foo = utils.flat(bar);
```

```js
/* eslint unicorn/prefer-array-flat: ["error", {"functions": ["utils.flat"]}] */
// ✅
const foo = bar.flat();
```

## Related rules

- unicorn/prefer-array-flat-map
