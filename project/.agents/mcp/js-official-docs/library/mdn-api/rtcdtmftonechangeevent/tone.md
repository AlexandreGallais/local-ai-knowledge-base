---
title: "RTCDTMFToneChangeEvent: tone property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdtmftonechangeevent/tone/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDTMFToneChangeEvent: tone property

The read-only property **`RTCDTMFToneChangeEvent.tone`**
returns the DTMF character which has just begun to play, or an empty string
(`""`). if all queued tones have finished playing (that is,
`RTCDTMFSender.toneBuffer` is empty).

## Value

A string with the DTML character playing, or the empty string.

## Example

This example establishes a handler for the `tonechange` event which updates
an element to display the currently playing tone in its content, or, if all tones have
played, the string "\<none>".

```js
dtmfSender.ontonechange = (ev) => {
  let tone = ev.tone;
  if (tone === "") {
    tone = "&lt;none&gt;";
  }

  document.getElementById("playingTone").innerText = tone;
};
```

## See also

- WebRTC
- Using DTMF with WebRTC
- `tonechange`
- `RTCDTMFToneChangeEvent`
