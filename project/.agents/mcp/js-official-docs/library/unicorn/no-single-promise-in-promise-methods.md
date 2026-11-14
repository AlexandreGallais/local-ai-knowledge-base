---
title: "no-single-promise-in-promise-methods"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-single-promise-in-promise-methods.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-single-promise-in-promise-methods

📝 Disallow passing single-element arrays to `Promise` methods.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Passing a single-element array to `Promise.all()`, `Promise.any()`, or `Promise.race()` is likely a mistake.

Promise combinators are intended for coordinating multiple inputs; wrapping one value adds unnecessary array handling and can hide a missing promise.

`Promise.any()` conversions are suggestions because a rejected input produces an `AggregateError`, while awaiting the input directly throws its rejection reason. Check whether callers rely on that error shape before accepting a suggestion.

## Examples

```js
// ❌
const foo = await Promise.all([promise]);

// ❌
const foo = await Promise.any([promise]);

// ❌
const foo = await Promise.race([promise]);

// ✅
const foo = await promise;
```

```js
// ❌
const promise = Promise.all([nonPromise]);

// ✅
const promise = Promise.resolve(nonPromise);
```

```js
// ✅
const foo = await Promise.all(promises);
```

```js
// ✅
const foo = await Promise.any([promise, anotherPromise]);
```

```js
// ✅
const [{value: foo, reason: error}] = await Promise.allSettled([promise]);
```
