---
title: "LanguageDetector: expectedInputLanguages property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/languagedetector/expectedinputlanguages/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LanguageDetector: expectedInputLanguages property

The **`expectedInputLanguages`** read-only property of the `LanguageDetector` interface returns the expected languages to be detected in the input text. Specifying expected input languages helps improve the accuracy of the language detection.

A `LanguageDetector` instance's `expectedInputLanguages` are set when creating it via a `create()` call.

## Value

An array of strings specifying the expected input languages. These will be valid BCP 47 language tags.

## Examples

```js
const detector = await LanguageDetector.create({
  expectedInputLanguages: ["en-US", "zh"],
});

// Logs ["en-US", "zh"]
console.log(detector.expectedInputLanguages);
```

## See also

- Using the Translator and Language Detector APIs
