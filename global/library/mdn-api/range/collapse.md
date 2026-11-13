---
title: "Range: collapse() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/collapse/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: collapse() method

The **`collapse()`** method of the `Range` interface collapses the
`Range` to one of its boundary points.

A collapsed `Range` is empty, containing no content, specifying a
single-point in a DOM tree. To determine if a `Range` is already collapsed,
see the `AbstractRange.collapsed` property.

## Syntax

```js
collapse()
collapse(toStart)
```

### Parameters

- `toStart` (optional)
    A boolean value: `true` collapses the `Range`
    to its start, `false` to its end. If omitted, it defaults to
    `false`.

### Return value

None (`undefined`).

## Examples

```js
const range = document.createRange();

const referenceNode = document.getElementsByTagName("div").item(0);
range.selectNode(referenceNode);
range.collapse(true);
```

## See also

- The DOM interfaces index
