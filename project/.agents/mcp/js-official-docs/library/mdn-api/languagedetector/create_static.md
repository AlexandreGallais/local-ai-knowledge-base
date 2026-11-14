---
title: "LanguageDetector: create() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/languagedetector/create_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LanguageDetector: create() static method

The **`create()`** static method of the `LanguageDetector` interface creates a new `LanguageDetector` instance to detect languages.

> **Note:**
> The `create()` method requires transient activation, that is, it must be invoked in response to a user action such as a mouse click or button press.

## Syntax

```js
LanguageDetector.create(options)
```

### Parameters

- `options`
    An object specifying configuration options for the `LanguageDetector`. Possible values include:
    - `expectedInputLanguages`
        An array of strings specifying the expected languages of the input text, which helps improve the accuracy of the language detection. These should be valid BCP 47 language tags. Defaults to `["en"]`.
    - `monitor` (optional)
        A callback function with a `CreateMonitor` argument that enables monitoring download progress of the AI model.
    - `signal` (optional)
        An `AbortSignal` object instance, which allows a `create()` operation to be aborted via the associated `AbortController`. The exact effect is dependent on when `AbortController.abort()` is called:
        - If `abort()` is called before the `create()` promise resolves, the `create()` operation is canceled.
        - If `abort()` is called after the `create()` promise fulfills, it has the same effect as calling `LanguageDetector.destroy()`: The resources assigned to the resulting `LanguageDetector` instance are released, and any ongoing and subsequent `LanguageDetector` method calls will reject with an `AbortError`.

### Return value

A `Promise` that fulfills with a `LanguageDetector` object instance.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the page's `Document` is not yet active.
- `NetworkError` `DOMException`
    Thrown if:
    - The network was not available to download the AI model.
    - The user has canceled the AI model download.
- `NotAllowedError` `DOMException`
    Thrown if:
    - Usage of the method is blocked by a `language-detector` `Permissions-Policy`.
    - The user has blocked the AI model download in some way.
    - The `create()` method wasn't called via transient activation.
- `NotSupportedError` `DOMException`
    Thrown if:
    - The language tags specified in `expectedInputLanguages` are invalid, or not supported.
    - An AI model to support the specified `expectedInputLanguages` is not available.
- `OperationError` `DOMException`
    General-purpose exception thrown if `LanguageDetector` creation failed for any other reason.

## Examples

### Basic `LanguageDetector` creation

```js
const detector = await LanguageDetector.create({
  expectedInputLanguages: ["en-US", "zh"],
});
```

## See also

- Using the Translator and Language Detector APIs
