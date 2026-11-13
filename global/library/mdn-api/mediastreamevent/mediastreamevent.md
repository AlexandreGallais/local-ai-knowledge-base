---
title: "MediaStreamEvent: MediaStreamEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamevent/mediastreamevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamEvent: MediaStreamEvent() constructor

The **`MediaStreamEvent()`** constructor creates a new `MediaStreamEvent` object.

## Syntax

```js
 new MediaStreamEvent(type, options)
```

### Values

- `type`
    A string with the name of the event, like `addstream` or `removestream`.
- `options`
    An object that, in addition of the properties defined in `Event()`, can have the following properties:
    - `stream`
        A `MediaStream` representing the stream being concerned by the event.

### Return value

A new `MediaStreamEvent` object.

## Example

```js
// s is a MediaStream
const event = new MediaStreamEvent("addstream", { stream: s });
```

## Specifications

_This feature is no more part of any specification._

## See also

- WebRTC
