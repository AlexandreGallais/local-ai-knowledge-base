---
title: "no-await-expression-member"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-await-expression-member.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-await-expression-member

📝 Disallow member access from await expression.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

When accessing a member from an await expression, the await expression has to be parenthesized, which is not readable.

This rule is fixable for simple member access.

The fix turns `[0]` and `[1]` into array destructuring, which needs an iterable value. It is skipped when the awaited expression is clearly not iterable, like an object literal, but an array-like value from a call, like `(await getArrayLike())[0]`, is still fixed and would then throw.

## Examples

```js
// ❌
const foo = (await import('./foo.js')).default;

// ✅
const {default: foo} = await import('./foo.js');
```

```js
// ❌
const secondElement = (await getArray())[1];

// ✅
const [, secondElement] = await getArray();
```

```js
// ❌
const property = (await getObject()).property;

// ✅
const {property} = await getObject();
```

```js
// ❌
const data = await (await fetch('/foo')).json();

// ✅
const response = await fetch('/foo');
const data = await response.json();
```
