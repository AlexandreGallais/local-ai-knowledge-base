---
title: "PictureInPictureEvent: PictureInPictureEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pictureinpictureevent/pictureinpictureevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PictureInPictureEvent: PictureInPictureEvent() constructor

The **`PictureInPictureEvent()`** constructor returns a new `PictureInPictureEvent` object.

## Syntax

```js
new PictureInPictureEvent(type, options)
```

### Parameters

- `type`
    A string representing the name of the event. It is case-sensitive and browsers set it to `enterpictureinpicture`, `leavepictureinpicture`, or `resize`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `pictureInPictureWindow`
        A `PictureInPictureWindow`.

### Return value

A new `PictureInPictureEvent` object.

## See also

- The `PictureInPictureEvent` interface it belongs to.
