---
title: "LanguageModel"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/languagemodel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LanguageModel

The **`LanguageModel`** interface of the Prompt API represents a session with a browser-provided language model. It exposes static methods for creating sessions and checking availability, as well as instance methods for prompting the model, appending context, and managing the context window.

`LanguageModel` instances cannot be constructed directly. Instead, use the static `LanguageModel.create()` method.

## Instance properties

- `LanguageModel.contextUsage` (read-only)
    Returns the number of context window tokens currently consumed by this session.
- `LanguageModel.contextWindow` (read-only)
    Returns the total context window size available for this session, in tokens.

## Static methods

- `LanguageModel.availability()`
    Returns a `Promise` that resolves with an enumerated value indicating whether the language model is available for the given options.
- `LanguageModel.create()`
    Returns a `Promise` that resolves with a new `LanguageModel` session, downloading the model data if necessary.

## Instance methods

- `LanguageModel.append()`
    Returns a `Promise` that resolves when the given input has been added to the session's context window, without generating a response.
- `LanguageModel.clone()`
    Returns a `Promise` that resolves with a new `LanguageModel` session that is a copy of the session it is called on, including all context.
- `LanguageModel.destroy()` (experimental)
    Releases the resources assigned to the `LanguageModel` instance it is called on and stops any further activity on it.
- `LanguageModel.measureContextUsage()`
    Returns a `Promise` that resolves with the number of context window tokens that the given input would consume if it were used in an operation such as `prompt()` or `append()`.
- `LanguageModel.prompt()`
    Returns a `Promise` that resolves with the model's complete response to the given input.
- `LanguageModel.promptStreaming()`
    Returns a `ReadableStream` that streams the model's response to the given input as it is generated.

## Events

- `contextoverflow`
    Fired when a `prompt()`, `promptStreaming()`, or `append()` call exceeds the context window size.

## Examples

### Creating a session and prompting the model

This example first calls `create()` to get a new session. It specifies that the language model adopt a `"system"` role and defines how it should behave. Note that the example uses `await` because `create()` returns a `Promise`. This may take some time to resolve if the model needs to be downloaded.

After creating the session, the example calls `prompt()` to ask a specific question.

```js
const session = await LanguageModel.create({
  initialPrompts: [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
  ],
});

const response = await session.prompt("What is the capital of France?");
console.log(response); // "The capital of France is Paris."
```

### Streaming a response

This example calls `promptStreaming()` to get an instance of `ReadableStream` and writes it to the console in chunks.

```js
const session = await LanguageModel.create();
const readableStream = session.promptStreaming("Tell me a short story.");

for await (const chunk of readableStream) {
  console.log(chunk);
}
```

## See also

- Prompt API
