---
title: "ProgressEvent: total property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/progressevent/total/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ProgressEvent: total property

The **`ProgressEvent.total`** read-only property is a number indicating the total size of the data being transmitted or processed.

For `ProgressEvent`s dispatched by the browser, the value refers to the size, in bytes, of a resource and is derived from the `Content-Length` response header.

In a `ProgressEvent` you create yourself, this may also be the total bytes of a resource, although this can be any number.
For example, you may wish to normalize `total` to a value such as `100` or `1` if revealing the precise number of bytes of a resource is a concern.
If using `1` as a total, then `ProgressEvent.loaded` would be a decimal value between `0` and `1`.

If the event's `lengthComputable` property is `false`, this value is meaningless and should be ignored.

## Value

A number.

## See also

- The `ProgressEvent` interface it belongs to.
