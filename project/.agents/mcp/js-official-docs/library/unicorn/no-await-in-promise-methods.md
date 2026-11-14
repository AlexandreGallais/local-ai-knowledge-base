---
title: "no-await-in-promise-methods"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-await-in-promise-methods.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-await-in-promise-methods

📝 Disallow using `await` in `Promise` method parameters.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Using `await` on promises passed as arguments to `Promise.all()`, `Promise.allSettled()`, `Promise.any()`, or `Promise.race()` is likely a mistake.

This also applies to `await` nested inside an element, since it delays the evaluation of the elements after it.

When an operation depends on an awaited value, wrap it in an async immediately invoked function expression (IIFE) to allow array construction to continue without waiting for that value.

## Examples

```js
// ❌
Promise.all([await promise, anotherPromise]);

// ✅
Promise.all([promise, anotherPromise]);
```

```js
// ❌
Promise.allSettled([await promise, anotherPromise]);

// ✅
Promise.allSettled([promise, anotherPromise]);
```

```js
// ❌
Promise.any([await promise, anotherPromise]);

// ✅
Promise.any([promise, anotherPromise]);
```

```js
// ❌
Promise.race([await promise, anotherPromise]);

// ✅
Promise.race([promise, anotherPromise]);
```

```js
// ❌
Promise.all([(await promise).foo, anotherPromise]);

// ✅
Promise.all([promise.then(value => value.foo), anotherPromise]);
```

```js
// ❌
Promise.all([condition ? await promise : fallbackPromise, anotherPromise]);

// ✅
Promise.all([condition ? promise : fallbackPromise, anotherPromise]);
```

```js
// ❌
Promise.all([
	(await fetch(url)).json(),
	...otherPromises,
]);

// ✅
Promise.all([
	(async () => (await fetch(url)).json())(),
	...otherPromises,
]);
```
