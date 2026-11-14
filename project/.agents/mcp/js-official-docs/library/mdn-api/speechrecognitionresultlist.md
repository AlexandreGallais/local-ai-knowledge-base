---
title: "SpeechRecognitionResultList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionresultlist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionResultList

The **`SpeechRecognitionResultList`** interface of the Web Speech API represents a list of `SpeechRecognitionResult` objects, or a single one if results are being captured in `non-continuous` mode.

## Instance properties

- `SpeechRecognitionResultList.length` (read-only)
    Returns the length of the "array" — the number of `SpeechRecognitionResult` objects in the list.

## Instance methods

- `SpeechRecognitionResultList.item`
    A standard getter that allows `SpeechRecognitionResult` objects in the list to be accessed via array syntax.

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
