---
title: "EditContext: characterBoundsRangeStart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/editcontext/characterboundsrangestart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EditContext: characterBoundsRangeStart property

The **`characterBoundsRangeStart`** read-only property of the `EditContext` interface indicates the index of the character, within the editable text content, that corresponds to the first item in the `characterBounds` array.

For example, if the `EditContent` contains the characters `abc`, and if `characterBoundRangeStart` is `1`, the first item in the `characterBounds` array contains the bounds for the character `b`.

## Value

A `Number`.
