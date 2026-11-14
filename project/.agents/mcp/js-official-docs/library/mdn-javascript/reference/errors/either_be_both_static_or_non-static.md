---
title: "SyntaxError: getter and setter for private name #x should either be both static or non-static"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/either_be_both_static_or_non-static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: getter and setter for private name #x should either be both static or non-static

The JavaScript exception "mismatched placement" occurs when a private getter and setter are mismatched in whether or not they are `static`.

## Message

```plain
SyntaxError: Identifier '#x' has already been declared (V8-based)
SyntaxError: getter and setter for private name #x should either be both static or non-static (Firefox)
SyntaxError: Cannot declare a private non-static getter if there is a static private setter with used name. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

Private getters and setters for the same name must either be both `static`, or both non-static. This limitation does not exist for public methods.

## Examples

### Mismatched placement

```js
class Test {
  static set #foo(_) {}
  get #foo() {}
}

// SyntaxError: getter and setter for private name #foo should either be both static or non-static
```

Since `foo` is private, the methods must be either both `static`:

```js
class Test {
  static set #foo(_) {}
  static get #foo() {}
}
```

or non-static:

```js
class Test {
  set #foo(_) {}
  get #foo() {}
}
```

## See also

- `get`
- `set`
- `static`
- Private elements
