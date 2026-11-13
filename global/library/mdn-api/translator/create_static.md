---
title: "Translator: create() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/translator/create_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Translator: create() static method

The **`create()`** static method of the `Translator` interface creates a new `Translator` instance that can be used to translate text.

> **Note:**
> The `create()` method requires transient activation, that is, it must be invoked in response to a user action such as a mouse click or button press.

## Syntax

```js
Translator.create(options)
```

### Parameters

- `options`
    An object specifying configuration options for the `Translator`. Possible values include:
    - `sourceLanguage`
        A string specifying the expected language of the input text to be translated, which should be a valid BCP 47 language tag.
    - `targetLanguage`
        A string specifying the language that the input text will be translated into, which should be valid BCP 47 language tag.
    - `monitor` (optional)
        A callback function with a `CreateMonitor` argument that enables monitoring download progress of the AI model.
    - `signal` (optional)
        An `AbortSignal` object instance, which allows a `create()` operation to be aborted via the associated `AbortController`. The exact effect is dependent on when `AbortController.abort()` is called:
        - If `abort()` is called before the `create()` promise resolves, the `create()` operation is canceled.
        - If `abort()` is called after the `create()` promise fulfills, it has the same effect as calling `Translator.destroy()`: The resources assigned to the resulting `Translator` instance are released, and any ongoing and subsequent `Translator` method calls will reject with an `AbortError`.

### Return value

A `Promise` that fulfills with a `Translator` object instance.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the page's `Document` is not yet active.
- `NetworkError` `DOMException`
    Thrown if:
    - The network was not available to download the AI model.
    - The user has canceled the AI model download.
- `NotAllowedError` `DOMException`
    Thrown if:
    - Usage of the method is blocked by a `translator` `Permissions-Policy`.
    - The user has blocked the AI model download in some way.
    - The `create()` method wasn't called via transient activation.
- `NotSupportedError` `DOMException`
    Thrown if:
    - The language tags specified in `sourceLanguage` or `targetLanguage` are invalid, or not supported. This is the case if the specified `sourceLanguage` and `targetLanguage` are the same.
    - An AI model to support the specified combination of `sourceLanguage` and `targetLanguage` is not available.
- `OperationError` `DOMException`
    General-purpose exception thrown if `Translator` creation failed for any other reason.

## Examples

### Basic `Translator` creation

```js
const translator = await Translator.create({
  sourceLanguage: "en",
  targetLanguage: "ja",
});
```

## See also

- Using the Translator and Language Detector APIs
