---
title: "prefer-date-now"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-date-now.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-date-now

📝 Prefer `Date.now()` to get the number of milliseconds since the Unix Epoch.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

`Date.now()` is shorter and nicer than `new Date().getTime()`, and avoids unnecessary instantiation of `Date` objects.

## Examples

```js
// ❌
const foo = new Date().getTime();

// ❌
const foo = new Date().valueOf();

// ❌
const foo = +new Date;

// ❌
const foo = Number(new Date());

// ✅
const foo = Date.now();
```

```js
// ❌
const foo = new Date() * 2;

// ✅
const foo = Date.now() * 2;
```
