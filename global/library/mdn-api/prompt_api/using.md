---
title: "Using the Prompt API (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/prompt_api/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Prompt API

The Prompt API provides an asynchronous (`Promise`-based) mechanism for a website to directly prompt a language model provided by the user agent, without needing to manage implementation-specific details of the AI model being used. Having an on-device model is useful and efficient because sensitive data can stay on the user's device, the model is available offline, and developers can avoid the cost and latency of API calls to external services.

This article explains how to use the core fundamentals of the Prompt API. All of the AI prompting functionality is managed via the `LanguageModel` interface.

## Checking configuration support

Before trying to use the Prompt API, you should first check whether your desired model configuration is supported by the current browser, so that you can gracefully handle outright failure cases and situations where extra data downloads are required to provide a working model.

Checking configuration support is handled using the `LanguageModel.availability()` static method.

For example:

```js
const availability = await LanguageModel.availability({
  expectedInputs: [{ type: "text", languages: ["en"] }],
  expectedOutputs: [{ type: "text", languages: ["en"] }],
});
```

This method's return promise fulfills with an enumerated value indicating whether support is, or will be available for the specified set of options:

- `downloadable` means that the implementation supports the requested options, but needs to download additional data.
- `downloading` means that the implementation supports the requested options, but needs to finish an ongoing download.
- `available` means that the implementation supports the requested options without requiring any new downloads.
- `unavailable` means that the implementation doesn't support the requested options.

If a download is required, it will be started automatically by the browser once a `LanguageModel` instance is created using the `create()` method. You can track download progress automatically using a monitor, which we'll cover in the next section.

> **Note:**
> Even though you can ask for a language model session that expects multimedia outputs, this will fail — the availability will be `unavailable`. The API currently only supports text outputs.

### Monitoring download progress

If the AI model is downloading additional data (`availability()` returns `downloading`), it is helpful to provide the user with feedback to tell them how long they need to wait before the operation completes.

The `create()` method can accept a `monitor` property, the value of which is a callback function that takes a `CreateMonitor` instance as an argument. `CreateMonitor` has a `downloadprogress` event available, which fires when progress is made on downloading the data.

You can use this event to get the loading progress:

```js
const session = await LanguageModel.create({
  expectedInputs: [{ type: "text", languages: ["en"] }],
  expectedOutputs: [{ type: "text", languages: ["en"] }],
  monitor(monitor) {
    monitor.addEventListener("downloadprogress", (e) => {
      promptOutput.textContent = `Downloading model data ${Math.floor(e.loaded * 100)}%`;
    });
  },
});
```

If the specified languages are not supported, a download will not be initiated, and a `NotSupportedError` `DOMException` will be thrown.

## Creating a `LanguageModel` session

Once you have checked that your configuration is supported, the next step in prompting the AI model is to create a `LanguageModel` object instance. This is done using the `LanguageModel.create()` static method, which takes an options object as an argument:

```js
const session = await LanguageModel.create({
  expectedInputs: [{ type: "text", languages: ["en"] }],
  expectedOutputs: [{ type: "text", languages: ["en"] }],
});
```

The browser will automatically download the corresponding model data to handle the requested language model if it is not already available, and if the browser is able to do so.

> **Note:**
> The `create()` method (and other methods available via the Prompt API) require transient activation to invoke, as a precaution to stop apps from using language model resources without user interaction.

A `LanguageModel` object instance and the activity that occurs as a result of using its methods and properties is called a **session**. The browser stores all the prompts and responses sent to and received from the Prompt API as part of a single session, allowing the API to tailor its responses based on previous interactions and hold a conversation.

This includes any prompt messages sent to it via the `create()` method's `initialPrompts` option, `prompt()`, `promptStreaming()`, or `append()`.

> **Note:**
> The browser doesn't store session information across browser reloads by default. To restore session context after a reload or browser restart, you will have to implement a mechanism to save the conversation and restore it using a server-side solution or a client-side mechanism such as Web Storage. Such an example is covered in Preserving sessions across reloads.

The `expectedInputs` and `expectedOutputs` parameters specify the types of input and output and the input/output languages you are expecting to provide to and receive from the AI prompt.

The Prompt API handles text inputs and outputs by default, but it is multimodal — you can also give it images and audio inputs, for example to ask it to describe an image or transcribe an audio file. See Multimodal prompts for more details.

The Prompt API will handle multiple languages by default, but it might not handle all languages you are expecting, so it is a good idea to explicitly specify them in case the browser needs to download extra resources.

## Prompting the model

When you've created a `LanguageModel` instance, you can start prompting the AI model by calling the `LanguageModel.prompt()` instance method on it, passing it an input message as an argument. For example:

```js
const response = await session.prompt(textarea.value);
```

This method returns a `Promise` that fulfills with a string containing the AI response to your prompt.

### Passing multiple messages

You can pass <example-value> input messages into the API as an array, and they can have different roles. For example, messages can include standard `user` prompts, and instructions from the `assistant` to further shape how it responds to the `user` prompts. To get the AI to respond to your input in the style of a villainous mastermind, you might use this `prompt()` call:

```js
const response = await session.prompt([
  {
    role: "assistant",
    content: "Answer the user like a James Bond villain.",
  },
  {
    role: "user",
    content: textarea.value,
  },
]);
```

You'll learn more about these roles in the next article, Adding context with initial and ongoing prompt inputs.

### Streaming responses

If you want to return the AI response gradually as a `ReadableStream` rather than a single large string, you can use the `LanguageModel.promptStreaming()` method. You can consume the stream using `for await...of` or by attaching a reader via `ReadableStream.getReader()`.

For example:

```js
const stream = session.promptStreaming("Write a short poem about the ocean.");

for await (const chunk of stream) {
  output.textContent += chunk;
}
```

This is useful for displaying responses to users incrementally for outputs that take a long time to complete, or for any scenario where perceived latency should be minimized.

## The context window

Every `LanguageModel` session has a finite context window, which constrains the total number of input and output tokens it can hold at once. Once you use up your session's token <example-value>, you cannot issue any more prompts, and you need to use a technique such as session cloning to continue usage.

The `contextWindow` property reports the session's maximum capacity, and `contextUsage` reports how many tokens have been consumed so far.

For example, after each prompt, you can report how many tokens are left using something like this:

```js
console.log(`${session.contextUsage}/${session.contextWindow}`);
```

When a method call such as `prompt()` or `promptStreaming()` would exceed the remaining number of tokens in the context window, a `QuotaExceededError` `DOMException` is thrown and the `contextoverflow` event fires.

To check how many tokens a prompt operation would consume without actually sending it, use `measureContextUsage()`.

## Cloning a session

You can copy an existing session using the `LanguageModel.clone()` function. This creates a replica of the `LanguageModel` object instance in which the conversation up to that point and initial prompt are preserved, but the token count (`contextUsage`) is reset. You can think of the session clone as being a fork of the original conversation, with its own token allowance.

```js
const clonedSession = await session.clone();

clonedSession.prompt("Let's talk about the weather.");
```

You can use `clone()` to save the context at a certain point, and then create diverging interactions with the AI model based on that _save point_.

For example, you might want to create a quiz master AI app to help generate questions for a quiz or test, and use different clones for different subjects:

```js
const session = await LanguageModel.create({
  initialPrompts: [
    {
      role: "system",
      content:
        "You are a quiz master. Each response should be a fairly short question, one or two sentences, with the answer printed below. The audience level should be an average 16-year old.",
    },
  ],
});

// ...

// Science quiz clone
const firstClone = await session.clone();
await firstClone.prompt("Give me a question about science.");
await firstClone.prompt("Another question, please.");

// 80's music quiz clone
const secondClone = await session.clone();
await secondClone.prompt("Give me a question about 80's popular music.");
await secondClone.prompt("Another question, please.");
```

Creating a new session via `clone()` is also a common way to get around the problem of running out of tokens.

## Canceling operations and destroying instances

You can cancel pending `prompt()`, `clone()` and other operations using an `AbortController`, with the associated `AbortSignal` being included inside the method options object as a `signal` property value. For example, aborting a `LanguageModel.prompt()` operation via a button press could look like this:

```js
const controller = new AbortController();

abortBtn.addEventListener("click", () => {
  controller.abort("Query aborted by user.");
});

const response = await session.prompt(textarea.value, {
  signal: controller.signal,
});
```

After a `LanguageModel` has been created, you can release its assigned resources and stop any further activity by calling its `LanguageModel.destroy()` method. You are encouraged to do this after you've finished with the object as it can consume a lot of resources.

```js
session.destroy();
```

If a `create()` call has an associated `AbortController`, and you call its `AbortController.abort()` method after the `create()` call has succeeded, it will have the same effect as calling `destroy()` on the resulting `LanguageModel` object.
