---
title: "BlobEvent: BlobEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/blobevent/blobevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BlobEvent: BlobEvent() constructor

The **`BlobEvent()`** constructor returns a newly created
`BlobEvent` object with an associated `Blob`.

## Syntax

```js
new BlobEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `dataavailable`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `data`
        The `Blob` associated with the event.
    - `timecode` (optional)
        A `DOMHighResTimeStamp` to be used in initializing the blob event.

### Return value

A new `BlobEvent` object.

## See also

- The `BlobEvent` interface it belongs to.
