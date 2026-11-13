---
title: "SyntaxError: missing ] after element list"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/missing_bracket_after_list/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: missing ] after element list

The JavaScript exception "missing ] after element list" occurs when there is an error
with the array initializer syntax somewhere. Likely there is a closing square bracket
(`]`) or a comma (`,`) missing.

## Message

```plain
SyntaxError: missing ] after element list (Firefox)
SyntaxError: Unexpected token '<example-value>'. Expected either a closing '<example-value>' or a '<example-value>' following an array element. (Safari)
```

## Error type

`SyntaxError`.

## What went wrong?

There is an error with the array initializer syntax somewhere. Likely there is a
closing square bracket (`]`) or a comma (`,`) missing.

## Examples

### Incomplete array initializer

```js
const list = [1, 2,

const instruments = [
  "Ukulele",
  "Guitar",
  "Piano",
};

const data = [{ foo: "bar" } { bar: "foo" }];
```

Correct would be:

```js
const list = [1, 2];

const instruments = ["Ukulele", "Guitar", "Piano"];

const data = [{ foo: "bar" }, { bar: "foo" }];
```

## See also

- `Array`
