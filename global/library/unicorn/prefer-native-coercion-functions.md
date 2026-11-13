---
title: "prefer-native-coercion-functions"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-native-coercion-functions.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-native-coercion-functions

📝 Prefer using `String`, `Number`, `BigInt`, `Boolean`, and `Symbol` directly.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

If a function is equivalent to `String`, `Number`, `BigInt`, `Boolean`, or `Symbol`, you should use the built-in one directly. Wrapping the built-in in a function is moot.

## Examples

```js
// ❌
const toBoolean = value => Boolean(value);

// ✅
const toBoolean = Boolean;
```

```js
// ❌
function toNumber(value) {
	return Number(value);
}

if (toNumber(foo) === 1) {}

// ✅
if (Number(foo) === 1) {}
```

```js
// ❌
const hasTruthyValue = array.some(element => element);

// ✅
const hasTruthyValue = array.some(Boolean);
```

```js
// ✅
const toStringObject = value => new String(value);
```

```js
// ✅
const toObject = value => Object(value);
```

```ts
// ✅
const strings = mixedData.filter((value): value is string => value);
```

## Note

We don't check implicit coercion like:

```js
const toString = value => '' + value;
```

```js
const toNumber = value => +value;
```

```js
const toBoolean = value => !!value;
```

It is recommended to enable the built-in ESLint rule `no-implicit-coercion` for a better experience.
