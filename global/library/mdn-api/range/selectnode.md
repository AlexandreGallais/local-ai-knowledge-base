---
title: "Range: selectNode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/selectnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: selectNode() method

The **`Range.selectNode()`** method sets the
`Range` to contain the `Node` and its contents. The parent
`Node` of the start and end of the `Range` will be the same as
the parent of the _referenceNode_.

## Syntax

```js
selectNode(referenceNode)
```

### Parameters

- `referenceNode`
    The `Node` to select within a `Range`.

### Return value

None (`undefined`).

## Examples

```js
let range = document.createRange();
let referenceNode = document.getElementsByTagName("div").item(0);

range.selectNode(referenceNode);
```

## See also

- The DOM interfaces index
