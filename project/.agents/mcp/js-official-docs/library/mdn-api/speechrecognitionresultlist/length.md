---
title: "SpeechRecognitionResultList: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionresultlist/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionResultList: length property

The **`length`** read-only property of the
`SpeechRecognitionResultList` interface returns the length of the
"array" — the number of `SpeechRecognitionResult` objects in the
list.

## Value

A number.

## Examples

This code is excerpted from our
Speech color changer example.

```js
recognition.onresult = (event) => {
  const color = event.results[0][0].transcript;
  diagnostic.textContent = `Result received: ${color}.`;
  bg.style.backgroundColor = color;

  console.log(event.results.length);
};
```

## See also

- Web Speech API
