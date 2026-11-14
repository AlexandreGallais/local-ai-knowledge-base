---
title: "ProgressEvent: loaded property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/progressevent/loaded/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ProgressEvent: loaded property

The **`ProgressEvent.loaded`** read-only property is a number indicating the size of the data already transmitted or processed.
The progress ratio can be calculated by dividing the value of this property by `ProgressEvent.total`.

For `ProgressEvent`s dispatched by the browser in HTTP messages, the value refers to the number of bytes of a resource that are completed, and is derived from the `Content-Length` header.
For compressed requests of unknown total size, `loaded` might contain the size of the compressed or decompressed data, depending on the browser.
As of 2024, it contains the size of the compressed data in Firefox, and the size of the uncompressed data in Chrome.

In a `ProgressEvent` you create yourself, you can assign any numeric value to `loaded` that represents the amount of work completed relative to the `total` value.

## Value

A number.

## See also

- The `ProgressEvent` interface it belongs to.
