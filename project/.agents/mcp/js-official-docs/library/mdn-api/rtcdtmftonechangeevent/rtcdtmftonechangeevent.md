---
title: "RTCDTMFToneChangeEvent: RTCDTMFToneChangeEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdtmftonechangeevent/rtcdtmftonechangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDTMFToneChangeEvent: RTCDTMFToneChangeEvent() constructor

The **`RTCDTMFToneChangeEvent()`** constructor creates a new
`RTCDTMFToneChangeEvent` object.

## Syntax

```js
new RTCDTMFToneChangeEvent(type)
new RTCDTMFToneChangeEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `tonechange`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `tone` (optional)
        A string containing a single DTMF tone character which has
        just begun to play, or an empty string (`""`) to indicate that the previous
        tone has stopped playing. It defaults to `""`.
        See Tone characters
        for details on what characters are permitted.

### Return value

A new `RTCDTMFToneChangeEvent` object, configured as specified in the
provided options.

## See also

- WebRTC
- Using DTMF with WebRTC
- Its usual target: `RTCDTMFSender`.
