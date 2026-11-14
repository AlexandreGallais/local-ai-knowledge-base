---
title: "prefer-single-call"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-single-call.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-single-call

📝 Enforce combining multiple `Array#{push,unshift}()`, `Element#classList.{add,remove}()`, and `importScripts()` into one call.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

These methods accept multiple arguments and should be combined into a single call when possible:

- `Array#push()`
- `Array#unshift()`
- `Element#classList.add()`
- `Element#classList.remove()`
- `importScripts()`

Combining calls is more efficient, cleaner, and reduces code duplication.

> **Note:**
> This rule does not replace loops that push elements into an array with `array.push(...iterable)`. Spreading an iterable into function arguments can exceed the JavaScript engine's argument-count limit and throw for large inputs, while the loop continues to work.

## Examples

```js
// ❌
foo.push(1);
foo.push(2, 3);

// ✅
foo.push(1, 2, 3);
```

```js
// ❌
foo.unshift(1);
foo.unshift(2, 3);

// ✅
foo.unshift(2, 3, 1);
```

```js
// ❌
element.classList.add('foo');
element.classList.add('bar', 'baz');

// ✅
element.classList.add('foo', 'bar', 'baz');
```

```js
// ❌
importScripts("https://example.com/foo.js");
importScripts("https://example.com/bar.js");

// ✅
importScripts(
	"https://example.com/foo.js",
	"https://example.com/bar.js",
);
```

For reported `push()` and `unshift()` calls whose receiver is not known to be an array, merging is offered as a suggestion. This avoids changing custom methods with `--fix`.

Known arrays are auto-fixed only when every argument has a statically known value and no side effects.

## Options

Type: `object`

### ignore

Type: `string[]`

Functions to ignore.

`stream.push`, `stream.unshift`, `this.push`, `this.unshift`, `this.stream.push`, `this.stream.unshift`, `process.stdin.push`, `process.stdin.unshift`, `process.stdout.push`, `process.stdout.unshift`, `process.stderr.push`, and `process.stderr.unshift` are ignored by default.

`push()` and `unshift()` calls are also skipped when the receiver is known not to be an array, so this option is rarely needed in TypeScript. A locally declared type is recognized from its annotation alone, while a receiver whose type comes from another module, such as a stream, needs type information.

Example:

```js
{
	'unicorn/prefer-single-call': [
		'error',
		{
			ignore: [
				'readable.push',
				'foo.stream.push'
			]
		}
	]
}
```

```js
/* eslint unicorn/prefer-single-call: ["error", {"ignore": ["readable.push"]}] */
import {Readable} from 'node:stream';

const readable = new Readable();
readable.push('one');
readable.push('another');
readable.push(null);
```
