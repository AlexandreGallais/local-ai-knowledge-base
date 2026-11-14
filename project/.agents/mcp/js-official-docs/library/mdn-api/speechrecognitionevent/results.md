---
title: "SpeechRecognitionEvent: results property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionevent/results/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionEvent: results property

The **`results`** read-only property of the
`SpeechRecognitionEvent` interface returns a
`SpeechRecognitionResultList` object representing all the speech
recognition results for the current session.

Specifically this object will contain all final results that have been returned,
followed by the current best hypothesis for all interim results. When subsequent
`result` events are fired, interim results may be overwritten by a newer
interim result or by a final result — they may even be removed, if they are at the end
of the "results" array and the array length decreases. Final results on the other hand
will not be overwritten or removed.

## Value

A `SpeechRecognitionResultList` object.

## Examples

This code is excerpted from our
Speech color changer example.

```js
recognition.onresult = (event) => {
  const color = event.results[0][0].transcript;
  diagnostic.textContent = `Result received: ${color}.`;
  bg.style.backgroundColor = color;
};
```

## See also

- Web Speech API
