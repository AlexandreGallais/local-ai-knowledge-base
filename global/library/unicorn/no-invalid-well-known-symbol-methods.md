---
title: "no-invalid-well-known-symbol-methods"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-invalid-well-known-symbol-methods.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-invalid-well-known-symbol-methods

📝 Disallow invalid implementations of well-known symbol methods.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Some well-known symbol methods must return protocol objects directly. Marking those methods as `async` or returning a Promise changes the value seen by the protocol, which does not unwrap it.

`Symbol.dispose` is also synchronous. A Promise returned from it is ignored by `using` and is not awaited. A generator disposer is also invalid because calling it does not run the body. Use a normal method for synchronous disposal or `Symbol.asyncDispose` for asynchronous disposal.

## Examples

```js
// ❌
class Resource {
	async [Symbol.dispose]() {}
}

// ✅
class Resource {
	async [Symbol.asyncDispose]() {}
}
```

```js
// ❌
const iterable = {
	async *[Symbol.iterator]() {
		yield value;
	},
};

// ✅
const iterable = {
	async *[Symbol.asyncIterator]() {
		yield value;
	},
};
```

```js
// ❌
const asyncIterable = {
	async [Symbol.asyncIterator]() {
		return iterator;
	},
};

// ✅
const asyncIterable = {
	async *[Symbol.asyncIterator]() {
		yield value;
	},
};
```
