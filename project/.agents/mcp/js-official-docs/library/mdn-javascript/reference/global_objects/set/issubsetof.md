---
title: "Set.prototype.isSubsetOf()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/set/issubsetof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Set.prototype.isSubsetOf()

The **`isSubsetOf()`** method of `Set` instances takes a set and returns a boolean indicating if all elements of this set are in the given set.

## Syntax

```js
isSubsetOf(other)
```

### Parameters

- `other`
    A `Set` object, or set-like object.

### Return value

`true` if all elements in this set are also in the `other` set, and `false` otherwise.

## Description

In mathematical notation, _subset_ is defined as:

<math display="block">
  <semantics><mrow><mi>A</mi><mo>⊆</mo><mi>B</mi><mo stretchy="false">⇔</mo><mo>∀</mo><mi>x</mi><mo>∊</mo><mi>A</mi><mo>,</mo><mspace width="0.16666666666666666em"></mspace><mi>x</mi><mo>∊</mo><mi>B</mi></mrow><annotation encoding="TeX">A\subseteq B \Leftrightarrow \forall x\in A,\,x\in B</annotation></semantics>
</math>

And using Venn diagram:

> **Note:**
> The _subset_ relationship is not _proper subset_, which means `isSubsetOf()` returns `true` if `this` and `other` contain the same elements.

`isSubsetOf()` accepts set-like objects as the `other` parameter. It requires `this` to be an actual `Set` instance, because it directly retrieves the underlying data stored in `this` without invoking any user code. Then, its behavior depends on the sizes of `this` and `other`:

- If there are more elements in `this` than `other.size`, then it directly returns `false`.
- Otherwise, it iterates over the elements in `this`, and returns `false` if any element `e` in `this` causes `other.has(e)` to return a falsy value. Otherwise, it returns `true`.

## Examples

### Using isSubsetOf()

The set of multiples of 4 (<20) is a subset of even numbers (<20):

```js
const fours = new Set([4, 8, 12, 16]);
const evens = new Set([2, 4, 6, 8, 10, 12, 14, 16, 18]);
console.log(fours.isSubsetOf(evens)); // true
```

The set of prime numbers (<20) is not a subset of all odd numbers (<20), because 2 is prime but not odd:

```js
const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19]);
const odds = new Set([3, 5, 7, 9, 11, 13, 15, 17, 19]);
console.log(primes.isSubsetOf(odds)); // false
```

Equivalent sets are subsets of each other:

```js
const set1 = new Set([1, 2, 3]);
const set2 = new Set([1, 2, 3]);
console.log(set1.isSubsetOf(set2)); // true
console.log(set2.isSubsetOf(set1)); // true
```

## See also

- Polyfill of `Set.prototype.isSubsetOf` in `core-js`
- es-shims polyfill of `Set.prototype.isSubsetOf`
- `Set.prototype.difference()`
- `Set.prototype.intersection()`
- `Set.prototype.isDisjointFrom()`
- `Set.prototype.isSupersetOf()`
- `Set.prototype.symmetricDifference()`
- `Set.prototype.union()`
