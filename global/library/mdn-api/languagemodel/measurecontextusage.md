---
title: "LanguageModel: measureContextUsage() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/languagemodel/measurecontextusage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LanguageModel: measureContextUsage() method

The **`measureContextUsage()`** method of the `LanguageModel` interface estimates how many context window tokens the given input would consume without sending it to the model or modifying the session's state.

This allows you to check how much of the context window a given input requires before deciding whether to send it. The result can be compared against `LanguageModel.contextWindow` and `LanguageModel.contextUsage` to determine whether the input can fit into the context window limit.

This is particularly useful for long-context applications such as document summarization, where you may need to split or truncate content to stay within the context window limit.

## Syntax

```js
measureContextUsage(input)
measureContextUsage(input, options)
```

### Parameters

- `input`
    The content to append to the context window. This is either:
    - A string — Shorthand for a single textual message.
    - An array of objects, each representing a single message in a conversation with a language model.
      Objects may have the following properties:
      - `role`
          A string indicating the point of view the message is phrased from. Must be one of:
          - `system`
              A system-level instruction that guides the model's overall behavior. This must be the first instruction passed to the model.
          - `user`
              A message from the user, which the API should respond to.
          - `assistant`
              An input that provides context for the AI assistant, such as its persona or the format of its responses. Such messages mainly serve to provide context/history, and further shape how the model responds.
      - `content`
          A string representing a textual prompt, or an array of objects. Each object includes the following properties:
          - `type`
              An enumerated value representing the type of content. This can be one of:
              - `audio`
                  Audio content.
              - `image`
                  Image content.
              - `text`
                  Textual content.
              - `tool-call`
                  A tool invocation issued by the model.
              - `tool-response`
                  The result of a tool invocation.
          - `value`
              The content of the message. If the `type` is `text`, this is always a string. If the `type` is `audio` or `image`, the `value` can be one of several different object types; see What data types are accepted?.
      - `prefix` (optional)
          A boolean, defaulting to `false`. When `true`, the message is treated as a prefix for the model's next generated response rather than a complete turn.
- `options` (optional)
    Options for measuring context usage. Properties include:
    - `responseConstraint`
        An object following the structure defined by JSON Schema defining the precise format the model's output should be delivered in. When provided and `omitResponseConstraintInput` is `false`, any implementation-defined constraint-description message is included in the measurement.
    - `omitResponseConstraintInput`
        A boolean; when `true`, the automatic constraint-description message is excluded from the measurement.
    - `signal`
        An `AbortSignal` to cancel the operation.

### Return value

A `Promise` that resolves with a `Number` representing the number of context window tokens the input would consume.

### Exceptions

- `AbortError` `DOMException`
    Thrown if the operation was canceled via the `signal` option.
- `NotAllowedError` `DOMException`
    Thrown if usage of the method is blocked by a `language-model` `Permissions-Policy`.
- `NotSupportedError` `DOMException`
    Thrown if:
    - A message's `role` is `assistant` and its `type` is anything other than `text`.
    - A message's `type` is `text` and its `value` is not a string.
    - The input or output text is in a language the user agent doesn't support for prompting.
    - A message's `type` is `image` or `audio` but the type was not listed in `expectedInputs`, or the `value` is not an accepted data type.
- `SyntaxError` `DOMException`
    Thrown if:
    - No messages are included in the messages array.
    - A message's `prefix` property is set to `true` and:
      - The message's `role` is not `assistant`.
      - The message is not the last item in the messages array.
- `TypeError`
    Thrown if:
    - `omitResponseConstraintInput` is `true` but `responseConstraint` is not provided.
    - A message's `role` is `system` but it was not the first message passed to the context.

## Examples

### Warning when the context is nearly full

The following example uses a function to verify that context is available before calling `LanguageModel.prompt()`. It first calculates the remaining context and passes that value to `measureContextUsage()`. If `needed` is less than or equal to `remaining`, it returns `true` and the session continues.

```js
const promptText = "Let me ask you an interesting question...";
const session = await LanguageModel.create();

async function contextAvailable(promptText) {
  const remaining = session.contextWindow - session.contextUsage;
  const needed = await session.measureContextUsage(promptText);

  return needed <= remaining;
}

if (await contextAvailable(promptText)) {
  const response = await session.prompt(promptText);
  console.log(response);
} else {
  console.warn("Prompt skipped: Not enough context window remaining.");
}
```

## See also

- `LanguageModel.contextUsage`
- `LanguageModel.contextWindow`
- `LanguageModel.append()`
- Prompt API
- Using the Prompt API
