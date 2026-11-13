---
title: "SpeechRecognitionEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionEvent

The **`SpeechRecognitionEvent`** interface of the Web Speech API represents the event object for the `result` and `nomatch` events, and contains all the data associated with an interim or final speech recognition result.

## Constructor

- `SpeechRecognitionEvent()`
    Creates a new `SpeechRecognitionEvent` object.

## Instance properties

_`SpeechRecognitionEvent` also inherits properties from its parent interface, `Event`._

- `SpeechRecognitionEvent.resultIndex` (read-only)
    Returns the lowest index value result in the `SpeechRecognitionResultList` "array" that has actually changed.
- `SpeechRecognitionEvent.results` (read-only)
    Returns a `SpeechRecognitionResultList` object representing all the speech recognition results for the current session.

## Examples

This code is excerpted from our Speech color changer example.

```js
recognition.onresult = (event) => {
  const color = event.results[0][0].transcript;
  diagnostic.textContent = `Result received: ${color}.`;
  bg.style.backgroundColor = color;
};
```

## See also

- Web Speech API
