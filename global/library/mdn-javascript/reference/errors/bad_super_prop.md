---
title: "SyntaxError: use of super property/member accesses only valid within methods or eval code within methods"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/bad_super_prop/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: use of super property/member accesses only valid within methods or eval code within methods

The JavaScript exception "use of super property/member accesses only valid within methods or eval code within methods" occurs when the `super.x` or `super[x]` syntax is used outside of a method.

## Message

```plain
SyntaxError: 'super' keyword unexpected here (V8-based)
SyntaxError: use of super property accesses only valid within methods or eval code within methods (Firefox)
SyntaxError: super is not valid in this context. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

The `super.x` syntax is used to access properties on the prototype of the current object. It can be used in methods of both object literals and classes, field initializers, and static initialization blocks, but not in other contexts.

## Examples

### Invalid cases

You can't use `super.x` outside of a method in an object:

```js
const obj = {
  __proto__: { x: 1 },
  x: super.x, // SyntaxError: use of super property accesses only valid within methods or eval code within methods
};
```

You can't use `super.x` in a function, even if that function has the effect of being a method:

```js
function getX() {
  return super.x; // SyntaxError: use of super property accesses only valid within methods or eval code within methods
}

const obj = {
  getX,
  getX2: function () {
    return super.x; // SyntaxError: use of super property accesses only valid within methods or eval code within methods
  },
};

class Derived extends Base {
  getX = () => super.x;
}
```

### Valid cases

You can use `super.x` in a method:

```js
class Base {
  x = 1;
}

class Derived extends Base {
  getX() {
    return super.x;
  }
}
```

You can use `super.x` in a field initializer:

```js
class Derived extends Base {
  x = super.x;
}
```

You can use `super.x` in object methods too:

```js
const obj = {
  __proto__: { x: 1 },
  getX() {
    return super.x;
  },
};
```

## See also

- Classes
- `super`
