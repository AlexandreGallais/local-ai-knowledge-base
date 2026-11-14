---
title: "SyntaxError: missing : after property id"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/missing_colon_after_property_id/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: missing : after property id

The JavaScript exception "missing : after property id" occurs when objects are created
using the object initializer syntax.
A colon (`:`) separates keys and values for the
object's properties. Somehow, this colon is missing or misplaced.

## Message

```plain
SyntaxError: Invalid shorthand property initializer (V8-based)
SyntaxError: missing : after property id (Firefox)
SyntaxError: Unexpected token '<example-value>'. Expected a '<example-value>' following the property name '<example-value>'. (Safari)
SyntaxError: Unexpected token '<example-value>'. Expected an identifier as property name. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

When creating objects with the object initializer syntax,
a colon (`:`) separates keys and values for the object's properties.

```js
const obj = { propertyKey: "value" };
```

## Examples

### Colons vs. equal signs

This code fails, as the equal sign can't be used this way in this object initializer
syntax.

```js
const obj = { propertyKey = "value" };
// SyntaxError: missing : after property id
```

Correct would be to use a colon, or to use square brackets to assign a new property
after the object has been created already.

```js
const obj = { propertyKey: "value" };
```

Or alternatively:

```js
const obj = {};
obj.propertyKey = "value";
```

### Computed properties

If you create a property key from an expression, you need to use square brackets.
Otherwise the property name can't be computed:

```js
const obj = { "b"+"ar": "foo" };
// SyntaxError: missing : after property id
```

Put the expression in square brackets `[]`:

```js
const obj = { ["b" + "ar"]: "foo" };
```

## See also

- Object initializer
