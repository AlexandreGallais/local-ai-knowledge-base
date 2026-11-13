---
title: "no-useless-boolean-cast"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-useless-boolean-cast.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-useless-boolean-cast

📝 Disallow unnecessary `Boolean()` casts in array predicate callbacks.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Array predicate methods already treat callback return values as truthy or falsy, so wrapping the returned expression in `Boolean()` is unnecessary.

`Boolean()` around an optional chain is kept, since it normalizes a possibly-`undefined` value to a real boolean. When type information is available, the cast is also kept whenever the argument's type includes `undefined` or `null`, even without optional-chaining syntax.

## Examples

```js
// ❌
const enabledRecords = records.filter(record => Boolean(record.enabled));

// ✅
const enabledRecords = records.filter(record => record.enabled);
```

```js
// ❌
const hasEnabledRecord = records.some(record => Boolean(record.enabled));

// ✅
const hasEnabledRecord = records.some(record => record.enabled);
```

```js
// ❌
const allRecordsAreEnabled = records.every(record => Boolean(record.enabled));

// ✅
const allRecordsAreEnabled = records.every(record => record.enabled);
```

```js
// ✅
const toBoolean = value => Boolean(value);
```

```js
// ✅ `Boolean()` normalizes a possibly-`undefined` value from optional chaining
const hasMatch = records.some(record => Boolean(record.get('name')?.includes('x')));
```
