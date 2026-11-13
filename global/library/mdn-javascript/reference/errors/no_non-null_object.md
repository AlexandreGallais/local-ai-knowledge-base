---
title: "TypeError: \"x\" is not a non-null object"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/no_non-null_object/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: "x" is not a non-null object

The JavaScript exception "is not a non-null object" occurs when an object is expected
somewhere and wasn't provided. `null` is not an object and won't work.

## Message

```plain
TypeError: Property description must be an object: x (V8-based)
TypeError: Property descriptor must be an object, got "x" (Firefox)
TypeError: Property description must be an object. (Safari)
```

## Error type

`TypeError`

## What went wrong?

An object is expected somewhere and wasn't provided. `null` is not an
object and won't work. You must provide a proper object in the given situation.

## Examples

### Property descriptor expected

When methods like `Object.create()` or
`Object.defineProperty()` and `Object.defineProperties()` are
used, the optional descriptor parameter expects a property descriptor object. Providing
no object (like just a number), will throw an error:

```js
Object.defineProperty({}, "key", 1);
// TypeError: 1 is not a non-null object

Object.defineProperty({}, "key", null);
// TypeError: null is not a non-null object
```

A valid property descriptor object might look like this:

```js
Object.defineProperty({}, "key", { value: "foo", writable: false });
```

## See also

- `Object.create()`
- `Object.defineProperty()`
- `Object.defineProperties()`
