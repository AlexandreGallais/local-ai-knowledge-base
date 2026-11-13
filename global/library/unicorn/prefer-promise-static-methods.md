---
title: "prefer-promise-static-methods"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-promise-static-methods.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-promise-static-methods

📝 Prefer `Promise.resolve()` and `Promise.reject()` over trivial `new Promise()` calls.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Prefer static methods when a `new Promise()` executor only calls `resolve` or `reject` with no argument or a simple value.

Calls, property reads, constructors, and other nontrivial expressions are ignored because they may throw outside the executor. `prefer-promise-try` covers `resolve(fn())`.

Identifier fixes can turn an unbound or temporal dead zone read into a synchronous throw. `Promise.resolve()` may reuse an existing promise instead of wrapping it.

TypeScript `new Promise<T>()` calls that resolve are reported without a fix: `Promise.resolve<T>()` returns `Promise<Awaited<T>>`, which may differ from `Promise<T>`. The `reject` form remains fixable.

## Examples

```js
// ❌
new Promise(resolve => resolve(value));

// ✅
Promise.resolve(value);
```

```js
// ❌
new Promise((resolve, reject) => reject(error));

// ✅
Promise.reject(error);
```
