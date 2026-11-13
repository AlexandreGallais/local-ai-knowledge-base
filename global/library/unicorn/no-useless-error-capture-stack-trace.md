---
title: "no-useless-error-capture-stack-trace"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-useless-error-capture-stack-trace.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-useless-error-capture-stack-trace

📝 Disallow unnecessary `Error.captureStackTrace(…)`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Calling `Error.captureStackTrace(…)` inside the constructor of a built-in `Error` subclass is unnecessary, since the `Error` constructor calls it automatically.

## Examples

```js
// ❌
class MyError extends Error {
	constructor() {
		Error.captureStackTrace(this, MyError);
	}
}
```

```js
// ❌
class MyError extends Error {
	constructor() {
		Error.captureStackTrace?.(this, MyError);
	}
}
```

```js
// ❌
class MyError extends Error {
	constructor() {
		Error.captureStackTrace(this, this.constructor);
	}
}
```

```js
// ❌
class MyError extends Error {
	constructor() {
		Error.captureStackTrace?.(this, this.constructor);
	}
}
```

```js
// ❌
class MyError extends Error {
	constructor() {
		Error.captureStackTrace(this, new.target);
	}
}
```

```js
// ❌
class MyError extends Error {
	constructor() {
		Error.captureStackTrace?.(this, new.target);
	}
}
```
