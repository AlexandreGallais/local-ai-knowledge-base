---
title: "Translator: translateStreaming() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/translator/translatestreaming/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Translator: translateStreaming() method

The **`translateStreaming()`** method of the `Translator` interface generates a translation as a `ReadableStream`.

## Syntax

```js
translateStreaming(input)
translateStreaming(input, options)
```

### Parameters

- `input`
    A string representing the text to be translated.
- `options` (optional)
    An object specifying configuration options for the `translateStreaming()` operation. Possible values include:
    - `signal`
        An `AbortSignal` object instance, which allows the `translateStreaming()` operation to be aborted via the associated `AbortController`.

### Return value

A `ReadableStream` containing the generated translation.

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

const stream = translator.translateStreaming(myTextString);
let translation = "";

for await (const chunk of stream) {
  console.log(chunk);
  translation += chunk;
}

console.log("Complete translation:", translation);
```

## See also

- Using the Translator and Language Detector APIs
