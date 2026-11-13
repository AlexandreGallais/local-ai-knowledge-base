---
title: "prefer-structured-clone"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-structured-clone.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-structured-clone

📝 Prefer using `structuredClone` to create a deep clone.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

`structuredClone` is the modern way to create a deep clone of a value.

## Examples

```js
// ❌
const clone = JSON.parse(JSON.stringify(foo));

// ❌
const clone = _.cloneDeep(foo);

// ✅
const clone = structuredClone(foo);
```

## Options

Type: `object`

### functions

Type: `string[]`

You can also check custom functions that creates a deep clone.

`_.cloneDeep()` and `lodash.cloneDeep()` are always checked.

Example:

```js
{
	'unicorn/prefer-structured-clone': [
		'error',
		{
			functions: [
				'cloneDeep',
				'utils.clone'
			]
		}
	]
}
```

```js
/* eslint unicorn/prefer-structured-clone: ["error", {"functions": ["utils.clone"]}] */
// ❌
const clone = utils.clone(foo);
```

```js
/* eslint unicorn/prefer-structured-clone: ["error", {"functions": ["utils.clone"]}] */
// ✅
const clone = structuredClone(foo);
```
