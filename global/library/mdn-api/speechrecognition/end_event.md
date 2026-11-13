---
title: "SpeechRecognition: end event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/end_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: end event

The **`end`** event of the Web Speech API `SpeechRecognition` object is fired when the speech recognition service has disconnected.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("end", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onend = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Examples

You can use the `end` event in an `addEventListener` method:

```js
const recognition = new (
  window.SpeechRecognition || window.webkitSpeechRecognition
)();

recognition.addEventListener("end", () => {
  console.log("Speech recognition service disconnected");
});
```

Or use the `onend` event handler property (but note that this replaces other event listeners added using `onend`, if any):

```js
recognition.onend = () => {
  console.log("Speech recognition service disconnected");
};
```

## See also

- Web Speech API
