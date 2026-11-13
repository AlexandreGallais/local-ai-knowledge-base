---
title: "BlobEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/blobevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BlobEvent

The **`BlobEvent`** interface of the MediaStream Recording API represents events associated with a `Blob`. These blobs are typically, but not necessarily, associated with media content.

## Constructor

- `BlobEvent()`
    Creates a `BlobEvent` event with the given parameters.

## Instance properties

_Inherits properties from its parent `Event`_.

- `BlobEvent.data` (read-only)
    A `Blob` representing the data associated with the event. The event was fired on the `EventTarget` because of something happening on that specific `Blob`.
- `BlobEvent.timecode` (read-only)
    A `DOMHighResTimeStamp` indicating the difference between the timestamp of the first chunk in data and the timestamp of the first chunk in the first BlobEvent produced by this recorder. Note that the timecode in the first produced BlobEvent does not need to be zero.

## Instance methods

_No specific method; inherits methods from its parent `Event`._

## See also

- The `Event` base interface.
- MediaStream Recording API: Sends `BlobEvent` objects each time a chunk of media is ready.
- Using the MediaStream Recording API
