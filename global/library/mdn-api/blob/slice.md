---
title: "Blob: slice() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/blob/slice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Blob: slice() method

The **`slice()`** method of the `Blob` interface
creates and returns a new `Blob` object which contains data from a subset of
the blob on which it's called.

## Syntax

```js
slice()
slice(start)
slice(start, end)
slice(start, end, contentType)
```

### Parameters

- `start` (optional)
    An index into the `Blob` indicating the first byte to include in the
    new `Blob`. If you specify a negative value, it's treated as an offset
    from the end of the `Blob` toward the beginning. For example, -10 would
    be the 10th from last byte in the `Blob`. The default value is 0. If you
    specify a value for `start` that is larger than the size of the source
    `Blob`, the returned `Blob` has size 0 and contains no data.
- `end` (optional)
    An index into the `Blob` indicating the first byte that will _not_ be
    included in the new `Blob` (i.e., the byte exactly at this index is not
    included). If you specify a negative value, it's treated as an offset from the end of
    the `Blob` toward the beginning. For example, -10 would be the 10th from
    last byte in the `Blob`. The default value is `size`.
- `contentType` (optional)
    The content type to assign to the new `Blob`; this will be the value of
    its `type` property. The default value is an empty string.

### Return value

A new `Blob` object containing the specified subset of the data contained
within the blob on which this method was called. The original blob is not altered.

## See also

- `Blob`
- Using files from web applications
