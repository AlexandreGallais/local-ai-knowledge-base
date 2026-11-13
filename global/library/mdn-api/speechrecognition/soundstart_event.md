---
title: "SpeechRecognition: soundstart event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/soundstart_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: soundstart event

The **`soundstart`** event of the Web Speech API is fired when any sound — recognizable speech or not — has been detected.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("soundstart", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onsoundstart = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Examples

You can use the `soundstart` event in an `addEventListener` method:

```js
const recognition = new (
  window.SpeechRecognition || window.webkitSpeechRecognition
)();

recognition.addEventListener("soundstart", () => {
  console.log("Some sound is being received");
});
```

Or use the `onsoundstart` event handler property (but note that this replaces other event listeners added using `onsoundstart`, if any):

```js
recognition.onsoundstart = () => {
  console.log("Some sound is being received");
};
```

## See also

- Web Speech API
