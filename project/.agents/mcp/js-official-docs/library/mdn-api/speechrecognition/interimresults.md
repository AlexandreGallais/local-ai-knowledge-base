---
title: "SpeechRecognition: interimResults property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/interimresults/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: interimResults property

The **`interimResults`** property of the
`SpeechRecognition` interface controls whether interim results should be
returned (`true`) or not (`false`). Interim results are results
that are not yet final (e.g., the `SpeechRecognitionResult.isFinal` property
is `false`).

The default value for **`interimResults`** is `false`.

## Value

A boolean value representing the state of the current
`SpeechRecognition`'s interim results. `true` means interim
results are returned, and `false` means they aren't.

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
