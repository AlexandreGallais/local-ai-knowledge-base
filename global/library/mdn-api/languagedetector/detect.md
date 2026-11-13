---
title: "LanguageDetector: detect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/languagedetector/detect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LanguageDetector: detect() method

The **`detect()`** method of the `LanguageDetector` interface detects the closest matching language or languages that a given text string is most likely to be written in.

## Syntax

```js
detect(input)
detect(input, options)
```

### Parameters

- `input`
    A string representing the text to have its language detected.
- `options` (optional)
    An object specifying configuration options for the `detect()` operation. Possible values include:
    - `signal`
        An `AbortSignal` object instance, which allows the `detect()` operation to be aborted via the associated `AbortController`.

### Return value

A `Promise` that fulfills with an array of objects representing the detected languages. Each object contains the following properties:

- `detectedLanguage`
    A BCP 47 language tag representing the detected language.
- `confidence`
    A number between `0` and `1` representing the AI model's confidence that the detected language is correct.

The sum of all the returned `confidence` values should theoretically be 1, however, it may be lower because very low confidence values are excluded from the results.

The last array element returned will always have a `detectedLanguage` value of `und` — this is an abbreviation of "undetermined", and represents the probability that the text is not written in a language the model knows.

### Exceptions

- `AbortError` `DOMException`
    Thrown if the `LanguageDetector` was previously destroyed (had `LanguageDetector.destroy()` called on it, or was aborted via its abort `signal` after creation).
- `InvalidStateError` `DOMException`
    Thrown if the current `Document` is not active.
- `QuotaExceededError`
    Thrown if the language detection operation exceeds the available `inputQuota`.

## Examples

### Basic `detect()` usage

```js
const detector = await LanguageDetector.create({
  expectedInputLanguages: ["en-US", "zh"],
});

const results = await detector.detect(myTextString);

results.forEach((result) => {
  console.log(`${result.detectedLanguage}: ${result.confidence}`);
});

// Results in logs like this:
// la: 0.8359838724136353
// es: 0.017705978825688362
// sv: 0.012977192178368568
// en: 0.011148443445563316
// und: 0.0003214875760022551
```

## See also

- Using the Translator and Language Detector APIs
