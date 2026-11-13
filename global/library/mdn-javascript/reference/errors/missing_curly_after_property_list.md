---
title: "SyntaxError: missing } after property list"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/missing_curly_after_property_list/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: missing } after property list

The JavaScript exception "missing } after property list" occurs when there is a mistake
in the object initializer syntax somewhere.
Might be in fact a missing curly bracket, but could also be a missing comma.

## Message

```plain
SyntaxError: missing } after property list (Firefox)
SyntaxError: Unexpected identifier 'c'. Expected '}' to end an object literal. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

There is a mistake in the object initializer
syntax somewhere. Might be in fact a missing curly bracket, but could
also be a missing comma, for example. Also check if any closing curly braces or
parenthesis are in the correct order. Indenting or formatting the code a bit nicer might
also help you to see through the jungle.

## Examples

### Forgotten comma

Oftentimes, there is a missing comma in your object initializer code:

```js
const obj = {
  a: 1,
  b: { myProp: 2 }
  c: 3
};
```

Correct would be:

```js
const obj = {
  a: 1,
  b: { myProp: 2 },
  c: 3,
};
```

## See also

- Object initializer
