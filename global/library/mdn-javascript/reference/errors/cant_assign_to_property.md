---
title: "TypeError: can''t assign to property \"x\" on \"y\": not an object"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/cant_assign_to_property/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: can''t assign to property "x" on "y": not an object

The JavaScript strict mode exception "can't assign to property" occurs when attempting
to create a property on primitive value
such as a symbol, a string, a number or a boolean. Primitive values cannot hold any property.

## Message

```plain
TypeError: Cannot create property 'x' on number '1' (V8-based)
TypeError: can't assign to property "x" on 1: not an object (Firefox)
TypeError: Attempted to assign to readonly property. (Safari)
```

## Error type

`TypeError`.

## What went wrong?

In strict mode, a `TypeError` is raised when attempting to
create a property on primitive value such
as a symbol, a string, a number or a boolean. Primitive values cannot hold any property.

The problem might be that an unexpected value is flowing at an unexpected place, or
that an object variant of a `String` or a `Number` is expected.

## Examples

### Invalid cases

```js
"use strict";

const foo = "my string";
// The following line does nothing if not in strict mode.
foo.bar = {}; // TypeError: can't assign to property "bar" on "my string": not an object
```

### Fixing the issue

Either fix the code to prevent the primitive from being used in such places, or fix the issue by creating the object equivalent `Object`.

```js
"use strict";

const foo = new String("my string");
foo.bar = {};
```

## See also

- Strict mode
- primitive
