---
title: "no-null"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-null.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-null

📝 Disallow the use of the `null` literal.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Disallow the use of the `null` literal, to encourage using `undefined` instead. Using one absence value within a codebase reduces ambiguity when APIs exchange missing values. You can learn more in <https://github.com/sindresorhus/meta/discussions/7>

## Examples

```js
// ❌
let foo = null;

// ✅
let foo;
```

```js
// ❌
if (bar == null) {}

// ✅
if (bar == undefined) {}
```

```js
// ✅
const foo = Object.create(null);
```

```js
// ✅
if (foo === null) {}
```

## Options

Type: `object`

### checkArguments

Type: `boolean`\
Default: `true`

Disallow the use of `null` as a direct function call or constructor argument. Pass `checkArguments: false` to disable checking them.

```js
/* eslint unicorn/no-null: ["error", {"checkArguments": true}] */
// ❌
foo(null);
```

```js
/* eslint unicorn/no-null: ["error", {"checkArguments": false}] */
// ✅
foo(null);
new HttpResponse(null);
```

### checkStrictEquality

Type: `boolean`\
Default: `false`

Strict equality(`===`) and strict inequality(`!==`) is ignored by default.

```js
/* eslint unicorn/no-null: ["error", {"checkStrictEquality": true}] */
// ❌
if (foo === null) {}

// ✅
// eslint-disable-next-line unicorn/no-null
if (foo === null) {}
```

## Why

- “Intent to stop using `null` in my JS code”.
- TypeScript coding guidelines.
- ESLint rule proposal.
- Douglas Crockford on bottom values in JavaScript.
