---
title: "Translator and Language Detector APIs"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/translator_and_language_detector_apis/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Translator and Language Detector APIs

The **Translator and Language Detector APIs** provide functionality to detect the language that text is written in, and to translate text into different languages, via a browser's own internal AI model (which may differ between browsers).

## Concepts and usage

Translating a body of text is a common task on today's web. Typical use cases include:

- On-the-fly translation of an article that isn't available in your language.
- Translating a user's support requests into a language the support agent understands.
- Facilitating chats between users that don't speak each other's languages.

Detecting the language of a body of test is an important precursor for successful automated translation, but has other uses beyond direct translation. For example, it allows automatic UI configuration based on user text entry, ranging from updating UI and error strings, to automatically loading appropriate dictionaries for spell checking or curse word detection.

AI is well-suited to facilitating language detection and translation. The Translator and Language Detector APIs provide asynchronous (`Promise`-based) mechanisms for a website to detect languages and translate text via the browser's own internal AI model. This is useful and efficient because the browser handles the service, rather than the developer having to rely on the user downloading AI models, or host or pay for a cloud-based translation service.

- Language detection is done via the `LanguageDetector` interface. A `LanguageDetector` object instance is created using the `LanguageDetector.create()` static method, then the `detect()` instance method is passed the text string to detect the language for.
- Translation is done via the `Translator` interface. A `Translator` object instance is created using the `Translator.create()` static method, then the `translate()` instance method is passed the text string to translate.

You can cancel a pending `create()`, `detect()`, or `translate()` operation using an `AbortController`.

After a `LanguageDetector` or `Translator` instance has been created, you can release its assigned resources and stop any further activity by calling its `LanguageDetector.destroy()`/`Translator.destroy()` method. You are encouraged to do this after you've finished with the object as it can consume a lot of resources.

See Using the Translator and Language Detector APIs for a walkthrough of how to use the APIs.

## Interfaces

- `CreateMonitor` (experimental)
    Provides information on the progress of an AI model download, for example a language pack or some fine-tuning data.
- `LanguageDetector` (experimental)
    Contains all the language detection functionality, including checking AI model availability, creating a new `LanguageDetector` instance, using it to detect a language, and more.
- `Translator` (experimental)
    Contains all the translation functionality, including checking AI model availability, creating a new `Translator` instance, using it to create a translation, and more.

## HTTP headers

- `Permissions-Policy`; the `language-detector` directive
    Controls access to the language detection functionality.
    Where a policy specifically disallows its use, the `LanguageDetector.availability()` static method will return `unavailable`, and any attempts to call other `LanguageDetector` methods will fail with a `NotAllowedError` `DOMException`.
- `Permissions-Policy`; the `translator` directive
    Controls access to the translation functionality.
    Where a policy specifically disallows its use, the `Translator.availability()` static method will return `unavailable`, and any attempts to call other `Translator` methods will fail with a `NotAllowedError` `DOMException`.

## Security considerations

Creation of `LanguageDetector` and `Translator` objects requires that the user has recently interacted with the page (transient user activation is required).

Access to the API is also controlled via `language-detector` and `translator` `Permissions-Policy` directives.

## Examples

For a full example, see Using the Translator and Language Detector APIs.

## See also

- Language detection with built-in AI on developer.chrome.com (2025)
- Translation with built-in AI on developer.chrome.com (2025)
