---
title: "prefer-negative-index"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-negative-index.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-negative-index

📝 Prefer negative index over `.length - index` when possible.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Negative indexes express positions from the end directly, avoiding length arithmetic and making the intent easier to read.

Prefer negative index over calculating from `.length` for:

- `String#slice()`
- `Array#slice()`
- `TypedArray#slice()`
- `String#at()`
- `Array#at()`
- `TypedArray#at()`
- `Array#splice()`
- `Array#toSpliced()`
- `TypedArray#subarray()`

Only `.length - 1` is autofixed. Other offsets are suggestions because they can change behavior when the offset exceeds the receiver's length. For example, `[1, 2, 3].slice(3 - 4)` returns `[3]`, while `[1, 2, 3].slice(-4)` returns the entire array. Check that the offset stays within bounds before applying a suggestion.

This rule intentionally excludes `Array#with()` and `TypedArray#with()` because negative indexes throw on empty arrays, so `array.with(-1, value)` is not equivalent to `array.with(array.length - 1, value)`.

## Examples

```js
// ❌
foo.slice(foo.length - 2, foo.length - 1);

// ✅
foo.slice(-2, -1);
```

```js
// ❌
foo.splice(foo.length - 1, 1);

// ✅
foo.splice(-1, 1);
```

```js
// ❌
foo.at(foo.length - 1);

// ✅
foo.at(-1);
```

```js
// ❌
Array.prototype.slice.call(foo, foo.length - 2, foo.length - 1);

// ✅
Array.prototype.slice.call(foo, -2, -1);
```

```js
// ❌
Array.prototype.slice.apply(foo, [foo.length - 2, foo.length - 1]);

// ✅
Array.prototype.slice.apply(foo, [-2, -1]);
```

## Related rules

- unicorn/prefer-at
