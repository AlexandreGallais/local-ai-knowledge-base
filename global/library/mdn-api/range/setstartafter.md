---
title: "Range: setStartAfter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/setstartafter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: setStartAfter() method

The **`Range.setStartAfter()`** method sets the start position
of a `Range` relative to a `Node`. The parent
`Node` of the start of the `Range` will be the same as that
for the `referenceNode`.

## Syntax

```js
setStartAfter(referenceNode)
```

### Parameters

- `referenceNode`
    The `Node` to start the `Range` after.

### Return value

None (`undefined`).

## Examples

```js
const range = document.createRange();
const referenceNode = document.getElementsByTagName("div").item(0);

range.setStartAfter(referenceNode);
```

## See also

- The DOM interfaces index
