---
title: "SpeechRecognitionPhrase: boost property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionphrase/boost/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionPhrase: boost property

The **`boost`** read-only property of the
`SpeechRecognitionPhrase` interface returns a floating point number representing the weight you want to give the corresponding `phrase`.

## Value

A floating point number between `0.0` and `10.0` (inclusive) that represents the weight you want to apply to the `phrase`. This value is roughly equivalent to the natural log of the number of times more likely the website thinks this phrase to appear than what the speech recognition model knows. Higher values make the `phrase` more likely to be recognized.

A high value such as `9.0` or `10.0` might make the recognition engine erroneously recognize other phrases as the specified phrase. Therefore, such values should be used rarely when constructing `SpeechRecognitionPhrase` objects.

## Examples

### Basic usage

The `SpeechRecognition.phrases` property holds an array of `SpeechRecognitionPhrase` objects representing contextual biasing phrases. This array can be modified just like a normal JavaScript array, for example by pushing new phrases to it dynamically:

```js
recognition.phrases.push(new SpeechRecognitionPhrase("thistle", 5.0));
```

You can then access these objects and their properties like so. To return the `boost` value of the added phrase, you could do this:

```js
// Should return 5.0
recognition.phrases[0].boost;
```

## See also

- Web Speech API
