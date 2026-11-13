---
title: "prefer-prototype-methods"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-prototype-methods.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-prototype-methods

📝 Prefer borrowing methods from the prototype instead of the instance.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

When “borrowing” a method from `Array` or `Object`, it's clearer to get it from the prototype than from an instance.

## Examples

```js
// ❌
const array = [].slice.apply(bar);

// ✅
const array = Array.prototype.slice.apply(bar);
```

```js
// ❌
const type = {}.toString.call(foo);

// ❌
const type = globalThis.toString.call(foo);

// ✅
const type = Object.prototype.toString.call(foo);
```

```js
// ❌
Reflect.apply([].forEach, arrayLike, [callback]);

// ✅
Reflect.apply(Array.prototype.forEach, arrayLike, [callback]);
```

```js
// ✅
const maxValue = Math.max.apply(Math, numbers);
```
