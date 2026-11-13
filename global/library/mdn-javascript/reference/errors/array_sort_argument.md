---
title: "TypeError: invalid Array.prototype.sort argument"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/array_sort_argument/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: invalid Array.prototype.sort argument

The JavaScript exception "invalid Array.prototype.sort argument" occurs when the argument of `Array.prototype.sort()` (and its related methods: `Array.prototype.toSorted()`, `TypedArray.prototype.sort()`, `TypedArray.prototype.toSorted()`) isn't either `undefined` or a function that compares its operands.

## Message

```plain
TypeError: The comparison function must be either a function or undefined (V8-based)

TypeError: invalid Array.prototype.sort argument (Firefox)
TypeError: non-function passed to Array.prototype.toSorted (Firefox)
TypeError: invalid %TypedArray%.prototype.sort argument (Firefox)

TypeError: Array.prototype.sort requires the comparator argument to be a function or undefined (Safari)
TypeError: Array.prototype.toSorted requires the comparator argument to be a function or undefined (Safari)
TypeError: TypedArray.prototype.sort requires the comparator argument to be a function or undefined (Safari)
TypeError: TypedArray.prototype.toSorted requires the comparator argument to be a function or undefined (Safari)
```

## Error type

`TypeError`

## What went wrong?

The argument of `Array.prototype.sort()` (and its related methods: `Array.prototype.toSorted()`, `TypedArray.prototype.sort()`, `TypedArray.prototype.toSorted()`) is expected to be either `undefined` or a function which compares its operands.

## Examples

### Invalid cases

```js
[1, 3, 2].sort(5); // TypeError
students.toSorted("name"); // TypeError
```

### Valid cases

```js
[1, 3, 2].sort(); // [1, 2, 3]
[1, 3, 2].sort((a, b) => a - b); // [1, 2, 3]
students.toSorted((a, b) => a.name.localeCompare(b.name));
```

## See also

- `Array.prototype.sort()`
- `Array.prototype.toSorted()`
- `TypedArray.prototype.sort()`
- `TypedArray.prototype.toSorted()`
