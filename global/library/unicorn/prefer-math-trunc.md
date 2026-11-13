---
title: "prefer-math-trunc"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-math-trunc.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-math-trunc

📝 Prefer `Math.trunc()` for truncating numbers.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Enforces a convention of using `Math.trunc()` instead of less clear truncation patterns.
It prevents the use of the following patterns:

- `x | 0` (`bitwise OR` with 0)
- `~~x` (two `bitwise NOT`)
- `x >> 0` (`Signed Right Shift` with 0)
- `x << 0` (`Left Shift` with 0)
- `x ^ 0` (`bitwise XOR` with 0)
- `parseInt(String(x), 10)`
- `Number.parseInt(String(x), 10)`

These patterns help truncate numbers but they are not clear and do not work in some cases. For example, `parseInt(String(x), 10)` can produce unexpected results for very large or very small numbers that stringify to exponential notation.

None of these patterns is exactly equivalent to `Math.trunc(x)`, so the rule only offers suggestions. The bitwise patterns convert the value to a 32-bit integer, so they wrap values outside that range and turn `NaN` into `0` (`~~(2 ** 32)` is `0`, while `Math.trunc(2 ** 32)` is `4294967296`). There is no suggestion for an assignment whose left-hand side has a side effect, or when a comment would be lost.

## Examples

```js
const foo = 37.4;

// ❌
console.log(foo | 0);

// ❌
console.log(~~foo);

// ❌
console.log(foo << 0);

// ❌
console.log(foo >> 0);

// ❌
console.log(foo.bar ^ 0);

// ❌
console.log(parseInt(String(foo), 10));

// ❌
console.log(Number.parseInt(String(foo), 10));

// ✅
console.log(Math.trunc(foo));
```

```js
let foo = 37.4;

// ❌
foo |= 0;

// ✅
foo = Math.trunc(foo);
```

```js
// ✅
const foo = 37.4;
console.log(foo | 3);
```

```js
// ✅
const foo = 37.4;
console.log(~foo);
```

```js
// ✅
const foo = 37.4;
console.log(foo >> 3);
```

```js
// ✅
const foo = 37.4;
console.log(foo << 3);
```

```js
// ✅
const foo = 37.4;
console.log(foo ^ 3);
```
