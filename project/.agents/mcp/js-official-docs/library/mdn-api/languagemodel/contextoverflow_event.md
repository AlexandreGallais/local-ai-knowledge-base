---
title: "LanguageModel: contextoverflow event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/languagemodel/contextoverflow_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LanguageModel: contextoverflow event

The **`contextoverflow`** event fires on a `LanguageModel` instance when a call to `prompt()`, `promptStreaming()`, or `append()` causes the session's `contextUsage` to exceed the `contextWindow`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("contextoverflow", (event) => {})
```

Alternatively, assign to the event handler property of the interface:

```js
oncontextoverflow = (event) => {}
```

## Event type

A generic `Event`.

## Examples

### Reacting to a context overflow

The code below shows two methods of creating an event listener for the `contextoverflow` event.

```js
const session = await LanguageModel.create();

session.addEventListener("contextoverflow", () => {
  console.warn("Context overflow detected.");
});
```

Alternatively, use the `oncontextoverflow` event handler property (but note that this replaces other event listeners added using `oncontextoverflow`, if any):

```js
const session = await LanguageModel.create();

session.oncontextoverflow = () => {
  console.warn(
    "The session's context window is full. " +
      "Consider cloning the session or starting a new one.",
  );
};
```

### Resetting the session on overflow

The following example creates a new session when the `contextoverflow` event is triggered.

```js
let session = await LanguageModel.create({
  initialPrompts: [{ role: "system", content: "You are a helpful assistant." }],
});

session.addEventListener("contextoverflow", async () => {
  console.log("Context full — creating a fresh session.");
  session.destroy();
  session = await LanguageModel.create({
    initialPrompts: [
      { role: "system", content: "You are a helpful assistant." },
    ],
  });
});

async function chat(userMessage) {
  const response = await session.prompt(userMessage);
  return response;
}
```

## See also

- `LanguageModel.contextUsage`
- `LanguageModel.contextWindow`
- `LanguageModel.measureContextUsage()`
- Prompt API
