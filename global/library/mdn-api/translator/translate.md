---
title: "Translator: translate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/translator/translate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Translator: translate() method

The **`translate()`** method of the `Translator` interface returns a translation of an input string.

## Syntax

```js
translate(input)
translate(input, options)
```

### Parameters

- `input`
    A string representing the text to be translated.
- `options` (optional)
    An object specifying configuration options for the `translate()` operation. Possible values include:
    - `signal`
        An `AbortSignal` object instance, which allows the `translate()` operation to be aborted via the associated `AbortController`.

### Return value

A `Promise` that fulfills with a string containing the generated translation.

### Exceptions

- `AbortError` `DOMException`
    Thrown if the `Translator` was previously destroyed (had `Translator.destroy()` called on it, or was aborted via its abort `signal` after creation).
- `InvalidStateError` `DOMException`
    Thrown if the current `Document` is not active.
- `QuotaExceededError`
    Thrown if the translation operation exceeds the available `inputQuota`.

## Examples

### Basic `translate()` usage

```js
const translator = await Translator.create({
  sourceLanguage: "en",
  targetLanguage: "ja",
});

const translation = await translator.translate(myTextString);
console.log(translation);
```

## See also

- Using the Translator and Language Detector APIs
