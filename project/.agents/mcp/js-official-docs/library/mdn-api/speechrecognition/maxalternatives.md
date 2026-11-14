---
title: "SpeechRecognition: maxAlternatives property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/maxalternatives/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: maxAlternatives property

The **`maxAlternatives`** property of the
`SpeechRecognition` interface sets the maximum number of
`SpeechRecognitionAlternative`s provided per
`SpeechRecognitionResult`.

The default value is 1.

## Value

A number representing the maximum returned alternatives for each result.

## Examples

This code is excerpted from our Speech color changer example.

```js
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// …
```

## See also

- Web Speech API
