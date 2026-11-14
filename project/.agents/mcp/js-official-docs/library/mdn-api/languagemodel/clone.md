---
title: "LanguageModel: clone() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/languagemodel/clone/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LanguageModel: clone() method

The **`clone()`** method of the `LanguageModel` interface creates a copy of the `LanguageModel` it is called on, including its full context window state. The cloned session can be used independently without affecting the original.

The original and the clone share the same context history up to the point of cloning, enabling you to explore multiple response paths or test variations without starting from scratch.

For example, you might build a shared context using `append()` or early `prompt()` `prompt()` calls, clone the session, and then send different follow-up prompts to each clone in parallel.

## Syntax

```js
clone()
clone(options)
```

### Parameters

- `options` (optional)
    An object representing the options that can be passed. If this argument is absent, the `options` from the original session, such as its abort signal, are used.
    Properties include:
    - `signal`
        An `AbortSignal` to cancel the clone operation.

### Return value

A `Promise` that resolves with a cloned `LanguageModel` instance.

### Exceptions

- `AbortError` `DOMException`
    Thrown if the operation was canceled via the `signal` option.
- `NotAllowedError` `DOMException`
    Thrown if usage of the method is blocked by a `language-model` `Permissions-Policy`.
- `OperationError` `DOMException`
    Thrown if cloning fails for any other reason not listed in the other exception types.

## Examples

See also Using the Prompt API > Cloning a session.

### Exploring multiple response paths

The following example shows how to explore different response paths. First, it creates a single session with the start of a story. Then it clones the original session twice before prompting for different endings. This approach preserves the original session in case more exploration is wanted.

```js
const session = await LanguageModel.create({
  initialPrompts: [
    { role: "system", content: "You are a creative writing assistant." },
  ],
});

await session.append(
  "The story begins in a small coastal town during a storm.",
);

const [clone1, clone2] = await Promise.all([session.clone(), session.clone()]);

const [ending1, ending2] = await Promise.all([
  clone1.prompt("Write a happy ending."),
  clone2.prompt("Write a mysterious ending."),
]);

console.log("Happy ending:", ending1);
console.log("Mysterious ending:", ending2);
```

### Cloning to retry after a context overflow

This example uses a checkpoint and rollback pattern to save the state of a session before attempting to append a large amount of data. Cloning the session before calling `append()` allows the app to restore the state if the context window is exceeded.

```js
const veryLargeDocument = "This is my very long story...";
let session = await LanguageModel.create();
const checkpoint = await session.clone();

try {
  await session.append(veryLargeDocument);
} catch (err) {
  if (err.name === "QuotaExceededError") {
    console.warn("Document too large.");
    session = checkpoint;
  }
}
```

### Cloning a session with an abort signal

The following example creates a timeout to abort the clone operation if it takes more than three seconds.

```js
const controller = new AbortController();
setTimeout(() => controller.abort(), 3000);

try {
  const clonedSession = await session.clone({
    signal: controller.signal,
  });
  console.log("Session cloned successfully.");
} catch (err) {
  if (err.name === "AbortError") {
    console.log("Clone operation was aborted.");
  }
}
```

## See also

- `LanguageModel.append()`
- Prompt API
- Using the Prompt API
- Adding context with initial and ongoing prompt inputs
