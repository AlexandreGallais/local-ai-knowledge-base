---
title: "WeakSet"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/weakset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WeakSet

A **`WeakSet`** is a collection of garbage-collectable values, including objects and non-registered symbols. A value in the `WeakSet` may only occur once. It is unique in the `WeakSet`'s collection.

## Description

Values of WeakSets must be garbage-collectable. Most primitive data types can be arbitrarily created and don't have a lifetime, so they cannot be stored. Objects and non-registered symbols can be stored because they are garbage-collectable.

The main differences to the `Set` object are:

- `WeakSet`s are collections of **objects and symbols only**. They cannot contain arbitrary values of any type, as `Set`s can.
- The `WeakSet` is _weak_, meaning references to objects in a `WeakSet` are held _weakly_. If no other references to a value stored in the `WeakSet` exist, those values can be garbage collected.

  > **Note:**
  > This also means that there is no list of current values stored in the collection. `WeakSets` are not enumerable.

### Key <example-value>

Like regular `Set`, value equality is based on the SameValueZero algorithm, which is the same as the `===` operator because `WeakSet` can only hold object and symbol values. This means that for object values, equality is based on object identity. They are compared by reference, not by value.

## Constructor

- `WeakSet()`
    Creates a new `WeakSet` object.

## Instance properties

These properties are defined on `WeakSet.prototype` and shared by all `WeakSet` instances.

- `WeakSet.prototype.constructor`
    The constructor function that created the instance object. For `WeakSet` instances, the initial value is the `WeakSet` constructor.
- `WeakSet.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"WeakSet"`. This property is used in `Object.prototype.toString()`.

## Instance methods

- `WeakSet.prototype.add()`
    Inserts the specified value into this set, if it is not already present.
- `WeakSet.prototype.delete()`
    Removes the specified value from this set, if it is in the set.
- `WeakSet.prototype.has()`
    Returns a boolean indicating whether the specified value exists in this `WeakSet` or not.

## Examples

### Using the WeakSet object

```js
const ws = new WeakSet();
const foo = {};
const bar = {};

ws.add(foo);
ws.add(bar);

ws.has(foo); // true
ws.has(bar); // true

ws.delete(foo); // removes foo from the set
ws.has(foo); // false, foo has been removed
ws.has(bar); // true, bar is retained
```

Note that `foo !== bar`. While they are similar objects, _they are not **the same object**_. And so they are both added to the set.

### Detecting circular references

Functions that call themselves recursively need a way of guarding against circular data structures by tracking which objects have already been processed.

`WeakSet`s are ideal for this purpose:

```js
// Execute a callback on everything stored inside an object
function execRecursively(fn, subject, _refs = new WeakSet()) {
  // Avoid infinite recursion
  if (_refs.has(subject)) {
    return;
  }

  fn(subject);
  if (typeof subject === "object" && subject) {
    _refs.add(subject);
    for (const key in subject) {
      execRecursively(fn, subject[key], _refs);
    }
    _refs.delete(subject);
  }
}

const foo = {
  foo: "Foo",
  bar: {
    bar: "Bar",
  },
};

foo.bar.baz = foo; // Circular reference!
execRecursively((obj) => console.log(obj), foo);
```

Here, a `WeakSet` is created on the first run, and passed along with every subsequent function call (using the internal `_refs` parameter).

The number of objects or their traversal order is immaterial, so a `WeakSet` is more suitable (and performant) than a `Set` for tracking object references, especially if a very large number of objects is involved.

## See also

- Polyfill of `WeakSet` in `core-js`
- `Map`
- `Set`
- `WeakMap`
