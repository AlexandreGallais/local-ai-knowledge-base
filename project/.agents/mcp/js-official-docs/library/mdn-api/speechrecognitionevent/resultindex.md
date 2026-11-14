---
title: "SpeechRecognitionEvent: resultIndex property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionevent/resultindex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionEvent: resultIndex property

The **`resultIndex`** read-only property of the
`SpeechRecognitionEvent` interface returns the lowest index value result in
the `SpeechRecognitionResultList` "array" that has actually changed.

The `SpeechRecognitionResultList` object is not an array, but it has a
getter that allows it to be accessed by array syntax.

## Value

A number.

## Examples

```js
recognition.onresult = (event) => {
  const color = event.results[0][0].transcript;
  diagnostic.textContent = `Result received: ${color}.`;
  bg.style.backgroundColor = color;
  console.log(event.resultIndex); // returns 0 if there is only one result
};
```

## See also

- Web Speech API
