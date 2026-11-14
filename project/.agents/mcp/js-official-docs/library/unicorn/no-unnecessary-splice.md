---
title: "no-unnecessary-splice"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unnecessary-splice.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unnecessary-splice

📝 Disallow `Array#splice()` when simpler alternatives exist.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Prefer clearer array methods over `Array#splice()` when no elements are removed, when adding or removing at the start or end, or when emptying an array.

## Examples

```js
// ❌
array.splice(index, 0);

// ✅
// Remove the no-op call.
```

```js
// ❌
array.splice(0, 1);

// ✅
array.shift();
```

```js
// ❌
array.splice(0, 0, item);

// ✅
array.unshift(item);
```

```js
// ❌
array.splice(array.length - 1, 1);

// ✅
array.pop();
```

```js
// ❌
array.splice(array.length, 0, item);

// ✅
array.push(item);
```

```js
// ❌
array.splice(0);

// ✅
array.length = 0;
```
