---
title: "SpeechRecognition: audioend event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/audioend_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: audioend event

The **`audioend`** event of the Web Speech API is fired when the user agent has finished capturing audio for speech recognition.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("audioend", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onaudioend = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Examples

You can use the `audioend` event in an `addEventListener` method:

```js
const recognition = new (
  window.SpeechRecognition || window.webkitSpeechRecognition
)();

recognition.addEventListener("audioend", () => {
  console.log("Audio capturing ended");
});
```

Or use the `onaudioend` event handler property (but note that this replaces other event listeners added using `onaudioend`, if any):

```js
recognition.onaudioend = () => {
  console.log("Audio capturing ended");
};
```

## See also

- Web Speech API
