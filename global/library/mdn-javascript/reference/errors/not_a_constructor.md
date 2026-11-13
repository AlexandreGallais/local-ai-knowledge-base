---
title: "TypeError: \"x\" is not a constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/not_a_constructor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: "x" is not a constructor

The JavaScript exception "is not a constructor" occurs when there was an attempt to use
an object or a variable as a constructor, but that object or variable is not a
constructor.

## Message

```plain
TypeError: x is not a constructor (V8-based & Firefox & Safari)
```

## Error type

`TypeError`

## What went wrong?

There was an attempt to use an object or a variable as a constructor, but that object
or variable is not a constructor. See constructor
or the `new` operator
for more information on what a constructor is.

There are many global objects, like `String` or `Array`, which
are constructable using `new`. However, some global objects are not and their
properties and methods are static. The following JavaScript standard built-in objects
are not a constructor: `Math`, `JSON`, `Symbol`,
`Reflect`, `Intl`, `Atomics`.

Generator functions cannot be used as constructors either.

## Examples

### Invalid cases

```js
const Car = 1;
new Car();
// TypeError: Car is not a constructor

new Math();
// TypeError: Math is not a constructor

new Symbol();
// TypeError: Symbol is not a constructor

function* f() {}
const obj = new f();
// TypeError: f is not a constructor
```

### A car constructor

Suppose you want to create an object type for cars. You want this type of object to be
called `Car`, and you want it to have properties for make, model, and year.
To do this, you would write the following function:

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
```

Now you can create an object called `myCar` as follows:

```js
const myCar = new Car("Eagle", "Talon TSi", 1993);
```

### In Promises

When returning an immediately-resolved or immediately-rejected Promise, you do not need to create a `new Promise(...)` and act on it. Instead, use the `Promise.resolve()` or `Promise.reject()` static methods.

This is not legal (the `Promise` constructor is not being called correctly) and will throw a `TypeError: this is not a constructor` exception:

```js
function fn() {
  return new Promise.resolve(true);
}
```

This is legal, but unnecessarily long:

```js
function fn() {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
}
```

Instead, return the static method:

```js
function resolveAlways() {
  return Promise.resolve(true);
}

function rejectAlways() {
  return Promise.reject(new Error());
}
```

## See also

- constructor
- `new`
