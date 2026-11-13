---
title: "SyntaxError: Unexpected '#' used outside of class body"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/hash_outside_class/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: Unexpected '#' used outside of class body

The JavaScript exception "Unexpected '#' used outside of class body" occurs when a hash
("#") is encountered in an unexpected context, most notably
outside of a class declaration.
Hashes are valid at the beginning of a file as a hashbang comment,
or inside of a class as part of a private field. You may encounter this error if you forget
the quotation marks when trying to access a DOM identifier as well.

## Message

```plain
SyntaxError: Unexpected '#' used outside of class body.
```

## Error type

`SyntaxError`

## What went wrong?

We encountered a `#` somewhere unexpected. This may be due to code moving around and no
longer being part of a class, a hashbang comment found on a line other than the first
line of a file, or accidentally forgetting the quotation marks around a DOM identifier.

## Examples

### Missing quotation marks

For each case, there might be something slightly wrong. For example

```js
document.querySelector(#some-element)
```

This can be fixed via

```js
document.querySelector("#some-element");
```

### Outside of a class

```js
class ClassWithPrivateField {
  #privateField;

  constructor() {}
}

this.#privateField = 42;
```

This can be fixed by moving the private field back into the class

```js
class ClassWithPrivateField {
  #privateField;

  constructor() {
    this.#privateField = 42;
  }
}
```

## See also

- `SyntaxError`
