---
title: "SpeechRecognition: start event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/start_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: start event

The **`start`** event of the Web Speech API `SpeechRecognition` object is fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current `SpeechRecognition`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("start", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onstart = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Examples

You can use the `start` event in an `addEventListener` method:

```js
const recognition = new (
  window.SpeechRecognition || window.webkitSpeechRecognition
)();

recognition.addEventListener("start", () => {
  console.log("Speech recognition service has started");
});
```

Or use the `onstart` event handler property (but note that this replaces other event listeners added using `onstart`, if any):

```js
recognition.onstart = () => {
  console.log("Speech recognition service has started");
};
```

## See also

- Web Speech API
