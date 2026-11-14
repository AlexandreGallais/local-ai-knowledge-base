---
title: "TypeError: can''t redefine non-configurable property \"x\""
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/cant_redefine_property/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: can''t redefine non-configurable property "x"

The JavaScript exception "can't redefine non-configurable property" occurs when it was
attempted to redefine a property, but that property is non-configurable.

## Message

```plain
TypeError: Cannot redefine property: "x" (V8-based)
TypeError: can't redefine non-configurable property "x" (Firefox)
TypeError: Attempting to change value of a readonly property. (Safari)
```

## Error type

`TypeError`

## What went wrong?

It was attempted to redefine a property, but that property is non-configurable. The
`configurable` attribute controls whether the property can be deleted from
the object and whether its attributes (other than `writable`) can be changed.
Usually, properties in an object created by an
object initializer are configurable. However, for example, when using
`Object.defineProperty()`, the property isn't configurable by default.

## Examples

### Non-configurable properties created by Object.defineProperty

The `Object.defineProperty()` creates non-configurable properties if you
haven't specified them as configurable.

```js
const obj = Object.create({});
Object.defineProperty(obj, "foo", { value: "bar" });

Object.defineProperty(obj, "foo", { value: "baz" });
// TypeError: can't redefine non-configurable property "foo"
```

You will need to set the "foo" property to configurable, if you intend to redefine it
later in the code.

```js
const obj = Object.create({});
Object.defineProperty(obj, "foo", { value: "bar", configurable: true });
Object.defineProperty(obj, "foo", { value: "baz", configurable: true });
```

## See also

- [\[\[Configurable\]\]](/en-US/docs/Web/JavaScript/Guide/Data_structures#properties)
- `Object.defineProperty()`
