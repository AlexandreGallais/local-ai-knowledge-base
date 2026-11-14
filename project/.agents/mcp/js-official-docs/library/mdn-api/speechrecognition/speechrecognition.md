---
title: "SpeechRecognition: SpeechRecognition() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/speechrecognition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: SpeechRecognition() constructor

The **`SpeechRecognition()`** constructor creates a new
`SpeechRecognition` object instance.

## Syntax

```js
new SpeechRecognition()
```

### Parameters

None.

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
