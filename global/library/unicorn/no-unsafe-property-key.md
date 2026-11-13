---
title: "no-unsafe-property-key"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unsafe-property-key.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unsafe-property-key

📝 Disallow unsafe values as property keys.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

JavaScript property keys are strings or symbols. Other values used as property keys are coerced first. This can hide bugs when objects become `"[object Object]"`, arrays become joined strings, BigInts become string keys without the `n` suffix, or unsafe and non-finite numbers become surprising string keys.

Use an explicit string or symbol key when stringification is intended. Use `Map` or `WeakMap` when object identity is the key.

The rule uses static values, TypeScript annotations, and TypeScript type information when available. It intentionally allows common safe numeric indexing like `array[0]`.

## Examples

```js
// ❌
const key = {};
object[key] = value;

// ✅
object[String(key)] = value;
```

```js
// ❌
const key = [];
const object = {
	[key]: value,
};

// ✅
const object = {
	[key.join('')]: value,
};
```

```js
// ❌
array[4n] = value;

// ✅
array[Number(4n)] = value;
```

```js
// ❌
const object = {
	9007199254740992: value,
};

// ✅
const object = {
	'9007199254740992': value,
};
```

```js
// ❌
const object = {
	[{}]: value,
};

// ✅
const map = new Map([
	[{}, value],
]);
```
