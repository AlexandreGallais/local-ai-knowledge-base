---
title: "SpeechRecognition: audiostart event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/audiostart_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: audiostart event

The **`audiostart`** event of the Web Speech API is fired when the user agent has started to capture audio for speech recognition.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("audiostart", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onaudiostart = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Examples

You can use the `audiostart` event in an `addEventListener` method:

```js
const recognition = new (
  window.SpeechRecognition || window.webkitSpeechRecognition
)();

recognition.addEventListener("audiostart", () => {
  console.log("Audio capturing started");
});
```

Or use the `onaudiostart` event handler property (but note that this replaces other event listeners added using `onaudiostart`, if any):

```js
recognition.onaudiostart = () => {
  console.log("Audio capturing started");
};
```

## See also

- Web Speech API
