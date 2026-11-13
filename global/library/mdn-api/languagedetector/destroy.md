---
title: "LanguageDetector: destroy() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/languagedetector/destroy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LanguageDetector: destroy() method

The **`destroy()`** method of the `LanguageDetector` interface releases the resources assigned to the `LanguageDetector` instance it is called on and stops any further activity on it. This means that any ongoing and subsequent method calls made on the `LanguageDetector` will reject with an `AbortError`.

It makes sense to destroy `LanguageDetector` objects if they are no longer being used, as they tie up significant resources in their handling.

## Syntax

```js
destroy()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Basic `destroy()` usage

```js
const detector = await LanguageDetector.create({
  expectedInputLanguages: ["en-US", "zh"],
});

// ...

detector.destroy();
```

## See also

- Using the Translator and Language Detector APIs
