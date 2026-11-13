---
title: "SpeechRecognitionAlternative: confidence property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionalternative/confidence/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionAlternative: confidence property

The **`confidence`** read-only property of the
`SpeechRecognitionResult` interface returns a numeric estimate of how
confident the speech recognition system is that the recognition is correct.

> **Note:**
> Mozilla's implementation of `confidence` is still
> being worked on — at the moment, it always seems to return 1.

## Value

A number between 0 and 1.

## Examples

This code is excerpted from our
Speech color changer example.

```js
recognition.onresult = (event) => {
  const color = event.results[0][0].transcript;
  diagnostic.textContent = `Result received: ${color}.`;
  bg.style.backgroundColor = color;
  console.log(`Confidence: ${event.results[0][0].confidence}`);
};
```

## See also

- Web Speech API
