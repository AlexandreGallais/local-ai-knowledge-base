---
title: "SyntaxError: applying the 'delete' operator to an unqualified name is deprecated"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/delete_in_strict_mode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: applying the 'delete' operator to an unqualified name is deprecated

The JavaScript strict mode-only exception "applying the 'delete' operator to an unqualified name is deprecated" occurs when variables are attempted to be deleted using the `delete` operator.

## Message

```plain
SyntaxError: Delete of an unqualified identifier in strict mode. (V8-based)
SyntaxError: applying the 'delete' operator to an unqualified name is deprecated (Firefox)
SyntaxError: Cannot delete unqualified property 'a' in strict mode. (Safari)
```

## Error type

`SyntaxError` in strict mode only.

## What went wrong?

Normal variables in JavaScript can't be deleted using the `delete` operator. In strict mode, an attempt to delete a variable will throw an error and is not allowed.

The `delete` operator can only delete properties on an object. Object properties are "qualified" if they are configurable.

Unlike what common belief suggests, the `delete` operator has **nothing** to do with directly freeing memory. Memory management is done indirectly via breaking references, see the memory management page and the `delete` operator page for more details.

This error only happens in strict mode code. In non-strict code, the operation just returns `false`.

## Examples

### Freeing the contents of a variable

Attempting to delete a plain variable throws an error in strict mode:

```js
"use strict";

var x;

// …

delete x;

// SyntaxError: applying the 'delete' operator to an unqualified name
// is deprecated
```

To free the contents of a variable, you can set it to `null`:

```js
"use strict";

var x;

// …

x = null;

// x can be garbage collected
```

## See also

- `delete`
- Memory management
- TypeError: property "x" is non-configurable and can't be deleted
