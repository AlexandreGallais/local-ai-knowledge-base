---
title: "SyntaxError: \"x\" is a reserved identifier"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/reserved_identifier/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: "x" is a reserved identifier

The JavaScript exception "_variable_ is a reserved identifier" occurs
when reserved keywords are used as identifiers.

## Message

```plain
SyntaxError: Unexpected reserved word (V8-based)
SyntaxError: implements is a reserved identifier (Firefox)
SyntaxError: Cannot use the reserved word 'implements' as a variable name. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

Reserved keywords will throw in
if they are used as identifiers. These are reserved in
strict mode and sloppy mode:

- `enum`

The following are only reserved when they are found in strict mode code:

- `implements`
- `interface`
- `let`
- `package`
- `private`
- `protected`
- `public`
- `static`

## Examples

### Strict and non-strict reserved keywords

The `enum` identifier is generally reserved.

```js
const enum = { RED: 0, GREEN: 1, BLUE: 2 };
// SyntaxError: enum is a reserved identifier
```

In strict mode code, more identifiers are reserved.

```js
"use strict";
const package = ["potatoes", "rice", "fries"];
// SyntaxError: package is a reserved identifier
```

You'll need to rename these variables.

```js
const colorEnum = { RED: 0, GREEN: 1, BLUE: 2 };
const list = ["potatoes", "rice", "fries"];
```

### Update older browsers

If you are using an older browser that does not yet implement
`let` or
`class`,
for example, you should update to a more recent browser version that does support these
new language features.

```js
"use strict";
class DocArchiver {}

// SyntaxError: class is a reserved identifier
// (throws in older browsers only, e.g. Firefox 44 and older)
```

## See also

- Lexical grammar
