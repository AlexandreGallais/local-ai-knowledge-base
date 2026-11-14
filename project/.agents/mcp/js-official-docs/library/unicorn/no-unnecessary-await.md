---
title: "no-unnecessary-await"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unnecessary-await.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unnecessary-await

📝 Disallow awaiting non-promise values.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

The `await` operator should only be used on `Promise` values.

Awaiting a non-promise value still pauses the function for a microtask, so removing the `await` makes the code after it run earlier. The autofix is therefore only offered when nothing runs after the `await` in its function or module. The function can still settle one microtask earlier, which only matters for code that depends on the exact order of unrelated microtasks.

## Examples

```js
// ❌
await await promise;

// ✅
await promise;
```

```js
// ❌
await [promise1, promise2];

// ✅
await Promise.allSettled([promise1, promise2]);
```
