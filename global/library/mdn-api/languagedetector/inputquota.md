---
title: "LanguageDetector: inputQuota property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/languagedetector/inputquota/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LanguageDetector: inputQuota property

The **`inputQuota`** read-only property of the `LanguageDetector` interface returns the input quota available to the browser for detecting languages.

## Value

A number specifying the available input quota.

This number is implementation-dependent. For example, it might be `Infinity` if there are no limits beyond the user's memory and the maximum length of JavaScript strings, or it might be a number of tokens in the case of AI models that use a token/credits scheme.

The only guarantee is that `inputQuota` - `measureInputUsage()` will be non-negative if there is sufficient quota to detect the text's language.

## Examples

### Checking if you have enough quota

In the below snippet, we create a new `LanguageDetector` instance using `create()`, then return the total input quota via `inputQuota` and the input quota usage for detecting a particular text string's language via `measureInputUsage()`.

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
