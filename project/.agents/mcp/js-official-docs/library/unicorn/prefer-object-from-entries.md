---
title: "prefer-object-from-entries"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-object-from-entries.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-object-from-entries

📝 Prefer using `Object.fromEntries(…)` to transform a list of key-value pairs into an object.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

When transforming a list of key-value pairs into an object, `Object.fromEntries(…)` should be preferred. `no-array-reduce` is a related but more generic rule.

This rule is fixable for simple cases.

## Examples

```js
// ❌
const object = pairs.reduce(
	(object, [key, value]) => ({...object, [key]: value}),
	{}
);

// ❌
const object = pairs.reduce(
	(object, [key, value]) => Object.assign(object, {[key]: value}),
	{}
);

// ❌
const object = {};
for (const [key, value] of pairs) {
	object[key] = value;
}

// ❌
const object = _.fromPairs(pairs);

// ✅
const object = Object.fromEntries(pairs);
```

A null-prototype accumulator is not reported, because `Object.fromEntries()` always creates an object with `Object.prototype`.

```js
// ✅
const object = pairs.reduce(
	(object, [key, value]) => ({...object, [key]: value}),
	Object.create(null)
);
```

## Options

Type: `object`

### functions

Type: `string[]`

You can also check custom functions that transform pairs.

`lodash.fromPairs()` and `_.fromPairs()` are always checked.

Example:

```js
{
	'unicorn/prefer-object-from-entries': [
		'error',
		{
			functions: [
				'getObjectFromKeyValue',
				'utils.fromPairs'
			]
		}
	]
}
```

```js
/* eslint unicorn/prefer-object-from-entries: ["error", {"functions": ["utils.fromPairs"]}] */
// ❌
const object = utils.fromPairs(pairs);
```

```js
/* eslint unicorn/prefer-object-from-entries: ["error", {"functions": ["utils.fromPairs"]}] */
// ✅
const object = Object.fromEntries(pairs);
```
