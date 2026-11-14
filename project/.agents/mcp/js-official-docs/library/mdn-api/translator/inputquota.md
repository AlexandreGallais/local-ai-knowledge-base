---
title: "Translator: inputQuota property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/translator/inputquota/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Translator: inputQuota property

The **`inputQuota`** read-only property of the `Translator` interface returns the input quota available to the browser for generating translations.

## Value

A number specifying the available input quota.

This number is implementation-dependent. For example, it might be `Infinity` if there are no limits beyond the user's memory and the maximum length of JavaScript strings, or it might be a number of tokens in the case of AI models that use a token/credits scheme.

The only guarantee is that `inputQuota` - `measureInputUsage()` will be non-negative if there is sufficient quota to translate the text.

## Examples

### Checking if you have enough quota

In the below snippet, we create a new `Translator` instance using `create()`, then return the total input quota via `inputQuota` and the input quota usage for a translating a particular text string via `measureInputUsage()`.

We then test to see if the individual input usage for that string is greater than the total available quota. If so, we throw an appropriate error; it not, we commence translating the string using `translate()`.

```js
const translator = await Translator.create({
  sourceLanguage: "en",
  targetLanguage: "ja",
});

const totalInputQuota = translator.inputQuota;
const inputUsage = await translator.measureInputUsage(myTextString);

if (inputUsage > totalInputQuota) {
  throw new Error("Insufficient quota to translate.");
} else {
  console.log("Quota available to translate.");
  const translation = await translator.translate(myTextString);
  // ...
}
```

## See also

- Using the Translator and Language Detector APIs
