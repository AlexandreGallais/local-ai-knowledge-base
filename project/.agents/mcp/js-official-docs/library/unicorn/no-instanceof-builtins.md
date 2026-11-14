---
title: "no-instanceof-builtins"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-instanceof-builtins.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-instanceof-builtins

📝 Disallow `instanceof` with built-in objects.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Using `instanceof` to determine the type of an object has limitations.

Therefore, it is recommended to use a safer method, like `Object.prototype.toString.call(foo)` or the npm package @sindresorhus/is to determine the type of an object.

Fixes and suggestions that add grouping parentheses are not applied inside Vue event handlers or template function bodies.

## Examples

```js
// ❌
foo instanceof String;

// ✅
typeof foo === 'string';
```

```js
// ❌
foo instanceof Number;

// ✅
typeof foo === 'number';
```

```js
// ❌
foo instanceof Boolean;

// ✅
typeof foo === 'boolean';
```

```js
// ❌
foo instanceof BigInt;

// ✅
typeof foo === 'bigint';
```

```js
// ❌
foo instanceof Symbol;

// ✅
typeof foo === 'symbol';
```

```js
// ❌
foo instanceof Array;

// ✅
Array.isArray(foo);
```

```js
// ❌
foo instanceof Function;

// ✅
typeof foo === 'function';
```

The following two examples are only reported with `strategy: 'strict'`. The default `'loose'` strategy does not report `Object` or `Map`.

```js
// ❌
foo instanceof Object;

// ✅
Object.prototype.toString.call(foo) === '[object Object]';
```

```js
import is from '@sindresorhus/is';

// ❌
foo instanceof Map;

// ✅
is(foo) === 'Map';
```

## Options

### strategy

Type: `'loose' | 'strict'`\
Default: `'loose'`

The matching strategy:

- `'loose'` - Matches the primitive type (`string`, `number`, `boolean`, `bigint`, `symbol`) constructors, `Function`, and `Array`.
- `'strict'` - Matches all built-in constructors.

```js
'unicorn/no-instanceof-builtins': [
	'error',
	{
		strategy: 'strict',
	},
]
```

### include

Type: `string[]`\
Default: `[]`

Specify the constructors that should be validated.

```js
'unicorn/no-instanceof-builtins': [
	'error',
	{
		include: [
			'WebWorker',
			'HTMLElement',
		],
	},
]
```

### exclude

Type: `string[]`\
Default: `[]`

Specifies the constructors that should be excluded, with this rule taking precedence over others.

```js
'unicorn/no-instanceof-builtins': [
	'error',
	{
		exclude: [
			'String',
			'Number',
		],
	},
]
```

### useErrorIsError

Type: `boolean`\
Default: `false`

Specifies using `Error.isError()` to determine whether it is an error object.

```js
'unicorn/no-instanceof-builtins': [
	'error',
	{
		strategy: 'strict',
		useErrorIsError: true,
	},
]
```

This option will be removed at some point in the future.
