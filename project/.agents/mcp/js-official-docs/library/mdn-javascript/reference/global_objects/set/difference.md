---
title: "Set.prototype.difference()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/set/difference/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Set.prototype.difference()

The **`difference()`** method of `Set` instances takes a set and returns a new set containing elements in this set but not in the given set.

## Syntax

```js
difference(other)
```

### Parameters

- `other`
    A `Set` object, or set-like object.

### Return value

A new `Set` object containing elements in this set but not in the `other` set.

## Description

In mathematical notation, _difference_ is defined as:

<math display="block">
  <semantics><mrow><mi>A</mi><mo>∖</mo><mi>B</mi><mo>=</mo><mo stretchy="false">{</mo><mi>x</mi><mo>∊</mo><mi>A</mi><mo>∣</mo><mi>x</mi><mo>∉</mo><mi>B</mi><mo stretchy="false">}</mo></mrow><annotation encoding="TeX">A\setminus B = \\{x\in A\mid x\notin B\\}</annotation></semantics>
</math>

And using Venn diagram:

`difference()` accepts set-like objects as the `other` parameter. It requires `this` to be an actual `Set` instance, because it directly retrieves the underlying data stored in `this` without invoking any user code. Then, its behavior depends on the sizes of `this` and `other`:

- If there are more elements in `this` than `other.size`, then it iterates over `other` by calling its `keys()` method, and constructs a new set with all elements in `this` that are not seen in `other`.
- Otherwise, it iterates over the elements in `this`, and constructs a new set with all elements `e` in `this` that cause `other.has(e)` to return a falsy value.

The order of elements in the returned set is the same as in `this`.

## Examples

### Using difference()

The following example computes the difference between the set of odd numbers (<10) and the set of perfect squares (<10). The result is the set of odd numbers that are not perfect squares.

```js
const odds = new Set([1, 3, 5, 7, 9]);
const squares = new Set([1, 4, 9]);
console.log(odds.difference(squares)); // Set(3) { 3, 5, 7 }
```

## See also

- Polyfill of `Set.prototype.difference` in `core-js`
- es-shims polyfill of `Set.prototype.difference`
- `Set.prototype.intersection()`
- `Set.prototype.isDisjointFrom()`
- `Set.prototype.isSubsetOf()`
- `Set.prototype.isSupersetOf()`
- `Set.prototype.symmetricDifference()`
- `Set.prototype.union()`
