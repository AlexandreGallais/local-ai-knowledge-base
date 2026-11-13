---
title: "Set.prototype.union()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/set/union/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Set.prototype.union()

The **`union()`** method of `Set` instances takes a set and returns a new set containing elements which are in either or both of this set and the given set.

## Syntax

```js
union(other)
```

### Parameters

- `other`
    A `Set` object, or set-like object.

### Return value

A new `Set` object containing elements which are in either or both of this set and the `other` set.

## Description

In mathematical notation, _union_ is defined as:

<math display="block">
  <semantics><mrow><mi>A</mi><mo>∪</mo><mi>B</mi><mo>=</mo><mo stretchy="false">{</mo><mi>x</mi><mo>∣</mo><mi>x</mi><mo>∊</mo><mi>A</mi><mtext> or </mtext><mi>x</mi><mo>∊</mo><mi>B</mi><mo stretchy="false">}</mo></mrow><annotation encoding="TeX">A\cup B = \\{x\mid x\in A\text{ or }x\in B\\}</annotation></semantics>
</math>

And using Venn diagram:

`union()` accepts set-like objects as the `other` parameter. It requires `this` to be an actual `Set` instance, because it directly retrieves the underlying data stored in `this` without invoking any user code. Then, it iterates over `other` by calling its `keys()` method, and constructs a new set with all elements in `this`, followed by all elements in `other` that are not present in `this`.

The order of elements in the returned set is first those in `this` followed by those in `other`.

## Examples

### Using union()

The following example computes the union between the set of even numbers (<10) and the set of perfect squares (<10). The result is the set of numbers that are either even or a perfect square, or both.

```js
const evens = new Set([2, 4, 6, 8]);
const squares = new Set([1, 4, 9]);
console.log(evens.union(squares)); // Set(6) { 2, 4, 6, 8, 1, 9 }
```

## See also

- Polyfill of `Set.prototype.union` in `core-js`
- es-shims polyfill of `Set.prototype.union`
- `Set.prototype.difference()`
- `Set.prototype.intersection()`
- `Set.prototype.isDisjointFrom()`
- `Set.prototype.isSubsetOf()`
- `Set.prototype.isSupersetOf()`
- `Set.prototype.symmetricDifference()`
