---
title: "Reflect.construct()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/reflect/construct/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reflect.construct()

The **`Reflect.construct()`** static method is like the `new` operator, but as a function. It is equivalent to calling `new target(...args)`. It additionally allows you to specify a different `new.target` value.

```js
function func1(a, b, c) {
  this.sum = a + b + c;
}

const args = [1, 2, 3];
const object1 = new func1(...args);
const object2 = Reflect.construct(func1, args);

console.log(object2.sum);
// Expected output: 6

console.log(object1.sum);
// Expected output: 6
```

## Syntax

```js
Reflect.construct(target, argumentsList)
Reflect.construct(target, argumentsList, newTarget)
```

### Parameters

- `target`
    The target function to call.
- `argumentsList`
    An array-like object specifying the arguments with which `target` should be called.
- `newTarget` (optional)
    The value of the `new.target` expression inside `target`. Defaults to `target`. Generally (see example), `target` specifies the _logic_ to initialize the object, while `newTarget.prototype` specifies the _prototype_ of the constructed object.

### Return value

A new instance of `target` (or `newTarget`, if present), initialized by `target` as a constructor with the given `argumentsList`.

### Exceptions

- `TypeError`
    Thrown if `target` or `newTarget` is not a constructor, or if `argumentsList` is not an object.

## Description

`Reflect.construct()` provides the reflective semantic of a constructor call. That is, `Reflect.construct(target, argumentsList, newTarget)` is semantically equivalent to:

```js
new target(...argumentsList);
```

Note that when using the `new` operator, `target` and `newTarget` are always the same constructor — but `Reflect.construct()` allows you to pass a different `new.target` value. Conceptually, `newTarget` is the function on which `new` was called, and `newTarget.prototype` will become the constructed object's prototype, while `target` is the constructor that is actually executed to initialize the object. For example, `new.target` may also be different from the currently executed constructor in class inheritance.

```js
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {}

new B(); // "B"
```

`Reflect.construct()` allows you to invoke a constructor with a variable number of arguments. (This is also possible with the spread syntax in a normal constructor call.)

```js
const obj = new Foo(...args);
const obj = Reflect.construct(Foo, args);
```

`Reflect.construct()` invokes the `[[Construct]]` object internal method of `target`.

## Examples

### Using Reflect.construct()

```js
const d = Reflect.construct(Date, [1776, 6, 4]);
d instanceof Date; // true
d.getFullYear(); // 1776
```

### Changing new.target

If `newTarget` is passed, it changes the value of `new.target` inside the constructor. The constructed object will be an instance of `newTarget`, not `target`.

```js
function OneClass() {
  console.log("OneClass executed");
  console.log(`new.target is ${new.target.name}`);
}

function OtherClass() {
  console.log("OtherClass executed");
  console.log(`new.target is ${new.target.name}`);
}

const obj1 = Reflect.construct(OneClass, []);
// Logs:
// OneClass executed
// new.target is OneClass
console.log(obj1 instanceof OneClass); // true

const obj2 = Reflect.construct(OneClass, [], OtherClass);
// Logs:
// OneClass executed
// new.target is OtherClass
console.log(obj2 instanceof OtherClass); // true
console.log(obj2 instanceof OneClass); // false
```

Of course, there's no strong guarantee about the prototype chain of the constructed object, as it depends on the constructor's implementation. For example, if the `target` constructor returns an object, then that object will be the constructed object, regardless of the `newTarget` value. If `target` is a proxy with a `construct` trap, then the trap fully controls the construction process.

```js
function OneClass() {
  return { name: "one" };
}

function OtherClass() {
  return { name: "other" };
}

const obj1 = Reflect.construct(OneClass, [], OtherClass);
console.log(obj1.name); // 'one'
console.log(obj1 instanceof OneClass); // false
console.log(obj1 instanceof OtherClass); // false
```

A valid `new.target` should be a constructor function with a `prototype` property, but the latter is not enforced. If the `prototype` property's value is not an object, the initialized object will inherit from `Object.prototype`.

```js
function OneClass() {
  console.log("OneClass executed");
  console.log(`new.target is ${new.target.name}`);
}

function OtherClass() {
  console.log("OtherClass executed");
  console.log(`new.target is ${new.target.name}`);
}

OtherClass.prototype = null;

const obj = Reflect.construct(OneClass, [], OtherClass);
// Logs:
// OneClass executed
// new.target is OtherClass
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
```

### Reflect.construct() vs. Object.create()

Prior to the introduction of `Reflect`, objects could be constructed using an arbitrary combination of constructors and prototypes using `Object.create()`.

```js
function OneClass() {
  this.name = "one";
}

function OtherClass() {
  this.name = "other";
}

const args = [];
const obj1 = Reflect.construct(OneClass, args, OtherClass);
const obj2 = Object.create(OtherClass.prototype);
OneClass.apply(obj2, args);

console.log(obj1.name); // 'one'
console.log(obj2.name); // 'one'

console.log(obj1 instanceof OneClass); // false
console.log(obj2 instanceof OneClass); // false

console.log(obj1 instanceof OtherClass); // true
console.log(obj2 instanceof OtherClass); // true
```

However, while the end result is the same, there is one important difference in the process. When using `Object.create()` and `Function.prototype.apply()`, the `new.target` operator will point to `undefined` within the function used as the constructor, since the `new` keyword is not being used to create the object. (In fact, it uses the `apply` semantic, not `construct`, although normal functions happen to operate nearly the same.)

When invoking `Reflect.construct()`, on the other hand, the `new.target` operator will point to the `newTarget` parameter if supplied, or `target` if not.

```js
function OneClass() {
  console.log("OneClass");
  console.log(new.target);
}
function OtherClass() {
  console.log("OtherClass");
  console.log(new.target);
}

const obj1 = Reflect.construct(OneClass, args);
// Logs:
// OneClass
// function OneClass { ... }

const obj2 = Reflect.construct(OneClass, args, OtherClass);
// Logs:
// OneClass
// function OtherClass { ... }

const obj3 = Object.create(OtherClass.prototype);
OneClass.apply(obj3, args);
// Output:
//     OneClass
//     undefined
```

## See also

- Polyfill of `Reflect.construct` in `core-js`
- `Reflect`
- `new`
- `new.target`
- `handler.construct()`
