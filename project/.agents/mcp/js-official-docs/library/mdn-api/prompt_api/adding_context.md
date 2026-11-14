---
title: "Adding context with initial and ongoing prompt inputs (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/prompt_api/adding_context/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Adding context with initial and ongoing prompt inputs

In our basic <example-value> API guide, we covered everything you need to get up and running with the Prompt API. However, this only really covers creating a generic AI prompt app. To give your app different personalities, get it to respond in different ways, and remember past conversations, you need to provide additional context. The Prompt API has a few different mechanisms to allow you to do this, which are covered in this article.

## Prompt input syntax

When `LanguageModel.prompt()` is called, it takes an `input` parameter containing the inputs to respond to:

```js
const response = await session.prompt(inputElem.value);
```

The previous `prompt()` call only receives a single string as a parameter. This is a shorthand form, available for the common situation where you only want to pass the model a single user text prompt. You can expand this to explicitly declare the `role` of the `input` object:

```js
const response = await session.prompt([
  {
    role: "user",
    content: inputElem.value,
  },
]);
```

The three available `role` types are:

- `user`
    Inputs that come from the `user`, which the API should respond to.
- `assistant`
    Inputs that are written from the point of view of the AI assistant, which mainly serve to provide context/history, and further shape how the model responds. These are commonly used for preserving sessions and few-shot prompts.
- `system`
    Global inputs from the overall system that give the model instructions on how to respond. If a `system` input is included, it must come first in the provided inputs, otherwise the returned promise will reject with an exception. `system` inputs are usually only included as initial prompts.

### Multiple inputs

You can provide multiple inputs in the array, for example:

```js
const response = await session.prompt([
  {
    role: "user",
    content: "The following is my favorite color. Do you like it?",
  },
  {
    role: "user",
    content: inputElem.value,
  },
]);
```

This is useful because you can provide extra context to help the model build a response along with the actual input taken from the page, which might only be one word.

### Specifying input type

By default, the `input` type is `text`. To explicitly declare the `type`, you can further expand the previous form to the full longhand equivalent, which looks like this:

```js
const response = await session.prompt([
  {
    role: "user",
    content: [
      {
        type: "text",
        value: inputElem.value,
      },
    ],
  },
]);
```

You don't need this form unless you are providing the assistant with `image` and/or `audio` inputs (see multimodal prompts):

```js
const response = await session.prompt([
  {
    role: "user",
    content: [
      { type: "text", value: "Describe my image and audio:" },
      { type: "image", value: imgElem },
      { type: "audio", value: audioBuffer },
    ],
  },
]);
```

However, you could rewrite the previous multiple-user-input example into this form, which includes both messages in a single input object. You might find this version easier to understand:

```js
const response = await session.prompt([
  {
    role: "user",
    content: [
      {
        type: "text",
        value: "The following is my favorite color. Do you like it?",
      },
      { type: "text", value: inputElem.value },
    ],
  },
]);
```

## Providing initial prompts during session creation

The `create()` method can take an `initialPrompts` option that contains an array of input prompts, just like the `inputs` array passed to `prompt()` and other methods. This allows you to pass an initial set of prompts into the session as it is created, so the model immediately has some context to work with.

For example:

```js
const session = await LanguageModel.create({
  initialPrompts: [
    {
      role: "system",
      content: "Respond like a pirate.",
    },
    {
      role: "assistant",
      content: "Avast ye, pirate! I am Redbeard!",
    },
    {
      role: "user",
      content:
        "Yarrrr, matey! Well met. My name is Silas Blacktooth, the scourge of Blackpool!",
    },
  ],
});
```

As well as telling the model what kind of personality it should have, `initialPrompts` is also useful for loading a previous saved conversation into the session after a page reload or subsequent visit to the app. See preserving sessions across reloads.

> **Note:**
> The text string shorthand form discussed at the top of Prompt input syntax cannot be used in the `initialPrompts` option of a `create()` call.

## Few-shot prompts

A few-shot prompt is a set of `user` role and `assistant` role input pairs passed as an example to the API to train it how to respond to a particular type of input, before asking it to complete a similar task.

The following example shows how to use a few-shot prompt to request a French translation in a specific format, providing sample inputs and outputs to demonstrate the expected structure.

```js
const session = await LanguageModel.create({
  expectedInputs: [{ type: "text", languages: ["en"] }],
  expectedOutputs: [{ type: "text", languages: ["en", "fr"] }],
  initialPrompts: [
    {
      role: "system",
      content:
        "Translate the user's input to French. Use the output format 'English input: French output'",
    },
    { role: "user", content: "Hello" },
    { role: "assistant", content: "Hello: Bonjour" },
    { role: "user", content: "Goodbye" },
    { role: "assistant", content: "Goodbye: Au revoir" },
    { role: "user", content: "The train is late" },
    {
      role: "assistant",
      content: "The train is late: Le train est en retard",
    },
    { role: "user", content: "My shoes are pink" },
    {
      role: "assistant",
      content: "My shoes are pink: Mes chaussures sont roses",
    },
  ],
});

const result = await session.prompt("Window");
console.log(result); // "Window: Fenêtre"
```

You could include just the `system` initial prompt and the example would still work, but it would be less likely to provide responses in the desired format.

## Initial and multiple inputs example

Let's look at an example that makes use of initial and multiple inputs for extra context. In this example, the user is prompted to enter their name, and the API provides a whimsical review of it.

Technically, this is very similar to the complete example from the previous guide, the only real differences being that user input is provided via a single line text `` rather than a `<textarea>`, and the `create()` and `prompt()` calls are different. As a result, we won't walk through the entire codebase again. To check out the codebase in more detail, see the previous article's descriptions, and press the "Play" button in the rendered live output to open the full code in MDN Playground.

```html
<h1>Prompt API rate my name!</h1>
<p>
  Enter your name (or someone else's name) into the input field and press the
  rate button to have AI review your name. First released in Chrome 148.
</p>

<h2>Input</h2>

<form>
  <div>
    <label for="prompt-text">Enter your name:</label>
    <input id="prompt-text" name="promptText" />
  </div>
  <button type="submit" id="submit">Rate my name!</button
  ><button type="button" id="abort">Abort rating</button>
</form>

<h2>Output</h2>

<p class="prompt-output"></p>
```

```css
* {
  box-sizing: border-box;
}

html {
  font-family: "Helvetica", "Arial";
}

body {
  max-width: 600px;
  margin: 0 auto;
}

form div {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

input,
textarea,
.prompt-output {
  padding: 5px;
}

.prompt-output {
  min-height: 150px;
  border: 1px solid black;
  width: 100%;
  display: block;
}

.error {
  color: red;
}

button {
  margin-right: 10px;
}
```

```js
const form = document.querySelector("form");
const inputElem = document.querySelector("input");
const submitBtn = document.querySelector("#submit");
const abortBtn = document.querySelector("#abort");
abortBtn.disabled = true;
submitBtn.disabled = true;
const promptOutput = document.querySelector(".prompt-output");

let session;
inputElem.addEventListener("focus", () => {
  if (!("LanguageModel" in window)) {
    promptOutput.innerHTML = `<span class="error">Your browser doesn't support the Prompt API!</span>`;
    return;
  }

  if (!session) {
    init();
  }
});

async function init() {
  session = await getSession();
  promptOutput.textContent = `Session created.`;
  submitBtn.disabled = false;
}

form.addEventListener("submit", handleSubmission);

async function handleSubmission(e) {
  e.preventDefault();

  if (inputElem.value === "") {
    promptOutput.innerHTML = `<span class="error">No text entered!</span>`;
    return;
  }

  try {
    promptOutput.textContent = "...generating response...";
    submitBtn.disabled = true;
    abortBtn.disabled = false;

    const controller = new AbortController();
    abortBtn.addEventListener("click", () => {
      controller.abort("Query aborted by user.");
      submitBtn.disabled = false;
      abortBtn.disabled = true;
    });

    const response = await session.prompt(
      [
        {
          role: "user",
          content: "What do you think of my name?",
        },
        {
          role: "user",
          content: inputElem.value,
        },
      ],
      {
        signal: controller.signal,
      },
    );

    promptOutput.textContent = response;

    submitBtn.disabled = false;
    abortBtn.disabled = true;
    console.log(`${session.contextUsage}/${session.contextWindow}`);
  } catch (e) {
    promptOutput.innerHTML = `<span class="error">${e}</span>`;
  }
}

async function getSession() {
  const availability = await LanguageModel.availability({
    expectedInputs: [{ type: "text", languages: ["en"] }],
    expectedOutputs: [{ type: "text", languages: ["en"] }],
  });
  if (availability === "unavailable") {
    promptOutput.textContent = "Language model not available.";
    return undefined;
  } else if (availability === "available") {
    return await LanguageModel.create({
      expectedInputs: [{ type: "text", languages: ["en"] }],
      expectedOutputs: [{ type: "text", languages: ["en"] }],
      initialPrompts: [
        {
          role: "system",
          content:
            "In each case, respond with a short paragraph that pokes fun at the person's name in a sarcastic manner. Include a rating out of 10 at the end of the paragraph. The response should be cheeky, but not rude or offensive.",
        },
      ],
    });
  }
  return await LanguageModel.create({
    expectedInputs: [{ type: "text", languages: ["en"] }],
    expectedOutputs: [{ type: "text", languages: ["en"] }],
    initialPrompts: [
      {
        role: "system",
        content:
          "In each case, respond with a short paragraph that pokes fun at the person's name in a sarcastic manner. Include a rating out of 10 at the end of the paragraph. The response should be cheeky, but not rude or offensive.",
      },
    ],
    monitor(monitor) {
      monitor.addEventListener("downloadprogress", (e) => {
        promptOutput.textContent = `Downloading model data ${Math.floor(e.loaded * 100)}%`;
      });
    },
  });
}
```

### JavaScript

When the `create()` method is called to create the session `LanguageModel` instance, we pass in an `initialPrompts` option that includes a `system` input to tell the model exactly how we want it to respond to each user prompt:

```js
return await LanguageModel.create({
  expectedInputs: [{ type: "text", languages: ["en"] }],
  expectedOutputs: [{ type: "text", languages: ["en"] }],
  initialPrompts: [
    {
      role: "system",
      content:
        "In each case, respond with a short paragraph that pokes fun at the person's name in a sarcastic manner. Include a rating out of 10 at the end of the paragraph. The response should be cheeky, but not rude or offensive.",
    },
  ],
});
```

When we call `prompt()` on our `session` object, we pass two `user` input objects to it. The first one makes it clear what the user is asking of the API, and the second provides the user's name entered into the `` element for the API to review.

```js
const response = await session.prompt(
  [
    {
      role: "user",
      content: "What do you think of my name?",
    },
    {
      role: "user",
      content: inputElem.value,
    },
  ],
  {
    signal: controller.signal,
  },
);
```

### Result

Try entering a name into the ``, then press the submit button to prompt the AI model for a whimsical review of the name.
