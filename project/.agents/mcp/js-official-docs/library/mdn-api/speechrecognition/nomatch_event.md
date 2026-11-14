---
title: "SpeechRecognition: nomatch event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/nomatch_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: nomatch event

The **`nomatch`** event of the Web Speech API is fired when the speech recognition service returns a final result with no significant recognition.

This may involve some degree of recognition, which doesn't meet or exceed the `confidence` threshold.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("nomatch", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onnomatch = (event) => { }
```

## Event type

A `SpeechRecognitionEvent`. Inherits from `Event`.

## Examples

You can use the `nomatch` event in an `addEventListener` method:

```js
const recognition = new (
  window.SpeechRecognition || window.webkitSpeechRecognition
)();

recognition.addEventListener("nomatch", () => {
  console.error("Speech not recognized");
});
```

Or use the `onnomatch` event handler property (but note that this replaces other event listeners added using `onnomatch`, if any):

```js
recognition.onnomatch = () => {
  console.error("Speech not recognized");
};
```

## See also

- Web Speech API
