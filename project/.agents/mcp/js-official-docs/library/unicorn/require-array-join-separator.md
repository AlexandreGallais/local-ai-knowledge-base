---
title: "require-array-join-separator"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/require-array-join-separator.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# require-array-join-separator

📝 Enforce using the separator argument with `Array#join()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

It's better to make it clear what the separator is when calling Array#join(), instead of relying on the default comma (`','`) separator.

## Examples

```js
// ❌
const string = array.join();

// ✅
const string = array.join(',');
```

```js
// ✅
const string = array.join('|');
```

```js
// ❌
const string = Array.prototype.join.call(arrayLike);

// ✅
const string = Array.prototype.join.call(arrayLike, '');
```

```js
// ❌
const string = [].join.call(arrayLike);

// ✅
const string = [].join.call(arrayLike, '\n');
```
