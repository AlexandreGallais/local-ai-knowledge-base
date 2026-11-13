---
title: "SpeechRecognitionPhrase: SpeechRecognitionPhrase() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionphrase/speechrecognitionphrase/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionPhrase: SpeechRecognitionPhrase() constructor

The **`SpeechRecognitionPhrase()`** constructor creates a new `SpeechRecognitionPhrase` object.

An array of `SpeechRecognitionPhrase` objects is passed into the speech recognition engine via the `SpeechRecognition.phrases` property for contextual biasing.

## Syntax

```js
new SpeechRecognitionPhrase(phrase)
new SpeechRecognitionPhrase(phrase, boost)
```

### Parameters

- `phrase`
    A string containing a word or phrase you want boosted.
- `boost` (optional)
    A floating point number between `0.0` and `10.0` (inclusive) that represents the weight you want to apply to the `phrase`. This value is roughly equivalent to the natural log of the number of times more likely the website thinks this phrase to appear than what the speech recognition model knows. Higher values make the `phrase` more likely to be recognized. A value of `0.0` means the phrase is not boosted at all, whereas a value of `10.0` means the phrase is extremely likely to appear. If not specified, the `boost` defaults to `1.0`.
    > **Note:**
    > A high value such as `9.0` or `10.0` might make the recognition engine erroneously recognize other phrases as the specified phrase. Therefore, such values should be used rarely when constructing `SpeechRecognitionPhrase` objects.

### Return value

A new `SpeechRecognitionPhrase` object.

### Exceptions

- `SyntaxError` `DOMException`
    The specified `boost` value is less than `0.0` or greater than `10.0`.

## See also

- `SpeechRecognition`
- `SpeechRecognition.phrases`
