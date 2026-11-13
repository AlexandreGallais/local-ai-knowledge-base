---
title: "LanguageDetector"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/languagedetector/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LanguageDetector

The **`LanguageDetector`** interface of the `Translator and Language Detector APIs` contains all the language detection functionality, including checking AI model availability, creating a new `LanguageDetector` instance, using it to detect a language, and more.

## Instance properties

- `inputQuota` (read-only) (experimental)
    The input quota available to the browser for detecting languages.
- `expectedInputLanguages` (read-only) (experimental)
    The expected languages to be detected in the input text.

## Static methods

- `availability()` (experimental)
    Returns an enumerated value that indicates whether the browser AI model supports a given `LanguageDetector` configuration.
- `create()` (experimental)
    Creates a new `LanguageDetector` instance to detect languages.

## Instance methods

- `destroy()` (experimental)
    Releases the resources assigned to the `LanguageDetector` instance it is called on and stops any further activity on it.
- `detect()` (experimental)
    Detects the closest matching language or languages that a given text string is most likely to be written in.
- `measureInputUsage()` (experimental)
    Reports how much input quota would be used by a language detection operation for a given text input.

## Examples

See Using the Translator and Language Detector APIs for a complete example.

### Creating a `LanguageDetector` instance

```js
const detector = await LanguageDetector.create({
  expectedInputLanguages: ["en-US", "zh"],
});
```

> **Note:**
> Different implementations will likely support different languages.

### Detecting languages

```js
const results = await detector.detect(myTextString);

results.forEach((result) => {
  console.log(`${result.detectedLanguage}: ${result.confidence}`);
});

// Results in logs like this:
// la: 0.8359838724136353
// es: 0.017705978825688362
// sv: 0.012977192178368568
// en: 0.011148443445563316
```

## See also

- Using the Translator and Language Detector APIs
