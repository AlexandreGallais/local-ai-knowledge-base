---
title: "Translator: targetLanguage property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/translator/targetlanguage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Translator: targetLanguage property

The **`targetLanguage`** read-only property of the `Translator` interface returns the language that the input text will be translated into.

A `Translator` instance's `targetLanguage` is set when creating it via a `create()` call.

## Value

A string specifying the source language. This will be a valid BCP 47 language tag.

## Examples

```js
const translator = await Translator.create({
  sourceLanguage: "en",
  targetLanguage: "ja",
});

// Logs "ja"
console.log(translator.targetLanguage);
```

## See also

- Using the Translator and Language Detector APIs
