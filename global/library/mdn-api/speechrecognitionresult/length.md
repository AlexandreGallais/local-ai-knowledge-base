---
title: "SpeechRecognitionResult: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionresult/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionResult: length property

The **`length`** read-only property of the
`SpeechRecognitionResult` interface returns the length of the "array"
— the number of `SpeechRecognitionAlternative` objects contained
in the result (also referred to as "n-best alternatives".)

The number of alternatives contained in the result depends on what the
`SpeechRecognition.maxAlternatives` property was set to when the speech
recognition was first initiated.

## Value

A number.

## Examples

This code is excerpted from our Speech color changer example.

```js
recognition.onresult = (event) => {
  const color = event.results[0][0].transcript;
  diagnostic.textContent = `Result received: ${color}.`;
  bg.style.backgroundColor = color;

  console.log(event.results[0].length);
};
```

## See also

- Web Speech API
