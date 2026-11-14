---
title: "Range: cloneRange() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/clonerange/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: cloneRange() method

The **`Range.cloneRange()`** method returns a
`Range` object with boundary points identical to the cloned
`Range`.

The returned clone is copied by value, not reference, so a change in either
`Range` does not affect the other.

## Syntax

```js
cloneRange()
```

### Parameters

None.

### Return value

A `Range` object.

## Examples

```js
const range = document.createRange();
range.selectNode(document.getElementsByTagName("div").item(0));
const clone = range.cloneRange();
```

## See also

- The DOM interfaces index
