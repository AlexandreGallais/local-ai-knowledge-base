---
title: "SpeechRecognition: result event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/result_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: result event

The **`result`** event of the Web Speech API is fired when the speech recognition service returns a result — a word or phrase has been positively recognized and this has been communicated back to the app

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("result", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onresult = (event) => { }
```

## Event type

A `SpeechRecognitionEvent`. Inherits from `Event`.

## Examples

This code is excerpted from our Speech color changer example.

You can use the `result` event in an `addEventListener` method:

```js
const recognition = new SpeechRecognition();

recognition.addEventListener("result", (event) => {
  const color = event.results[0][0].transcript;
  diagnostic.textContent = `Result received: ${color}.`;
  bg.style.backgroundColor = color;
});
```

Or use the `onresult` event handler property (but note that this replaces other event listeners added using `onresult`, if any):

```js
recognition.onresult = (event) => {
  const color = event.results[0][0].transcript;
  diagnostic.textContent = `Result received: ${color}.`;
  bg.style.backgroundColor = color;
};
```

## See also

- Web Speech API
