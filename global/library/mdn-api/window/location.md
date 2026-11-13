---
title: "Window: location property (part 1 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/location/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: location property

The read-only **`location`** property of the `Window` interface returns a `Location` object with information about the current location of the document.

See `Location` for all available properties.

## Value

A `Location` object.

Although the `location` property itself is read-only in the sense that you can't replace the `Location` object, you can still assign to the `location` property directly, which is equivalent to assigning to its `href` property. You can also modify the `Location` object using the `assign()` and `replace()` methods.
