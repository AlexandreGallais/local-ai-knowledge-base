---
title: "LanguageModel: contextUsage property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/languagemodel/contextusage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LanguageModel: contextUsage property

The **`contextUsage`** read-only property of the `LanguageModel` interface returns the number of context window tokens currently consumed by the session that calls it, including initial prompts and all subsequent turns.

This value increases every time you call `prompt()`, `promptStreaming()`, or `append()`.

Compare `contextUsage` with `LanguageModel.contextWindow` to determine how many tokens remain. When `contextUsage` would exceed `contextWindow`, subsequent method calls throw a `QuotaExceededError` and the `contextoverflow` event fires.

To estimate how many tokens a new prompt would use before sending it, call `LanguageModel.measureContextUsage()`.

## Value

A number representing the current context window usage in tokens.

## Examples

### Monitoring context usage during a conversation

This example writes context usage to the console after a session prompt completes.

```js
const session = await LanguageModel.create();

await session.prompt("Tell me about the history of the internet.");

console.log(
  `Context used: ${session.contextUsage} / ${session.contextWindow} tokens`,
);
```

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

- `LanguageModel.contextWindow`
- `LanguageModel.measureContextUsage()`
- `contextoverflow` event
- Prompt API
- Using the Prompt API
