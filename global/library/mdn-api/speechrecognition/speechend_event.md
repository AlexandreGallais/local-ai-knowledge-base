---
title: "SpeechRecognition: speechend event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/speechend_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: speechend event

The **`speechend`** event of the Web Speech API is fired when speech recognized by the speech recognition service has stopped being detected.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("speechend", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onspeechend = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Examples

You can use the `speechend` event in an `addEventListener` method:

```js
const recognition = new (
  window.SpeechRecognition || window.webkitSpeechRecognition
)();

recognition.addEventListener("speechend", () => {
  console.log("Speech has stopped being detected");
});
```

Or use the `onspeechend` event handler property (but note that this replaces other event listeners added using `onspeechend`, if any):

```js
recognition.onspeechend = () => {
  console.log("Speech has stopped being detected");
};
```

## See also

- Web Speech API
