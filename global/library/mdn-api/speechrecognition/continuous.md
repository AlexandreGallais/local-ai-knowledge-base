---
title: "SpeechRecognition: continuous property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/continuous/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: continuous property

The **`continuous`** property of the
`SpeechRecognition` interface controls whether continuous results are
returned for each recognition, or only a single result.

It defaults to single results (`false`.)

## Value

A boolean value representing the current `SpeechRecognition`'s
continuous status. `true` means continuous, and `false` means not
continuous (single result each time.)

## Examples

This code is excerpted from our Speech color changer example.

```js
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// …
```

## See also

- Web Speech API
