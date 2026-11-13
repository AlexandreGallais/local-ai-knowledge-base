---
title: "consistent-function-scoping"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/consistent-function-scoping.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# consistent-function-scoping

📝 Move function definitions to the highest possible scope.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

A function definition should be placed as close to the top-level scope as possible without breaking its captured values. This improves readability, directly improves performance and allows JavaScript engines to better optimize performance.

## Examples

```js
// ❌
export function doFoo(foo) {
	// Does not capture anything from the scope, can be moved to the outer scope
	function doBar(bar) {
		return bar === 'bar';
	}

	return doBar;
}
```

```js
// ✅
function doBar(bar) {
	return bar === 'bar';
}

export function doFoo(foo) {
	return doBar;
}
```

```js
// ❌
function doFoo() {
	// Does not capture anything from the scope, can be moved to the outer scope
	return bar => bar === 'bar';
}
```

```js
// ✅
const doBar = bar => bar === 'bar';

function doFoo() {
	return doBar;
}
```

```js
// Arrow functions in return statements are also flagged
// ❌
export function someAction() {
	return dispatch => dispatch({type: 'SOME_TYPE'});
}
```

```js
// Arrow functions in return statements are also flagged
// ✅
const handleDispatch = dispatch => dispatch({type: 'SOME_TYPE'});

export function someAction() {
	return handleDispatch;
}
```

```js
// ❌
function doFoo(foo) {
	const doBar = bar => {
		return bar === 'bar';
	};
}
```

```js
// ✅
const doBar = bar => {
	return bar === 'bar';
};

function doFoo(foo) {}
```

```js
// ✅
export function doFoo(foo) {
	function doBar(bar) {
		return bar === 'bar' && foo.doBar(bar);
	}

	return doBar;
}

const doBar = bar => bar === 'bar';

export function doFoo() {
	return doBar;
}
```

## Options

### checkArrowFunctions

Type: `boolean`\
Default: `true`

Pass `"checkArrowFunctions": false` to disable linting of arrow functions.

## Limitations

This rule does not detect or remove extraneous code blocks inside of functions:

```js
function doFoo(foo) {
	{
		function doBar(bar) {
			return bar;
		}
	}

	return foo;
}
```

Immediately invoked function expressions (IIFE) are ignored:

```js
(function () {
	function doFoo(bar) {
		return bar;
	}
})();
```

Built-in Hooks in React are ignored:

```js
useEffect(() => {
	async function getItems() {}

	getItems();
}, [])
```

Functions inside `jest.mock()` factories are ignored because Jest restricts those factories from referencing out-of-scope variables:

```js
jest.mock('module', () => {
	function createMock() {
		return 'mock';
	}

	return createMock;
});
```

Functions inside Vitest's `vi.mock()` and `vi.hoisted()` factories are also ignored because those factories run before the module's top-level code:

```js
const mocks = vi.hoisted(() => {
	const createMock = () => 'mock';
	return {createMock};
});

vi.mock('module', () => {
	const createMock = () => 'mock';
	return {createMock};
});
```
