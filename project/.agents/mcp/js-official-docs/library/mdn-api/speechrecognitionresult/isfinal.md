---
title: "SpeechRecognitionResult: isFinal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionresult/isfinal/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionResult: isFinal property

The **`isFinal`** read-only property of the
`SpeechRecognitionResult` interface is a boolean value that states
whether this result is final (`true`) or not (`false`) — if so,
then this is the final time this result will be returned; if not, then this result is an
interim result, and may be updated later on.

## Value

A boolean value.

## Examples

```js
recognition.onresult = (event) => {
  const color = event.results[0][0].transcript;
  diagnostic.textContent = `Result received: ${color}.`;
  bg.style.backgroundColor = color;

  console.log(event.results[0].isFinal);
};
```

## See also

- Web Speech API
