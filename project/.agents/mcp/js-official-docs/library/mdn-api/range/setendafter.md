---
title: "Range: setEndAfter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/setendafter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: setEndAfter() method

The **`Range.setEndAfter()`** method sets the end position of a
`Range` relative to another `Node`. The parent
`Node` of end of the `Range` will be the same as that for the
`referenceNode`.

## Syntax

```js
setEndAfter(referenceNode)
```

### Parameters

- `referenceNode`
    The `Node` to end the `Range` after.

### Return value

None (`undefined`).

## Examples

```js
const range = document.createRange();
const referenceNode = document.getElementsByTagName("div").item(0);

range.setEndAfter(referenceNode);
```

## See also

- The DOM interfaces index
