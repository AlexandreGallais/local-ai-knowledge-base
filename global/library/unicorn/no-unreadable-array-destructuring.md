---
title: "no-unreadable-array-destructuring"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unreadable-array-destructuring.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unreadable-array-destructuring

📝 Disallow unreadable array destructuring.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Destructuring is very useful, but it can also make some code harder to read. This rule prevents ignoring consecutive values and assigning destructured values to object properties when destructuring from an array.

## Examples

```js
// ✅
const [foo] = parts;
```

```js
// ✅
const [, foo] = parts;
```

```js
// ❌
const [,, foo] = parts;

// ✅
const foo = parts[2];
```

```js
// ❌
const [,,, foo] = parts;

// ✅
const foo = parts[3];
```

```js
// ✅
const [,...rest] = parts;
```

```js
// ❌
const [,,...rest] = parts;

// ✅
const rest = parts.slice(2);
```

The rest element is not fixed when the value is known not to be an `Array` (for example, a typed array, where `.slice()` returns a typed array). An unknown value, like a `NodeList` from `querySelectorAll()`, is assumed to be an array, even though a `NodeList` has no `slice()`.

```js
// ❌
[object.property] = parts;

// ✅
[value] = parts;
object.property = value;
```

## Options

Type: `object`

### `maximumIgnoredElements`

Type: `integer`\
Default: `1`

The maximum number of consecutive ignored elements to allow.

```js
{
	rules: {
		'unicorn/no-unreadable-array-destructuring': [
			'error',
			{
				maximumIgnoredElements: 2,
			},
		],
	},
}
```

With `{maximumIgnoredElements: 2}`:

```js
// ✅
const [,, foo] = parts;
```

```js
// ❌
const [,,, foo] = parts;

// ✅
const foo = parts[3];
```

## Note

You might have to modify the built-in `prefer-destructuring` rule to be compatible with this one:

```js
{
	rules: {
		'prefer-destructuring': [
			'error',
			{
				object: true,
				array: false,
			},
		],
	},
}
```
