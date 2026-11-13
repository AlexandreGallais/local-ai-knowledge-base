---
title: "SpeechRecognition: phrases property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/phrases/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: phrases property

The **`phrases`** property of the
`SpeechRecognition` interface sets an array of `SpeechRecognitionPhrase` objects to be used for contextual biasing.

## Value

An `ObservableArray` of `SpeechRecognitionPhrase` objects.

## Examples

### Basic usage

The following code first creates an array containing the phrases to boost and their `boost` values. We convert this data to an `ObservableArray` of `SpeechRecognitionPhrase` objects by mapping the original array to `SpeechRecognitionPhrase()` constructor calls:

```js
const phraseData = [
  { phrase: "azure", boost: 5.0 },
  { phrase: "khaki", boost: 3.0 },
  { phrase: "tan", boost: 2.0 },
];

const phraseObjects = phraseData.map(
  (p) => new SpeechRecognitionPhrase(p.phrase, p.boost),
);
```

After creating a `SpeechRecognition` instance, we then plug our contextual biasing phrases into it by setting the `phraseObjects` array as the value of the `SpeechRecognition.phrases` property:

```js
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.processLocally = true;
recognition.phrases = phraseObjects;

// …
```

This code is excerpted from our on-device speech color changer (run the demo live). See Using the Web Speech API for a full explanation.

## See also

- Web Speech API
- `SpeechRecognitionPhrase`
