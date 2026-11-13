---
title: "Set.prototype.intersection()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/set/intersection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Set.prototype.intersection()

The **`intersection()`** method of `Set` instances takes a set and returns a new set containing elements in both this set and the given set.

## Syntax

```js
intersection(other)
```

### Parameters

- `other`
    A `Set` object, or set-like object.

### Return value

A new `Set` object containing elements in both this set and the `other` set.

## Description

In mathematical notation, _intersection_ is defined as:

<math display="block">
  <semantics><mrow><mi>A</mi><mo>∩</mo><mi>B</mi><mo>=</mo><mo stretchy="false">{</mo><mi>x</mi><mo>∊</mo><mi>A</mi><mo>∣</mo><mi>x</mi><mo>∊</mo><mi>B</mi><mo stretchy="false">}</mo></mrow><annotation encoding="TeX">A\cap B = \\{x\in A\mid x\in B\\}</annotation></semantics>
</math>

And using Venn diagram:

`intersection()` accepts set-like objects as the `other` parameter. It requires `this` to be an actual `Set` instance, because it directly retrieves the underlying data stored in `this` without invoking any user code. Then, its behavior depends on the sizes of `this` and `other`:

- If there are more elements in `this` than `other.size`, then it iterates over `other` by calling its `keys()` method, and constructs a new set with all elements produced that are also present in `this`.
- Otherwise, it iterates over the elements in `this`, and constructs a new set with all elements `e` in `this` that cause `other.has(e)` to return a truthy value.

Because of this implementation, the efficiency of `intersection()` mostly depends on the size of the smaller set between `this` and `other` (assuming sets can be accessed in sublinear time). The order of elements in the returned set is the same as that of the smaller of `this` and `other`.

## Examples

### Using intersection()

The following example computes the intersection between the set of odd numbers (<10) and the set of perfect squares (<10). The result is the set of odd numbers that are perfect squares.

```js
const odds = new Set([1, 3, 5, 7, 9]);
const squares = new Set([1, 4, 9]);
console.log(odds.intersection(squares)); // Set(2) { 1, 9 }
```

## See also

- Polyfill of `Set.prototype.intersection` in `core-js`
- es-shims polyfill of `Set.prototype.intersection`
- `Set.prototype.difference()`
- `Set.prototype.isDisjointFrom()`
- `Set.prototype.isSubsetOf()`
- `Set.prototype.isSupersetOf()`
- `Set.prototype.symmetricDifference()`
- `Set.prototype.union()`
