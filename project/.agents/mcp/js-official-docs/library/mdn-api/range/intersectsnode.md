---
title: "Range: intersectsNode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/intersectsnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: intersectsNode() method

The **`Range.intersectsNode()`** method returns a boolean
indicating whether the given `Node` intersects the `Range`.

## Syntax

```js
intersectsNode(referenceNode)
```

### Parameters

- `referenceNode`
    The `Node` to compare with the `Range`.

### Return value

A boolean.

## Examples

```js
const range = document.createRange();

range.selectNode(document.getElementsByTagName("div").item(0));
const intersectingNode = range.intersectsNode(
  document.getElementsByTagName("p").item(0),
);
```

## See also

- The DOM interfaces index
