---
title: "TypeError: property \"x\" is non-configurable and can''t be deleted"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/cant_delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: property "x" is non-configurable and can''t be deleted

The JavaScript exception "property is non-configurable and can't be deleted" occurs
when it was attempted to delete a property, but that property is non-configurable.

## Message

```plain
TypeError: Cannot delete property 'x' of #<Object> (V8-based)
TypeError: property "x" is non-configurable and can't be deleted (Firefox)
TypeError: Unable to delete property. (Safari)
```

## Error type

`TypeError` in strict mode only.

## What went wrong?

It was attempted to delete a property, but that property is non-configurable. The
`configurable` attribute controls whether the property can be deleted from
the object and whether its attributes (other than `writable`) can be changed.

This error happens only in strict mode code. In
non-strict code, the operation returns `false`.

## Examples

### Attempting to delete non-configurable properties

Non-configurable properties are not super common, but they can be created using
`Object.defineProperty()` or `Object.freeze()`.

```js
"use strict";
const obj = Object.freeze({ name: "Elsa", score: 157 });
delete obj.score; // TypeError
```

```js
"use strict";
const obj = {};
Object.defineProperty(obj, "foo", { value: 2, configurable: false });
delete obj.foo; // TypeError
```

```js
"use strict";
const frozenArray = Object.freeze([0, 1, 2]);
frozenArray.pop(); // TypeError
```

There are also a few non-configurable properties built into JavaScript. Maybe you tried
to delete a mathematical constant.

```js
"use strict";
delete Math.PI; // TypeError
```

## See also

- `delete`
- `Object.defineProperty()`
- `Object.freeze()`
