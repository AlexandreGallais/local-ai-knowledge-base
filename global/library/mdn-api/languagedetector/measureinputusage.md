---
title: "LanguageDetector: measureInputUsage() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/languagedetector/measureinputusage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LanguageDetector: measureInputUsage() method

The **`measureInputUsage()`** method of the `LanguageDetector` interface reports how much input quota would be used by a language detection operation for a given text input.

## Syntax

```js
measureInputUsage(input)
measureInputUsage(input, options)
```

### Parameters

- `input`
    A string representing the input text you want an input usage measurement for.
- `options` (optional)
    An object specifying configuration options for the `measureInputUsage()` operation. Possible values include:
    - `signal`
        An `AbortSignal` object instance, which allows the `measureInputUsage()` operation to be aborted via the associated `AbortController`.

### Return value

A `Promise` that fulfills with a number specifying the `inputQuota` usage of the given input text.

This number is implementation-dependent; if it is less than the `inputQuota`, the string's language can be detected.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if usage of the `LanguageDetector` API is blocked by a `language-detector` `Permissions-Policy`.
- `UnknownError` `DOMException`
    Thrown if the `measureInputUsage()` call failed for any other reason, or a reason the user agent did not wish to disclose.

## Examples

### Checking if you have enough quota

In the below snippet, we create a new `LanguageDetector` instance using `create()`, then return the total input quota via `inputQuota` and the input quota usage for a detecting a particular text string's language via `measureInputUsage()`.

We then test to see if the individual input usage for that string is greater than the total available quota. If so, we throw an appropriate error; it not, we commence detecting the string's language using `detect()`.

```js
const detector = await LanguageDetector.create({
  expectedInputLanguages: ["en-US", "zh"],
});

const totalInputQuota = detector.inputQuota;
const inputUsage = await detector.measureInputUsage(myTextString);

if (inputUsage > totalInputQuota) {
  throw new Error("Insufficient quota to detect languages.");
} else {
  console.log("Quota available to detect languages.");
  const results = await detector.detect(myTextString);
  // ...
}
```

## See also

- Using the Translator and Language Detector APIs
