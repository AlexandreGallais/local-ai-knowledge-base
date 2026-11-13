---
title: "SpeechRecognitionResult"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionresult/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionResult

The **`SpeechRecognitionResult`** interface of the Web Speech API represents a single recognition match, which may contain multiple `SpeechRecognitionAlternative` objects.

## Instance properties

- `SpeechRecognitionResult.isFinal` (read-only)
    A boolean value that states whether this result is final (true) or not (false) — if so, then this is the final time this result will be returned; if not, then this result is an interim result, and may be updated later on.
- `SpeechRecognitionResult.length` (read-only)
    Returns the length of the "array" — the number of `SpeechRecognitionAlternative` objects contained in the result (also referred to as "n-best alternatives".)

## Instance methods

- `SpeechRecognitionResult.item`
    A standard getter that allows `SpeechRecognitionAlternative` objects within the result to be accessed via array syntax.

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
