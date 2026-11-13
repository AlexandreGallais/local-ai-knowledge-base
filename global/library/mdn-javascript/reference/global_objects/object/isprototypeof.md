---
title: "Object.prototype.isPrototypeOf()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/object/isprototypeof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Object.prototype.isPrototypeOf()

The **`isPrototypeOf()`** method of `Object` instances checks if this object exists in another object's prototype chain.

> **Note:**
> `isPrototypeOf()` differs from the `instanceof` operator. In the expression `object instanceof AFunction`, `object`'s prototype chain is checked against `AFunction.prototype`, not against `AFunction` itself.

```js
function Foo() {}
function Bar() {}

Bar.prototype = Object.create(Foo.prototype);

const bar = new Bar();

console.log(Foo.prototype.isPrototypeOf(bar));
// Expected output: true
console.log(Bar.prototype.isPrototypeOf(bar));
// Expected output: true
```

## Syntax

```js
isPrototypeOf(object)
```

### Parameters

- `object`
    The object whose prototype chain will be searched.

### Return value

A boolean indicating whether the calling object (`this`) lies in the prototype chain of `object`. Directly returns `false` when `object` is not an object (i.e., a primitive).

### Exceptions

- `TypeError`
    Thrown if `this` is `null` or `undefined` (because it can't be converted to an object).

## Description

All objects that inherit from `Object.prototype` (that is, all except `null`-prototype objects) inherit the `isPrototypeOf()` method. This method allows you to check whether or not the object exists within another object's prototype chain. If the `object` passed as the parameter is not an object (i.e., a primitive), the method directly returns `false`. Otherwise, the `this` value is converted to an object, and the prototype chain of `object` is searched for the `this` value, until the end of the chain is reached or the `this` value is found.

## Examples

### Using isPrototypeOf()

This example demonstrates that `Baz.prototype`, `Bar.prototype`, `Foo.prototype` and `Object.prototype` exist in the prototype chain for object `baz`:

```js
class Foo {}
class Bar extends Foo {}
class Baz extends Bar {}

const foo = new Foo();
const bar = new Bar();
const baz = new Baz();

// prototype chains:
// foo: Foo --> Object
// bar: Bar --> Foo --> Object
// baz: Baz --> Bar --> Foo --> Object
console.log(Baz.prototype.isPrototypeOf(baz)); // true
console.log(Baz.prototype.isPrototypeOf(bar)); // false
console.log(Baz.prototype.isPrototypeOf(foo)); // false
console.log(Bar.prototype.isPrototypeOf(baz)); // true
console.log(Bar.prototype.isPrototypeOf(foo)); // false
console.log(Foo.prototype.isPrototypeOf(baz)); // true
console.log(Foo.prototype.isPrototypeOf(bar)); // true
console.log(Object.prototype.isPrototypeOf(baz)); // true
```

The `isPrototypeOf()` method — along with the `instanceof` operator — comes in particularly handy if you have code that can only function when dealing with objects descended from a specific prototype chain; e.g., to guarantee that certain methods or properties will be present on that object.

For example, to execute some code that's only safe to run if a `baz` object has `Foo.prototype` in its prototype chain, you can do this:

```js
if (Foo.prototype.isPrototypeOf(baz)) {
  // do something safe
}
```

However, `Foo.prototype` existing in `baz`'s prototype chain doesn't imply `baz` was created using `Foo` as its constructor. For example, `baz` could be directly assigned with `Foo.prototype` as its prototype. In this case, if your code reads private fields of `Foo` from `baz`, it would still fail:

```js
class Foo {
  #value = "foo";
  static getValue(x) {
    return x.#value;
  }
}

const baz = { __proto__: Foo.prototype };

if (Foo.prototype.isPrototypeOf(baz)) {
  console.log(Foo.getValue(baz)); // TypeError: Cannot read private member #value from an object whose class did not declare it
}
```

The same applies to `instanceof`. If you need to read private fields in a secure way, offer a branded check method using `in` instead.

```js
class Foo {
  #value = "foo";
  static getValue(x) {
    return x.#value;
  }
  static isFoo(x) {
    return #value in x;
  }
}

const baz = { __proto__: Foo.prototype };

if (Foo.isFoo(baz)) {
  // Doesn't run, because baz is not a Foo
  console.log(Foo.getValue(baz));
}
```

## See also

- `instanceof`
- `Object.getPrototypeOf()`
- `Object.setPrototypeOf()`
- Inheritance and the prototype chain
