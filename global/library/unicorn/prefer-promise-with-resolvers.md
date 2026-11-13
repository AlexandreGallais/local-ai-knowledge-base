---
title: "prefer-promise-with-resolvers"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-promise-with-resolvers.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-promise-with-resolvers

📝 Prefer `Promise.withResolvers()` when extracting resolver functions from `new Promise()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

`Promise.withResolvers()` is the standard way to create a promise together with its `resolve` and `reject` functions.

This rule only reports the old boilerplate pattern where a `new Promise()` executor copies resolver functions to outer variables and does nothing else.

Autofix is only applied when adjacent resolver `let` declarations can be removed without dropping comments or type annotations.

## Examples

```js
// ❌
let resolve;
const promise = new Promise(resolve_ => {
	resolve = resolve_;
});

// ✅
const {promise, resolve} = Promise.withResolvers();
```

```js
// ❌
let fulfill;
let fail;
const deferredPromise = new Promise((resolve, reject) => {
	fulfill = resolve;
	fail = reject;
});

// ✅
const {promise: deferredPromise, resolve: fulfill, reject: fail} = Promise.withResolvers();
```

Executors that do setup work are intentionally ignored.

```js
// ✅
const promise = new Promise(resolve => {
	functionThatPotentiallyThrows();
	resolve();
});
```
