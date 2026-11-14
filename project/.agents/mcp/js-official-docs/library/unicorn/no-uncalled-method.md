---
title: "no-uncalled-method"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-uncalled-method.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-uncalled-method

📝 Disallow referencing methods without calling them.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

Forgetting to call a method returns the method function instead of the intended value. This is usually a bug in conditions, returns, and assignments.

This rule checks known `Array` and `String` methods when the receiver can be identified from syntax, type annotations, parser type information, conventional variable names like `array` and `string`, or `const` aliases of those.

Unknown receivers are ignored to avoid false positives.

## Examples

```js
// ❌
const sorted = array.sort;
```

```js
// ✅
const sorted = array.sort();
```

```js
// ❌
function normalize(string) {
	return string.toLowerCase;
}
```

```js
// ✅
function normalize(string) {
	return string.toLowerCase();
}
```

```js
// ✅
array.sort.call(array);
```

```js
// ✅
typeof string.toLowerCase === 'function';
```
