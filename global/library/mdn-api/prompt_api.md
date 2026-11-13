---
title: "Prompt API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/prompt_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Prompt API

> **Warning:**
> This feature is currently opposed by two browser vendor(s). See the Standards positions section below for details of opposition.

The **Prompt API** allows web pages to directly prompt a language model provided by the user agent via a JavaScript interface, without needing to manage implementation-specific details of the AI model being used.

## Concepts and usage

Using AI prompts to return information is very common on the web, with examples including rapid information look up, code and content generation, chatbots to provide customer service functions, image identification and description, audio transcription, and more.

The Prompt API provides an asynchronous (`Promise`-based) mechanism for a website to prompt the browser'<example-value>'s device, the model is available offline, and developers can avoid the cost and latency of API calls to external services. The API abstracts away model-specific details such as tokenization and templating, so developers don't need to handle those differences across different implementations.

All interaction with the language model happens through a `LanguageModel` session.
You can use this session to specify context for the model, such as providing documents, background information, or conversation history, and to prompt it for responses to specific questions.

Before creating a session, you can call the static `LanguageModel.availability()` method to determine whether the language model supports a given configuration on the current device. This allows pages to adapt gracefully if data for the desired configuration can't be provided or is not downloaded. For example, you could display a download prompt or fall back to a cloud-based AI service, rather than creating a session only to have it fail.

A session is created by calling the static `create()` method. Once you have a session, you can call `append()` to preload content into the session without generating a response, and `prompt()` or `promptStreaming()` to send text or multimodal input and receive the response.

You can cancel pending operations such as `create()`, `prompt()`, and `append()` using an `AbortController`.

After a `LanguageModel` instance has been created, you can release its assigned resources and stop any further activity by calling its `LanguageModel.destroy()` method. You are encouraged to do this after you've finished with the object as it can consume a lot of resources.

To get started, check out Using the Prompt API for a walkthrough of the basics.

## Interfaces

- `CreateMonitor` (experimental)
    Provides information on the progress of an AI model download, for example a language pack or some fine-tuning data.
- `LanguageModel` (experimental)
    Represents a session with a browser-provided language model. Provides static methods for creating sessions and checking availability, and instance methods for prompting the model, managing context, cloning sessions, etc.

## HTTP headers

- `Permissions-Policy`; the `language-model` directive (experimental)
    Controls access to the prompt functionality.
    Where a policy specifically disallows its use, the `LanguageModel.availability()` static method will return `unavailable`, and any attempts to call other `LanguageModel` methods will fail with a `NotAllowedError` `DOMException`.

## Security considerations

The Prompt API is restricted to secure contexts (HTTPS). In addition, creation of `LanguageModel` objects requires that the user has recently interacted with the page (transient user activation is required).

Access to the API is also controlled via the `language-model` `Permissions-Policy` directive.

## Examples

For full examples, check out our guides, starting with Using the Prompt API.

Also see the Chrome dev rel team's demos:

- Prompt API playground
- MediaRecorder audio transcription
- Canvas API image prompt

## Specifications

### Standards positions

Two browser vendors oppose this specification.
Known standards positions are as follows:

- Mozilla (Firefox): Negative
- Apple (WebKit): Negative

## See also

- The Prompt API on developer.chrome.com (2026)
