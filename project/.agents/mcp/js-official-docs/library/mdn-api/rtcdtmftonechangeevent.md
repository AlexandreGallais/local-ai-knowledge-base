---
title: "RTCDTMFToneChangeEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdtmftonechangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDTMFToneChangeEvent

The **`RTCDTMFToneChangeEvent`** interface represents events sent to indicate that DTMF tones have started or finished playing. This interface is used by the `tonechange` event.

## Constructors

- `RTCDTMFToneChangeEvent()`
    Returns a new `RTCDTMFToneChangeEvent`. It takes two parameters, the first being a string representing the type of the event (always `"tonechange"`); the second a dictionary containing the initial state of the properties of the event.

## Instance properties

_In addition to the properties of `Event`, this interface offers the following:_

- `RTCDTMFToneChangeEvent.tone` (read-only)
    A string specifying the tone which has begun playing, or an empty string (`""`) if the previous tone has finished playing.

## Instance methods

_Supports the methods defined in `Event`. There are no additional methods._

## Examples

This snippet is derived loosely from the full, working example you'll find in the section on When a tone finishes playing. It appends each tone to a display box as it's played, and, once all tones have been sent, re-enabled a previously-disabled "Send" button, allowing the next DTMF string to be entered.

```js
dtmfSender.addEventListener("change", (event) => {
  if (event.tone !== "") {
    dialStringBox.innerText += event.tone;
  } else {
    sendDTMFButton.disabled = false;
  }
});
```

## See also

- WebRTC
- Its usual target: `RTCDTMFSender`.
