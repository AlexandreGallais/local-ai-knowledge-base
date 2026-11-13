---
title: "ValidityState: badInput property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/validitystate/badinput/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ValidityState: badInput property

The read-only **`badInput`** property of the ValidityState interface indicates if the user has provided input that the browser is unable to convert. For example, if you have a number input element whose content is a string.

## Value

A boolean that is `true` if the `ValidityState` object does not conform to the expected type.

## Examples

### Detecting bad input

The following example checks the validity of a numeric input element.
If the user enters text instead of a number, the element fails constraint validation, and the styles matching `input:invalid` are applied.
The `<pre>` element above the input shows the validation message when the element `badInput` evaluates to `true`:

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
<input type="number" id="age" />
```

```js
const userInput = document.getElementById("age");
const logElement = document.getElementById("log");

function log(text) {
  logElement.innerText = text;
}

userInput.addEventListener("input", () => {
  userInput.reportValidity();
  if (userInput.validity.badInput) {
    log(`Bad input detected: ${userInput.validationMessage}`);
  }
});
```

## See also

- ValidityState valid, customError properties.
- Guide: Constraint validation
- Tutorial: Form data validation
