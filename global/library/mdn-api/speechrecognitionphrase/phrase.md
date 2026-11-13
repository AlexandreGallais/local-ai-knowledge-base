---
title: "SpeechRecognitionPhrase: phrase property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionphrase/phrase/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionPhrase: phrase property

The **`phrase`** read-only property of the `SpeechRecognitionPhrase` interface returns a string containing the word or phrase you want boosted in the recognition engine's contextual bias.

## Value

A string.

## Examples

### Basic usage

The `SpeechRecognition.phrases` property holds an array of `SpeechRecognitionPhrase` objects representing contextual biasing phrases. This array can be modified just like a normal JavaScript array, for example by pushing new phrases to it dynamically:

```js
recognition.phrases.push(new SpeechRecognitionPhrase("thistle", 5.0));
```

You can then access these objects and their properties like so. To return the `phrase` value of the added phrase, you could do this:

```js
// Should return "thistle"
recognition.phrases[0].phrase;
```

## See also

- Web Speech API
