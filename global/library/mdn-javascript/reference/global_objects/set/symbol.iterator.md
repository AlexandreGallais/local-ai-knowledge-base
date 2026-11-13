---
title: "Set.prototype[Symbol.iterator]()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/set/symbol.iterator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Set.prototype[Symbol.iterator]()

The **`Symbol.iterator`** method of `Set` instances implements the iterable protocol and allows `Set` objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a set iterator object that yields the values of the set in insertion order.

The initial value of this property is the same function object as the initial value of the `Set.prototype.values` property.

```js
const set = new Set();

set.add(42);
set.add("forty two");

const iterator = set[Symbol.iterator]();

console.log(iterator.next().value);
// Expected output: 42

console.log(iterator.next().value);
// Expected output: "forty two"
```

## Syntax

```js
set[Symbol.iterator]()
```

### Parameters

None.

### Return value

The same return value as `Set.prototype.values()`: a new iterable iterator object that yields the values of the set.

## Examples

### Iteration using for...of loop

Note that you seldom need to call this method directly. The existence of the `Symbol.iterator` method makes `Set` objects iterable, and iterating syntaxes like the `for...of` loop automatically call this method to obtain the iterator to loop over.

```js
const mySet = new Set();
mySet.add("0");
mySet.add(1);
mySet.add({});

for (const v of mySet) {
  console.log(v);
}
```

### Manually hand-rolling the iterator

You may still manually call the `next()` method of the returned iterator object to achieve maximum control over the iteration process.

```js
const mySet = new Set();
mySet.add("0");
mySet.add(1);
mySet.add({});

const setIter = mySet[Symbol.iterator]();

console.log(setIter.next().value); // "0"
console.log(setIter.next().value); // 1
console.log(setIter.next().value); // {}
```

## See also

- `Set`
- `Set.prototype.entries()`
- `Set.prototype.keys()`
- `Set.prototype.values()`
- `Symbol.iterator`
- Iteration protocols
