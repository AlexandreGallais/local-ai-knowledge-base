---
title: "SpeechRecognition: error event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/error_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: error event

The **`error`** event of the Web Speech API `SpeechRecognition` object is fired when a speech recognition error occurs.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("error", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onerror = (event) => { }
```

## Event type

A `SpeechRecognitionErrorEvent`. Inherits from `Event`.

## Examples

You can use the `error` event in an `addEventListener` method:

```js
const recognition = new (
  window.SpeechRecognition || window.webkitSpeechRecognition
)();

recognition.addEventListener("error", (event) => {
  console.error(`Speech recognition error detected: ${event.error}`);
});
```

Or use the `onerror` event handler property (but note that this replaces other event listeners added using `onerror`, if any):

```js
recognition.onerror = (event) => {
  console.error(`Speech recognition error detected: ${event.error}`);
};
```

## See also

- Web Speech API
