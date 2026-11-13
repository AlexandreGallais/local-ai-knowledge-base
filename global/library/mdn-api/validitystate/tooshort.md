---
title: "ValidityState: tooShort property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/validitystate/tooshort/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ValidityState: tooShort property

The read-only **`tooShort`** property of the `ValidityState` interface indicates if the value of an ``, ``, `<select>`, `<output>`, `<fieldset>` or `<textarea>`, after having been edited by the user, is less than the minimum code-unit length established by the element's `minlength` attribute.

## Value

A boolean that is `true` if the `ValidityState` does not conform to the constraints.

## Examples

### Input with too short string value

The following example checks the validity of a text input element.
A constraint has been added using the `minlength` attribute so the input expects a string with a minimum of 4 characters.
If the user enters a string that's too short, the element fails constraint validation, and the styles matching `:invalid` CSS pseudo-class are applied.

```css
input:invalid {
  outline: red solid 3px;
}
```

```css
body {
  margin: 0.5rem;
}
pre {
  padding: 1rem;
  height: 2rem;
  background-color: lightgrey;
  outline: 1px solid grey;
}
```

```html
<pre id="log">Validation logged here...</pre>
<input type="text" id="userText" minlength="4" />
```

```js
const userInput = document.getElementById("userText");
const logElement = document.getElementById("log");

function log(text) {
  logElement.innerText = text;
}

userInput.addEventListener("input", () => {
  userInput.reportValidity();
  if (userInput.validity.tooShort) {
    log("Not enough characters entered.");
  } else {
    log("Input is valid…");
  }
});
```

## See also

- Guide: Constraint validation
- Tutorial: Form data validation
