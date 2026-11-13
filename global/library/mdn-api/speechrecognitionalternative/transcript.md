---
title: "SpeechRecognitionAlternative: transcript property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionalternative/transcript/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionAlternative: transcript property

The **`transcript`** read-only property of the
`SpeechRecognitionResult` interface returns a string containing the
transcript of the recognized word(s).

For continuous recognition, leading or trailing whitespace will be included where
necessary so that concatenation of consecutive `SpeechRecognitionResult`s
produces a proper transcript of the session.

## Value

A string.

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
