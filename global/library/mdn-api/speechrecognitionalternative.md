---
title: "SpeechRecognitionAlternative"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionalternative/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionAlternative

The **`SpeechRecognitionAlternative`** interface of the Web Speech API represents a single word that has been recognized by the speech recognition service.

## Instance properties

- `SpeechRecognitionAlternative.transcript` (read-only)
    Returns a string containing the transcript of the recognized word.
- `SpeechRecognitionAlternative.confidence` (read-only)
    Returns a numeric estimate between 0 and 1 of how confident the speech recognition system is that the recognition is correct.

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
