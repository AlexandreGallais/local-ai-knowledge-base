---
title: "Set.prototype.isDisjointFrom()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/set/isdisjointfrom/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Set.prototype.isDisjointFrom()

The **`isDisjointFrom()`** method of `Set` instances takes a set and returns a boolean indicating if this set has no elements in common with the given set.

## Syntax

```js
isDisjointFrom(other)
```

### Parameters

- `other`
    A `Set` object, or set-like object.

### Return value

`true` if this set has no elements in common with the `other` set, and `false` otherwise.

## Description

Two sets are _disjoint_ if they have no elements in common. In mathematical notation:

<math display="block">
  <semantics><mrow><mi>A</mi><mtext> is disjoint from </mtext><mi>B</mi><mo stretchy="false">⇔</mo><mi>A</mi><mo>∩</mo><mi>B</mi><mo>=</mo><mi>∅</mi></mrow><annotation encoding="TeX">A\text{ is disjoint from }B \Leftrightarrow A\cap B = \empty</annotation></semantics>
</math>

And using Venn diagram:

`isDisjointFrom()` accepts set-like objects as the `other` parameter. It requires `this` to be an actual `Set` instance, because it directly retrieves the underlying data stored in `this` without invoking any user code. Then, its behavior depends on the sizes of `this` and `other`:

- If there are more elements in `this` than `other.size`, then it iterates over `other` by calling its `keys()` method, and if any element in `other` is present in `this`, it returns `false` (and closes the `keys()` iterator by calling its `return()` method). Otherwise, it returns `true`.
- Otherwise, it iterates over the elements in `this`, and returns `false` if any element `e` in `this` causes `other.has(e)` to return a truthy value. Otherwise, it returns `true`.

Because of this implementation, the efficiency of `isDisjointFrom()` mostly depends on the size of the smaller set between `this` and `other` (assuming sets can be accessed in sublinear time).

## Examples

### Using isDisjointFrom()

The set of perfect squares (<20) is disjoint from the set of prime numbers (<20), because a perfect square is by definition decomposable into the product of two integers, while 1 is also not considered a prime number:

```js
const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19]);
const squares = new Set([1, 4, 9, 16]);
console.log(primes.isDisjointFrom(squares)); // true
```

The set of perfect squares (<20) is not disjoint from the set of composite numbers (<20), because all non-1 perfect squares are by definition composite numbers:

```js
const composites = new Set([4, 6, 8, 9, 10, 12, 14, 15, 16, 18]);
const squares = new Set([1, 4, 9, 16]);
console.log(composites.isDisjointFrom(squares)); // false
```

## See also

- Polyfill of `Set.prototype.isDisjointFrom` in `core-js`
- es-shims polyfill of `Set.prototype.isDisjointFrom`
- `Set.prototype.difference()`
- `Set.prototype.intersection()`
- `Set.prototype.isSubsetOf()`
- `Set.prototype.isSupersetOf()`
- `Set.prototype.symmetricDifference()`
- `Set.prototype.union()`
