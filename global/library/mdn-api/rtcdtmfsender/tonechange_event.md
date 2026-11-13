---
title: "RTCDTMFSender: tonechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdtmfsender/tonechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDTMFSender: tonechange event

The **`tonechange`** event is sent to an `RTCDTMFSender` by the WebRTC API to indicate when DTMF tones previously queued for sending (by calling `RTCDTMFSender.insertDTMF()`) begin and end.

To determine what tone started playing, or if a tone stopped playing, check the value of the event's `tone` property.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("tonechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ontonechange = (event) => { }
```

## Event type

An `RTCDTMFToneChangeEvent`. Inherits from `Event`.

## Examples

This example establishes a handler for the `tonechange` event which updates an element to display the currently playing tone in its content, or, if all tones have played, the string "\<none>".

This can be done using `addEventListener()`:

```js
dtmfSender.addEventListener("tonechange", (ev) => {
  let tone = ev.tone;
  if (tone === "") {
    tone = "<none>";
  }

  document.getElementById("playingTone").innerText = tone;
});
```

You can also just set the `ontonechange` event handler property directly (but note that this replaces other event listeners added using `ontonechange`, if any):

```js
dtmfSender.ontonechange = (ev) => {
  let tone = ev.tone;
  if (tone === "") {
    tone = "<none>";
  }

  document.getElementById("playingTone").innerText = tone;
};
```
