---
title: "SyntaxError: super() is only valid in derived class constructors"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/bad_super_call/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: super() is only valid in derived class constructors

The JavaScript exception "super() is only valid in derived class constructors" occurs when the `super()` call is used somewhere that's not the body of a constructor in a class with `extends` keyword.

## Message

```plain
SyntaxError: 'super' keyword unexpected here (V8-based)
SyntaxError: super() is only valid in derived class constructors (Firefox)
SyntaxError: super is not valid in this context. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

The `super()` call is used to invoke the base constructor of a derived class, so the base class can initialize the `this` object. Using it anywhere else doesn't make sense.

`super()` can also be defined in an arrow function that's nested within the constructor. However, it cannot be defined in any other kind of function.

## Examples

### Invalid cases

You cannot call `super()` if the class has no `extends`, because there's no base class to call:

```js
class Base {
  constructor() {
    super();
  }
}
```

You cannot call `super()` in a class method, even if that method is called from the constructor:

```js
class Base {}

class Derived extends Base {
  constructor() {
    this.init();
  }

  init() {
    super();
  }
}
```

You cannot call `super()` in a function, even if the function is used as a constructor:

```js
function Base(x) {
  this.x = x;
}

function Derived() {
  super(1);
}

Object.setPrototypeOf(Derived.prototype, Base.prototype);
Object.setPrototypeOf(Derived, Base);
```

### Valid cases

You can call `super()` before calling any other method in the constructor:

```js
class Base {}

class Derived extends Base {
  constructor() {
    super();
    this.init();
  }

  init() {
    // …
  }
}
```

You can call `super()` in an arrow function that's nested within the constructor:

```js
class Base {}

class Derived extends Base {
  constructor() {
    const init = () => {
      super();
    };

    init();
  }
}
```

## See also

- Classes
- `super`
