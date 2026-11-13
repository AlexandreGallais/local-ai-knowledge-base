---
title: "HTMLElement: autocorrect property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/autocorrect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: autocorrect property

The **`autocorrect`** property of the `HTMLElement` interface controls whether or not autocorrection of editable text is enabled for spelling and/or punctuation errors.

The specific autocorrection behavior, including which words are substituted, depends on the user agent and the services provided by the underlying device.
For example, on macOS a user agent might rely on registered replacement text and punctuation.
Other devices and browsers may use a different approach.

The property reflects the value of the `autocorrect` HTML global attribute.

## Value

`true` if auto-correction is enabled for the element, and `false` otherwise.

## Examples

### Enable and disable autocorrection

This example shows how you can enable and disable autocorrection.

#### HTML

The HTML markup defines a toggle button and an `` element of `type="search"`.
Note that if auto-correction is supported, it will be enabled by default.

```html
<button id="toggleAutocorrect">Unknown</button>
<input type="search" id="searchinput" />
```

```html
<pre id="log"></pre>
```

```css
#log {
  height: 100px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

#### JavaScript

The code first checks whether the `autocorrect` is supported by checking if it is present on the `HTMLElement` prototype.
If it is present, a click handler is added to allow you to toggle the value.
If it is not present, the UI hides the interactive elements and logs that `autocorrect` is not supported.

```js
const toggleButton = document.querySelector("button");
const searchInput = document.querySelector("#searchinput");

function setButtonText() {
  toggleButton.textContent = searchInput.autocorrect ? "Enabled" : "Disabled";
  log(`autocorrect: ${searchInput.autocorrect}`);
}

if (`autocorrect` in HTMLElement.prototype) {
  setButtonText();

  toggleButton.addEventListener("click", (e) => {
    searchInput.autocorrect = !searchInput.autocorrect;
    setButtonText();
  });
} else {
  toggleButton.hidden = true;
  searchInput.hidden = true;
  log("autocorrect not supported");
}
```

#### Result

Activate the button to toggle the autocorrect value.
Enter invalid text into the text box, such as "Carot".
When the autocorrect is enabled, and if the implementation has the appropriate substitute word "carrot", the text should automatically be corrected.

## See also

- `autocapitalize` HTML global attribute
