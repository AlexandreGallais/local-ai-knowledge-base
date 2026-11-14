---
title: "DOMRectList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domrectlist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMRectList

The **`DOMRectList`** interface represents a collection of `DOMRect` objects, typically used to hold the rectangles associated with a particular element, like bounding boxes returned by methods such as `getClientRects()`. It provides access to each rectangle in the list via its index, along with a `length` property that indicates the total number of rectangles in the list.

> **Note:**
> `DOMRectList` exists for compatibility with legacy Web content and is not recommended to be used when creating new APIs.

## Instance properties

- `DOMRectList.length` (read-only)
    A read-only property that returns the total number of `DOMRect` objects in the `DOMRectList`.

## Instance methods

- `DOMRectList.item`
    Returns the `DOMRect` object at the specified index. If the `index` is out of range, it returns `null`.

## See also

- `DOMRect`
- `DOMRectReadOnly`
