---
title: "SpeechRecognition: speechstart event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/speechstart_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: speechstart event

The **`speechstart`** event of the Web Speech API is fired when sound recognized by the speech recognition service as speech has been detected.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("speechstart", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onspeechstart = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Examples

You can use the `speechstart` event in an `addEventListener` method:

```js
const recognition = new (
  window.SpeechRecognition || window.webkitSpeechRecognition
)();

recognition.addEventListener("speechstart", () => {
  console.log("Speech has been detected");
});
```

Or use the `onspeechstart` event handler property (but note that this replaces other event listeners added using `onspeechstart`, if any):

```js
recognition.onspeechstart = () => {
  console.log("Speech has been detected");
};
```

## See also

- Web Speech API
