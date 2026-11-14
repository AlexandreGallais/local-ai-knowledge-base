---
title: "Translator"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/translator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Translator

The **`Translator`** interface of the `Translator and Language Detector APIs` contains all the associated translation functionality, including checking AI model availability, creating a new `Translator` instance, using it to create a translation, and more.

## Instance properties

- `inputQuota` (read-only) (experimental)
    The input quota available to the browser for generating translations.
- `sourceLanguage` (read-only) (experimental)
    The expected language of the input text to be translated.
- `targetLanguage` (read-only) (experimental)
    The language that the input text will be translated into.

## Static methods

- `availability()` (experimental)
    Returns an enumerated value that indicates the availability of the AI model for the given `Translator` configuration.
- `create()` (experimental)
    Creates a new `Translator` instance from which to generate translations.

## Instance methods

- `destroy()` (experimental)
    Releases the resources assigned to the `Translator` instance it is called on and stops any further activity on it.
- `measureInputUsage()` (experimental)
    Reports how much input quota would be used by a translation operation for a given text input.
- `translate()` (experimental)
    Returns a string containing a translation of the input string.
- `translateStreaming()` (experimental)
    Generates a translation of the input string as a `ReadableStream`.

## Examples

See Using the Translator and Language Detector APIs for a complete example.

### Creating a `Translator` instance

```js
const translator = await Translator.create({
  sourceLanguage: "en",
  targetLanguage: "ja",
});
```

### Generating a translation

```js
const translation = await translator.translate(myTextString);
console.log(translation);
```

### Generating a translation stream

```js
const stream = translator.translateStreaming(myTextString);
let translation = "";

for await (const chunk of stream) {
  translation += chunk;
}

console.log("Stream complete");
console.log(translation);
```

## See also

- Using the Translator and Language Detector APIs
