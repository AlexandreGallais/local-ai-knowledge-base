---
title: "TypeError: getting private setter-only property"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/private_setter_only/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: getting private setter-only property

The JavaScript exception "getting private setter-only property" occurs when reading the value of a private element for which only a setter is defined.

## Message

```plain
TypeError: '#x' was defined without a getter (V8-based)
TypeError: getting private setter-only property (Firefox)
TypeError: Trying to access an undefined private getter (Safari)
```

## Error type

`TypeError`

## What went wrong?

There is an attempt to get the value of a private element for which only a setter is specified. Unlike normal objects, where an undefined getter just means the property would always return undefined, for private elements, this is an error.

## Examples

### Private element with no getter

Here, `#name` has no getter, so trying to read it using `this.#name` will throw an error.

```js
class Person {
  set #name(value) {}

  get name() {
    return this.#name;
  }
}

const person = new Person();
console.log(person.name);
```

It's not usual for a private element to have a setter without a getter. Either add a getter or refactor your program so the setter can be removed too.

## See also

- Private elements
- `set`
