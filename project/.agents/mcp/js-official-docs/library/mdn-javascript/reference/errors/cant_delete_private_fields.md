---
title: "SyntaxError: private fields can't be deleted"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/cant_delete_private_fields/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: private fields can't be deleted

The JavaScript exception "SyntaxError: private fields can't be deleted" occurs when `delete` is used on a private element of a class or an object.

## Message

```plain
SyntaxError: Private fields can not be deleted (V8-based)
SyntaxError: private fields can't be deleted (Firefox)
SyntaxError: Cannot delete private field X (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

There's code trying to `delete` a private element (field or method) of an object or a class. This is forbidden by JavaScript—private elements cannot be added or removed on the fly.

## Examples

```js
class MyClass {
  #myPrivateField;
  deleteIt() {
    delete this.#myPrivateField; // SyntaxError: private fields can't be deleted
  }
}
```

```js
class MyClass {
  #myPrivateMethod() {
  }
  #deleteIt() {
    delete this.#myPrivateMethod; // SyntaxError: private fields can't be deleted
  }
}
```

## See also

- Classes
- Private elements
