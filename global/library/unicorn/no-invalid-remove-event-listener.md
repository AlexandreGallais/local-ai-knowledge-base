---
title: "no-invalid-remove-event-listener"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-invalid-remove-event-listener.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-invalid-remove-event-listener

📝 Prevent calling `EventTarget#removeEventListener()` with the result of an expression.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

The `removeEventListener` function must be called with a reference to the same function that was passed to `addEventListener`. Calling `removeEventListener` with an inline function or the result of an inline `.bind()` call is indicative of an error, and won't actually remove the listener.

## Examples

```js
// ❌
window.removeEventListener('click', listener.bind(window));

// ✅
window.removeEventListener('click', listener);
```

```js
// ✅
window.removeEventListener('click', getListener());
```

```js
// ❌
window.removeEventListener('click', () => {});

// ✅
const listener = () => {};
window.addEventListener('click', listener);
// ...
window.removeEventListener('click', listener);
```

```js
// ❌
window.removeEventListener('click', function () {});

// ✅
const listener = function () {};
window.addEventListener('click', listener);
// ...
window.removeEventListener('click', listener);
```

```js
// ❌
class MyElement extends HTMLElement {
	handler() {}

	disconnectedCallback() {
		this.removeEventListener('click', this.handler.bind(this));
	}
}

// ✅
class MyElement extends HTMLElement {
	constructor() {
		super();
		this.handler = this.handler.bind(this);
	}

	handler() {}

	disconnectedCallback() {
		this.removeEventListener('click', this.handler);
	}
}
```
