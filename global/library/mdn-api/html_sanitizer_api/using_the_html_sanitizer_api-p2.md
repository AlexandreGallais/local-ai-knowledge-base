---
title: "Using the HTML Sanitizer API (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/html_sanitizer_api/using_the_html_sanitizer_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the HTML Sanitizer API (part 2 of 2)

## Examples

For other examples see the HTML Sanitizer API and the individual methods of the `Sanitizer` interface.

### Sanitizer demo

This example shows how you can use the `Sanitizer` methods to update a sanitizer.
The result is a demonstration interface where you can add elements and attributes to the allow and remove lists and see their effects when the sanitizer is used with `Element.setHTML()` and `Element.setHTMLUnsafe()`.

#### HTML

First we define buttons to reset the default sanitizer or an empty sanitizer.

```html
<div class="button-group">
  <button id="defaultSanitizerBtn">Default Sanitizer</button>
  <button id="emptySanitizerBtn">Empty Sanitizer</button>
</div>
```

This is followed by `<select>` elements to allow users to choose elements to add to the allow and remove lists for elements and attributes.

```html
<div class="select-group">
  <label for="allowElementSelect">allowElement:</label>
  <select id="allowElementSelect">
    <option value="">--Choose element--</option>
    <option value="h1">h1</option>
    <option value="div">div</option>
    <option value="span">span</option>
    <option value="script">script</option>
    <option value="p">p</option>
    <option value="button">button</option>
    <option value="img">img</option>
  </select>

  <label for="removeElementSelect">removeElement:</label>
  <select id="removeElementSelect">
    <option value="">--Choose element--</option>
    <option value="h1">h1</option>
    <option value="div">div</option>
    <option value="span">span</option>
    <option value="script">script</option>
    <option value="p">p</option>
    <option value="button">button</option>
    <option value="img">img</option>
  </select>
</div>
<div class="select-group">
  <label for="allowAttributeSelect">allowAttribute:</label>
  <select id="allowAttributeSelect">
    <option value="">--Choose attribute--</option>
    <option value="class">class</option>
    <option value="autocapitalize">autocapitalize</option>
    <option value="hidden">hidden</option>
    <option value="lang">lang</option>
    <option value="title">title</option>
    <option value="onclick">onclick</option>
  </select>
  <label for="removeAttributeSelect">removeAttribute:</label>
  <select id="removeAttributeSelect">
    <option value="">--Choose attribute--</option>
    <option value="class">class</option>
    <option value="autocapitalize">autocapitalize</option>
    <option value="hidden">hidden</option>
    <option value="lang">lang</option>
    <option value="title">title</option>
    <option value="onclick">onclick</option>
  </select>
</div>
```

Then we add buttons to toggle comments and data attributes to be allowed/removed.

```html
<div class="button-group">
  <button id="toggleCommentsBtn">Toggle comments</button>
  <button id="toggleDataAttributesBtn">Toggle data-attributes</button>
</div>
```

The remaining elements display the string to be parsed (editable) and the result of those two strings when injected into an element using `setHTML()` and `setHMLUnsafe()`, respectively:

```html
<div>
  <p>Original string (Editable)</p>
  <pre contenteditable id="unmodified"></pre>
  <p>setHTML() (HTML as string)</p>
  <pre id="setHTML"></pre>
  <p>setHTMLUnsafe() (HTML as string)</p>
  <pre id="setHTMLUnsafe"></pre>
</div>
```

```html
<pre id="log"></pre>
```

```css
#log {
  height: 430px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

#### JavaScript

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.textContent = text;
}
```

The code first tests whether the `Sanitizer` interface is supported.
It then defines a string of "unsafe HTML", which contains a mixture of XSS-safe and XSS-unsafe elements (such as `<script>`).
This is inserted into the first text area as text.
The text area is editable, so users can change the text later if they want.

We then get the elements for the `setHTML` and `setHTMLUnsafe` text areas where we will write the parsed HTML, and create an empty `Sanitizer` configuration.
The `applySanitizer()` method is called with the new sanitizer to log the result of sanitizing the initial string using both a safe and unsafe sanitizer.

```js
if ("Sanitizer" in window) {
  // Define unsafe string of HTML
  const initialHTMLString =
    `<div id="mainDiv"><!-- HTML comment -->
    <p data-test="true">This is a paragraph. <button onclick="alert('You clicked the button!')">Click me</button></p>
    <p>Be <b>bold</b> and brave!</p>
    <script>alert(1)<` + "/script></div>";

  // Set unsafe string as a text node of first element
  const unmodifiedElement = document.querySelector("#unmodified");
  unmodifiedElement.innerText = initialHTMLString;
  unsafeHTMLString = unmodifiedElement.innerText;

  const setHTMLElement = document.querySelector("#setHTML");
  const setHTMLUnsafeElement = document.querySelector("#setHTMLUnsafe");
  // Create and apply default sanitizer when we start
  let sanitizer = new Sanitizer({});
  applySanitizer(sanitizer);
```

The `applySanitizer()` logging method is shown below.
This gets the initial content of the "untrusted string" from the first text area, and parses it using the `Element.setHTML()` and `Element.setHTMLUnsafe()` methods with the passed `sanitizer` argument into the respective text areas.
In each case the injected HTML is then read from the element with `innerHTML` and written back into the element as `innerText` (so that it is human readable).

The code then logs the current sanitizer configuration, which it obtains with `Sanitizer.get()`.

```js
function applySanitizer(sanitizer) {
  // Get string to parse into element
  unsafeHTMLString = unmodifiedElement.innerText;

  // Sanitize string using safe method and then display as text
  setHTMLElement.setHTML(unsafeHTMLString, { sanitizer });
  setHTMLElement.innerText = setHTMLElement.innerHTML;

  // Sanitize string using unsafe method and then display as text
  setHTMLUnsafeElement.setHTMLUnsafe(unsafeHTMLString, { sanitizer });
  setHTMLUnsafeElement.innerText = setHTMLUnsafeElement.innerHTML;

  // Display sanitizer configuration
  const sanitizerConfig = sanitizer.get();
  log(JSON.stringify(sanitizerConfig, null, 2));
}
```

Next we get elements for each of the buttons and selection lists.

```js
const defaultSanitizerBtn = document.querySelector("#defaultSanitizerBtn");
const emptySanitizerBtn = document.querySelector("#emptySanitizerBtn");
const allowElementSelect = document.querySelector("#allowElementSelect");
const removeElementSelect = document.querySelector("#removeElementSelect");
const allowAttributeSelect = document.querySelector("#allowAttributeSelect");
const removeAttributeSelect = document.querySelector("#removeAttributeSelect");

const toggleCommentsBtn = document.querySelector("#toggleCommentsBtn");
const toggleDataAttributesBtn = document.querySelector(
  "#toggleDataAttributesBtn",
);
```

The handlers for the first two button create the default and empty sanitizer respectively.
The `applySanitizer()` method we showed before is used to run the sanitizer and update the logs.

```js
defaultSanitizerBtn.addEventListener("click", () => {
  sanitizer = new Sanitizer();
  applySanitizer(sanitizer);
});

emptySanitizerBtn.addEventListener("click", () => {
  sanitizer = new Sanitizer({});
  applySanitizer(sanitizer);
});
```

The handlers for the selection lists are shown next.
These call the associated sanitizer method on the current sanitizer whenever a new element or attribute is selected.
For example, the listener for the `allowElementSelect` calls `Sanitizer.allowElement()` to add the selected element to the allowed elements.
In each case, `applySanitizer()` logs the results using the current sanitizer.

```js
allowElementSelect.addEventListener("change", (event) => {
  if (event.target.value !== "") {
    sanitizer.allowElement(event.target.value);
    applySanitizer(sanitizer);
  }
});
removeElementSelect.addEventListener("change", (event) => {
  if (event.target.value !== "") {
    sanitizer.removeElement(event.target.value);
    applySanitizer(sanitizer);
  }
});
allowAttributeSelect.addEventListener("change", (event) => {
  if (event.target.value !== "") {
    sanitizer.allowAttribute(event.target.value);
    applySanitizer(sanitizer);
  }
});
removeAttributeSelect.addEventListener("change", (event) => {
  if (event.target.value !== "") {
    sanitizer.removeAttribute(event.target.value);
    applySanitizer(sanitizer);
  }
});
```

The handlers for the last two buttons are shown below.
These toggle the value of the `dataAttributesActive` and `commentsActive` variables and then use these values in `Sanitizer.setComments()` and `Sanitizer.setDataAttributes()`
Note that if the comments are initially disabled, the first press of the button may have no effect!

```js
let dataAttributesActive = true;
let commentsActive = true;

toggleCommentsBtn.addEventListener("click", () => {
  commentsActive = !commentsActive;
  sanitizer.setComments(commentsActive);
  applySanitizer(sanitizer);
});

toggleDataAttributesBtn.addEventListener("click", () => {
  dataAttributesActive = !dataAttributesActive;
  sanitizer.setDataAttributes(dataAttributesActive);
  applySanitizer(sanitizer);
});

} else {
  log("The HTML Sanitizer API is NOT supported in this browser.");
  // Provide fallback or alternative behavior
}
```

#### Results

The result is shown below.
Select the top buttons to set a new default or empty sanitizer, respectively.
You can then use the selection lists to add some elements and attributes to the respective sanitizer allow and remove lists, and the other buttons to toggle comments on and off.
The current sanitizer configuration is logged.
The text in the top text area is sanitized using the current sanitizer configuration and parsed with `setHTML()` and `setHTMLUnsafe()`.

Note that adding elements and attributes to the allow lists removes them from the remove lists, and vice versa.
Also note that you can allow elements in sanitizer that will be injected with the unsafe methods, but not the safe methods.
