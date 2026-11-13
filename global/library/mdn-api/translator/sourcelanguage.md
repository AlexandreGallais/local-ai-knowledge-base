---
title: "Translator: sourceLanguage property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/translator/sourcelanguage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Translator: sourceLanguage property

The **`sourceLanguage`** read-only property of the `Translator` interface returns the expected language of the input text to be translated.

A `Translator` instance's `sourceLanguage` is set when creating it via a `create()` call.

## Value

A string specifying the source language. This will be a valid BCP 47 language tag.

## Examples

```js
const translator = await Translator.create({
  sourceLanguage: "en",
  targetLanguage: "ja",
});

// Logs "en"
console.log(translator.sourceLanguage);
```

## See also

- Using the Translator and Language Detector APIs
