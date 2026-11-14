---
title: "Using the Prompt API (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/prompt_api/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Prompt API (part 2 of 2)

## Complete example

Let's look at a complete example that demonstrates the Prompt API in action. This example provides a text input box to enter a prompt, which can be submitted to the API to request a response. The response is then printed to an output box.

### HTML

In our markup, we define an input `<textarea>` that allows the user to type in a prompt. We also include two `` elements — one to submit the prompt/query, and another to abort an ongoing query.

```html
<h1>Prompt API demo</h1>
<p>First released in Chrome 148.</p>

<h2>Input</h2>
<form>
  <div>
    <label for="prompt-text">Enter prompt text:</label>
    <textarea id="prompt-text" name="promptText" rows="6"></textarea>
  </div>
  <button type="submit" id="submit">Submit query</button
  ><button type="button" id="abort">Abort query</button>
</form>
```

```html
<h1>Prompt API streaming demo</h1>
<p>First released in Chrome 148.</p>

<h2>Input</h2>
<form>
  <div>
    <label for="prompt-text">Enter prompt text:</label>
    <textarea id="prompt-text" name="promptText" rows="6"></textarea>
  </div>
  <button type="submit" id="submit">Submit query</button
  ><button type="button" id="abort">Abort query</button>
</form>
```

Next, we include a `` element to display the model's response to the user's prompt, plus details of any errors that are thrown.

```html
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

Note that we won't show the CSS for this example, as none of it is relevant to understanding the Prompt API.

### JavaScript

In our script, we start off by grabbing references to the `<form>`, `<textarea>`, submit ``, abort ``, and output ``. We initially disable the submit and abort buttons, as we don't want them to be pressed before the related functionality is available.

```js
const form = document.querySelector("form");
const textarea = document.querySelector("textarea");
const submitBtn = document.querySelector("#submit");
const abortBtn = document.querySelector("#abort");
abortBtn.disabled = true;
submitBtn.disabled = true;
const promptOutput = document.querySelector(".prompt-output");
```

Next, we create a global `session` variable to hold our session. Because using the API requires transient activation, we populate `session` inside a `focus` event handler on the `<textarea>`. When the user focuses the `<textarea>`, we first check whether the API is supported; if not, we print a non-support message and `return` early. Next, we check whether `session` already has a value assigned (we don't want to create a new session each time). If not, we run the `init()` function, which generates a `LanguageModel` instance using the custom `getSession()` function defined later on.

Provided generation is successful, we assign the resulting `LanguageModel` instance to the `session` variable, print a success message to the output ``, and enable the submit `` (now the session is available, we can start prompting it).

```js
let session;
textarea.addEventListener("focus", () => {
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
```

Next, we add a `submit` event listener to the `<form>` element; when the form is submitted, the `handleSubmission()` function is called.

```js
form.addEventListener("submit", handleSubmission);
```

Next, we define the `handleSubmission()` function. This first stops the form from submitting using `Event.preventDefault()`, then checks whether the input `<textarea>` was empty on submission. If it was, we write an error into the output `` and return out of the function. We don't want to waste our time trying to prompt the AI with an empty string.

Next, inside a `try` block, we:

- Insert a message in the output `` to say that a response is being generated, and flip the `disabled` status of the two buttons. At this point, we want to allow users to abort the prompt operation that is about to start, but we don't want them trying to start another prompt until that one is finished.
- Create a new `AbortController` and add a `click` event listener to the abort `` so that when it is clicked, `abort()` is fired on the controller to abort the prompt operation and the `` disabled states are reset.
- Invoke `prompt()` on the `session` to start the prompt, passing it the contents of the `<textarea>` as its prompt query, and an options object containing a `signal` property equal to the `signal` of the controller. This is what allows us to abort the `prompt()` operation by pressing the abort ``.
- Set the output ``'s `textContent` to the API's `response` when it is returned, so the user can read it.
- Reset the `disabled` state of the buttons.
- Log the remaining tokens available to the console, as `contextUsage`/`contextWindow`.

In the `try` block's `catch` counterpart, we print any errors that are thrown to the output ``.

```js
async function handleSubmission(e) {
  e.preventDefault();

  if (textarea.value === "") {
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

    const response = await session.prompt(textarea.value, {
      signal: controller.signal,
    });

    promptOutput.textContent = response;

    submitBtn.disabled = false;
    abortBtn.disabled = true;
    console.log(`${session.contextUsage}/${session.contextWindow}`);
  } catch (e) {
    promptOutput.innerHTML = `<span class="error">${e}</span>`;
  }
}
```

Now we define the `getSession()` function used to return our session `LanguageModel`. The function starts by running our desired model requirements through the `availability()` method to see if it is available:

- If it returns `unavailable`, we print an appropriate error message to the output ``.
- If it returns `available`, we create a session using the `create()` method, passing it the desired options, and return it. The required configuration is available, so we can use it immediately.
- If it returns a different value (that is, `downloadable` or `downloading`), we run the same `create()` method call, but this time we include a `monitor` that prints out the percentage of the additional data downloaded to the output `` each time the `downloadprogress` event fires.

```js
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
    });
  }
  return await LanguageModel.create({
    expectedInputs: [{ type: "text", languages: ["en"] }],
    expectedOutputs: [{ type: "text", languages: ["en"] }],
    monitor(monitor) {
      monitor.addEventListener("downloadprogress", (e) => {
        promptOutput.textContent = `Downloading model data ${Math.floor(e.loaded * 100)}%`;
      });
    },
  });
}
```

### Result

Try typing a question or statement into the `<textarea>`, then press the submit button to prompt the AI model and generate a response.

## Complete streaming example

This example demonstrates using the `promptStreaming()` method to return responses from the model as a stream. It is exactly the same as the previous example, except that the `prompt()` call has been replaced with `promptStreaming()`, and a `for await...of` loop has been used to output the model responses incrementally:

```js
const stream = await session.promptStreaming(textarea.value, {
  signal: controller.signal,
});

const chunks = [];

promptOutput.textContent = "";
for await (const chunk of stream) {
  promptOutput.textContent += chunk;
}
```

```js
const form = document.querySelector("form");
const textarea = document.querySelector("textarea");
const submitBtn = document.querySelector("#submit");
const abortBtn = document.querySelector("#abort");
abortBtn.disabled = true;
submitBtn.disabled = true;
const promptOutput = document.querySelector(".prompt-output");

let session;
textarea.addEventListener("focus", () => {
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

  if (textarea.value === "") {
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

    const stream = await session.promptStreaming(textarea.value, {
      signal: controller.signal,
    });

    const chunks = [];

    promptOutput.textContent = "";
    for await (const chunk of stream) {
      promptOutput.textContent += chunk;
    }

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
    });
  }
  return await LanguageModel.create({
    expectedInputs: [{ type: "text", languages: ["en"] }],
    expectedOutputs: [{ type: "text", languages: ["en"] }],
    monitor(monitor) {
      monitor.addEventListener("downloadprogress", (e) => {
        promptOutput.textContent = `Downloading model data ${Math.floor(e.loaded * 100)}%`;
      });
    },
  });
}
```

Enter a simple query, and note how the response is written to the output incrementally, rather than all appearing at once.

## See also

- Prompt API Playground on chrome.dev (2026)
