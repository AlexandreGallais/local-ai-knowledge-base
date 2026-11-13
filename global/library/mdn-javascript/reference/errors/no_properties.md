---
title: "TypeError: null/undefined has no properties"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/no_properties/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: null/undefined has no properties

The JavaScript exception "null (or undefined) has no properties" occurs when you
attempt to access properties of `null` and `undefined`. They
don't have any.

## Message

```plain
TypeError: Cannot read properties of undefined (reading 'x') (V8-based)
TypeError: Cannot destructure 'x' as it is undefined. (V8-based)
TypeError: Cannot destructure property 'x' of 'y' as it is undefined. (V8-based)
TypeError: null has no properties (Firefox)
TypeError: undefined has no properties (Firefox)
TypeError: undefined is not an object (evaluating 'undefined.x') (Safari)
TypeError: Right side of assignment cannot be destructured (Safari)
```

## Error type

`TypeError`.

## What went wrong?

Both `null` and `undefined` have no properties you could access. Therefore, you cannot use property accessors on them, or destructure them.

## Examples

### null and undefined have no properties

```js
null.foo;
// TypeError: null has no properties

undefined.bar;
// TypeError: undefined has no properties
```

## See also

- `null`
- `undefined`
