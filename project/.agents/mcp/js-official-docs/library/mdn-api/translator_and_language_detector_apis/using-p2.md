---
title: "Using the Translator and Language Detector APIs (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/translator_and_language_detector_apis/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Translator and Language Detector APIs (part 2 of 2)

## Complete example

Let's look at a complete example that demonstrates the Translator and Language Detector APIs in action.

### HTML

In our markup, we first define an input `<form>` that allows the user to set the text to translate, and language to translate into. This includes a `<textarea>` for entering the text itself, an `<output>` element to display the detected language, and a `<select>` element for choosing a translation language.

```html
<h2>Input</h2>

<form>
  <div>
    <label for="translate-text">Enter text to translate:</label>
    <textarea id="translate-text" name="translateText" rows="6"></textarea>
    <output class="detected-language">Detected language: </output>
  </div>
  <div>
    <label for="translate-language">Choose translation language:</label>
    <select id="translate-language" name="translateLanguage">
      <option value="en" selected>English (en)</option>
      <option value="fr">French (fr)</option>
      <option value="de">German (de)</option>
      <option value="it">Italian (it)</option>
      <option value="zh">Mandarin Chinese (zh)</option>
      <option value="zh-Hant">Taiwanese Mandarin (zh-Hant)</option>
      <option value="ja">Japanese (ja)</option>
      <option value="pt">Portuguese (pt)</option>
      <option value="ru">Russian (ru)</option>
      <option value="es">Spanish (es)</option>
      <option value="tr">Turkish (tr)</option>
      <option value="hi">Hindi (hi)</option>
      <option value="vi">Vietnamese (vi)</option>
      <option value="bn">Bengali (bn)</option>
    </select>
  </div>
  <button type="submit">Translate</button>
</form>
```

The second half of our markup includes a `` element to display the generated translation.

```html
<h2>Translation output</h2>

<p class="translate-output"></p>
```

```css
* {
  box-sizing: border-box;
}

html {
  font-family: "Helvetica", "Arial", sans-serif;
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

select,
textarea,
.translate-output {
  padding: 5px;
}

.translate-output {
  min-height: 150px;
  border: 1px solid black;
  width: 100%;
  display: block;
}

.error {
  color: red;
}
```

Note that we won't show the CSS for this example, as none of it is relevant to understanding the Translator and Language Detector APIs.

### JavaScript

In our script, we start off by grabbing references to the `<form>`, `<textarea>`, submit ``, translation output ``, and language detection `<output>` elements. We also declare a variable called `detectedLanguage` to contain results of language detection operations.

```js
const form = document.querySelector("form");
const textarea = document.querySelector("textarea");
const submitBtn = document.querySelector("button");

const translateOutput = document.querySelector(".translate-output");
const detectedLanguageOutput = document.querySelector(".detected-language");
let detectedLanguage = "";
```

Next, we use the `EventTarget.addEventListener()` method to listen to two events:

- `submit` events on the `<form>` element; when the form is submitted, the `handleTranslation()` function is called.
- `input` events on the `<textarea>` element; when the current `<textarea>` value is changed, the `detectLanguage()` function is called.

```js
form.addEventListener("submit", handleTranslation);
textarea.addEventListener("input", detectLanguage);
```

The `detectLanguage()` function, defined next, first checks whether the `<textarea>` element's value is greater than 20 characters. If so, we carry on with the language detection. If not, we disable the submit button and display a message in the `<output>` element's `textContent` saying that the text is too short to detect the language. We do this because language detection generally doesn't work well on single words and very short phrases. If you commonly work with short text, test carefully with your priority languages and return the result as unknown when the confidence is too low.

When detecting the language of the entered text, we create a `LanguageDetector` instance using the `create()` method, which includes a `monitor` to log download progress if the model takes a while to download. We then detect the language using the `detect()` method, passing it the `<textarea>` value. When the results are returned, we write the language and confidence of the top result into the `<output>` element. In more complex apps, you might want to report multiple results and possibly let the user choose what language it is, but this will do for the demo.

Finally, we set the submit button to not be disabled, so the form can be submitted to start the translation.

```js
async function detectLanguage() {
  if (textarea.value.length > 20) {
    const detector = await LanguageDetector.create({
      monitor(monitor) {
        monitor.addEventListener("downloadprogress", (e) => {
          console.log(`Downloaded ${e.loaded * 100}%`);
        });
      },
    });

    const results = await detector.detect(textarea.value);
    detectedLanguageOutput.textContent = `Detected language: ${
      results[0].detectedLanguage
    }. Confidence: ${results[0].confidence.toFixed(4)}`;
    detectedLanguage = results[0].detectedLanguage;

    submitBtn.disabled = false;
  } else {
    detectedLanguageOutput.textContent = `Text too short to accurately detect language.`;
    detectedLanguage = "";

    submitBtn.disabled = true;
  }
}
```

Now we define the `handleTranslation()` function. After preventing the form's default submission, we create a new `FormData` object instance containing our `<form>` data name/value pairs. We then run a data validation test, checking whether the detected `<textarea>` content language is the same as the language chosen to translate into (`translateLanguage`). If it is, we print an error message inside the `` with class `translate-output`.

```js
async function handleTranslation(e) {
  e.preventDefault();

  const formData = new FormData(form);

  if (formData.get("translateLanguage") === detectedLanguage) {
    translateOutput.innerHTML = `<span class="error">Input language and translation language are the same.</span>`;
    return;
  }
  translateOutput.innerHTML = "";
```

If the test passes, we open a `try { ... }` block. We start by checking the availability of the model for translating between the detected input and chosen output languages using the `availability()` method:

- If it returns `unavailable`, we print an appropriate error message inside the `` with class `translate-output`.
- If it returns `available`, we create a translator using the `create()` method, passing it the detected input and chosen output languages. The required AI model is available, so we can use it immediately.
- If it returns a different value (that is, `downloadable` or `downloading`), we run the same `create()` method call, but this time we include a `monitor` that prints out the percentage of the model downloaded to the `translate-output` `` each time the `downloadprogress` event fires.

```js
  try {
    const availability = await Translator.availability({
      sourceLanguage: detectedLanguage,
      targetLanguage: formData.get("translateLanguage"),
    });
    let translator;

    if (availability === "unavailable") {
      translateOutput.innerHTML = `<span class="error">Translation not available; try a different language combination.</span>`;
      return;
    } else if (availability === "available") {
      translator = await Translator.create({
        sourceLanguage: detectedLanguage,
        targetLanguage: formData.get("translateLanguage"),
      });
    } else {
      translator = await Translator.create({
        sourceLanguage: detectedLanguage,
        targetLanguage: formData.get("translateLanguage"),
        monitor(monitor) {
          monitor.addEventListener("downloadprogress", (e) => {
            translateOutput.textContent = `Downloaded ${Math.floor(
              e.loaded * 100
            )}%`;
          });
        },
      });
    }
```

Next, we set the output `` content to a pending message and disable the submit button before calling `Translator.translate()` to perform the actual translation, passing it the `<textarea>` value. Once the translation is done, we display it inside the output `` before making the submit button not disabled again.

```js
translateOutput.textContent = "...generating translation...";
submitBtn.disabled = true;

const translation = await translator.translate(formData.get("translateText"));

translateOutput.textContent = translation;
submitBtn.disabled = false;
```

Finally, we include the `try` block's counterpart `catch() { ... }` block. If the `try` content throws any kind of exception, we display it inside the output ``.

```js
  } catch (e) {
    translateOutput.innerHTML = `<span class="error">${e}</span>`;
  }
}
```

### Result

The rendered example looks like this:

Try typing a body of text into the `<textarea>`, and note how the detected language and confidence are only reported when the number of characters becomes greater than 20. Choose a translation language different to your input text, then press the submit button to generate an AI-generated translation.

Some of the translation language choices may not be available in your browser, even if it does support the APIs.
