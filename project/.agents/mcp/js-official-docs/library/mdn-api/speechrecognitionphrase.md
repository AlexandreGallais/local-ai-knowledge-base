---
title: "SpeechRecognitionPhrase"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionphrase/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionPhrase

The **`SpeechRecognitionPhrase`** interface of the Web Speech API represents a phrase that can be passed to the speech recognition engine for contextual biasing.

## Instance properties

- `SpeechRecognitionPhrase.boost` (read-only)
    A floating point number representing the amount of boost you want to apply to the corresponding `phrase`.
- `SpeechRecognitionPhrase.phrase` (read-only)
    A string containing the word or phrase you want boosted in the recognition engine's bias.

## Examples

### Basic usage

The following code first creates an array containing the phrases to boost and their `boost` values. We convert this data into an `ObservableArray` of `SpeechRecognitionPhrase` objects by mapping the original array elements to `SpeechRecognitionPhrase()` constructor calls:

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

After creating a `SpeechRecognition` instance, we add our contextual biasing phrases by setting the `phraseObjects` array as the value of the `SpeechRecognition.phrases` property:

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
- `SpeechRecognition.phrases`
