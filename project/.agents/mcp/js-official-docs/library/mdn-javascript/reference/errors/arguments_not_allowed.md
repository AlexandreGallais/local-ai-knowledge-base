---
title: "SyntaxError: arguments is not valid in fields"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/arguments_not_allowed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: arguments is not valid in fields

The JavaScript exception "SyntaxError: arguments is not valid in fields" occurs when the `arguments` identifier is read in a class field initializer or in a static initialization block, outside of a non-arrow function.

## Message

```plain
SyntaxError: 'arguments' is not allowed in class field initializer or static initialization block (V8-based)
SyntaxError: arguments is not valid in fields (Firefox)
SyntaxError: Unexpected identifier 'arguments'. Cannot reference 'arguments' in class field initializer. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

A class field initializer expression or a class static initialization block does not have `arguments` in its scope. Trying to access it is a syntax error.

- This is true even if `arguments` is bound in a parent scope (such as when the class is nested in a non-arrow function).
- A non-arrow function declared within this scope will still bind its own `arguments` and read it normally.

## Examples

```js
function makeOne() {
  class C {
    args = { ...arguments }; // SyntaxError: arguments is not valid in fields
  }
  return new C();
}
```

```js
let CArgs;
class C {
  static {
    CArgs = arguments; // SyntaxError: arguments is not valid in fields
  }
}
```

```js
class C {
  args = {};
  constructor() {
    this.args = arguments; // You can use arguments in constructors
  }
  myMethod() {
    this.args = arguments; // You can also use it in methods
  }
}
```

```js
function makeOne() {
  const _arguments = arguments;
  class C {
    args = { ..._arguments }; // Only the identifier is forbidden
  }
  return new C();
}
```

## See also

- Classes
- Public class fields
- Static initialization blocks
