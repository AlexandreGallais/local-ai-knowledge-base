---
title: "SpeechRecognitionEvent: SpeechRecognitionEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionevent/speechrecognitionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionEvent: SpeechRecognitionEvent() constructor

The **`SpeechRecognitionEvent()`** constructor creates a new
`SpeechRecognitionEvent` object instance.

## Syntax

```js
new SpeechRecognitionEvent(type, init)
```

### Parameters

- `type`
    A string containing the name of the event. This will be `result` or `nomatch`, depending on the event that created the instance.
- `init`
    An initialization object that contains the following properties:
    - `resultIndex` (optional)
        A number representing the lowest index value result in the `SpeechRecognitionResultList` instance that has actually changed.
    - `results`
        A `SpeechRecognitionResultList` object representing all the speech recognition results returned in the associated event.

## Examples

You would be unlikely to construct a `SpeechRecognitionEvent` instance manually. Such instances are available as event objects inside `result` and `nomatch` event handler functions.

For example:

```js
recognition.addEventListener("result", (event) => {
  const color = event.results[0][0].transcript;
  diagnostic.textContent = `Result received: ${color}.`;
  bg.style.backgroundColor = color;
  console.log(`Confidence: ${event.results[0][0].confidence}`);
});
```

## See also

- Web Speech API
