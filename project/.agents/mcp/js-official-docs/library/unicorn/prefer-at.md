---
title: "prefer-at"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-at.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-at

📝 Prefer `.at()` method for index access and `String#charAt()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Prefer `Array#at()`, `String#at()`, and `TypedArray#at()` for index access and `String#charAt()`.

This rule complements `unicorn/prefer-string-slice`. This rule handles supported one-character `substring()` patterns, while `unicorn/prefer-string-slice` handles general string slicing.

## Examples

```js
// ❌
const foo = array[array.length - 1];

// ❌
const foo = array.slice(-1)[0];

// ❌
const foo = array.slice(-1).pop();

// ❌
const foo = array.slice(-1).shift();

// ❌
const foo = lodash.last(array);

// ✅
const foo = array.at(-1);
```

```js
// ❌
const foo = array[array.length - 5];

// ✅
const foo = array.at(-5);
```

```js
// ❌
const foo = string.charAt(string.length - 5);

// ✅
const foo = string.at(-5);
```

```js
// ❌
const foo = string.substring(index, index + 1);

// ✅
const foo = string.at(index);
```

```js
// ✅
const foo = array[100];
```

```js
// ✅
// This rule is not checking this case, but `unicorn/prefer-negative-index` rule will fix it.
const foo = array.at(array.length - 1);
```

```js
// ✅
array[array.length - 1] = foo;
```

```js
// ✅
// This rule intentionally ignores `arguments`, which is array-like but does not have `Array#at()`.
function foo() {
	return arguments[arguments.length - 1];
}
```

### DOM collections

```js
// ✅
// Common DOM collection patterns like `.children`, `.childNodes`, and `querySelectorAll()` are ignored because they are not guaranteed to support `.at()`.
const foo = element.children[element.children.length - 1];
```

This means non-DOM objects with those exact property or method names are also ignored.

The exclusion also covers `const` aliases, `.slice()` patterns, and last-element functions. TypeScript annotations or type information recognize `NodeList`, `NodeListOf`, `HTMLCollection`, and `HTMLCollectionOf`; untyped mutable bindings and destructuring require type information.

```js
// ✅
const elements = document.querySelectorAll('div');
const lastElement = elements[elements.length - 1];
```

Arrays created with `Array.from()` or spread are still checked:

```js
// ❌
const lastElement = Array.from(elements).slice(-1)[0];

// ✅
const lastElement = Array.from(elements).at(-1);
```

## Options

Type: `object`

### checkAllIndexAccess

Type: `boolean`\
Default: `false`

This rule only checks negative indexes by default, but you can also check non-negative integer indexes by setting `checkAllIndexAccess` to `true`.

Example:

```js
{
	'unicorn/prefer-at': [
		'error',
		{
			checkAllIndexAccess: true
		}
	]
}
```

```js
/* eslint unicorn/prefer-at: ["error", {"checkAllIndexAccess": true}] */
const foo = bar[10]; // Fails, will fix to `bar.at(10)`
const foo = bar[unknownProperty]; // Passes
const foo = string.charAt(unknownIndex); // Fails
const foo = string.charAt(-1); // Passes, `charAt()` returns `''` for a negative index while `at()` counts from the end
```

### getLastElementFunctions

Type: `string[]`

You can also check custom functions that get last element of objects.

`_.last()`, `lodash.last()`, and `underscore.last()` are always checked.

Example:

```js
{
	'unicorn/prefer-at': [
		'error',
		{
			getLastElementFunctions: [
				'getLast',
				'utils.lastElement'
			]
		}
	]
}
```

```js
/* eslint unicorn/prefer-at: ["error", {"getLastElementFunctions": ["utils.lastElement"]}] */
// ❌
const foo = utils.lastElement(bar);
```

```js
/* eslint unicorn/prefer-at: ["error", {"getLastElementFunctions": ["utils.lastElement"]}] */
// ✅
const foo = bar.at(-1);
```

## Related rules

- unicorn/prefer-negative-index
