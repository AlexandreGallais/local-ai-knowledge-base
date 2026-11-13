---
title: "ValidityState: valueMissing property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/validitystate/valuemissing/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ValidityState: valueMissing property

The read-only **`valueMissing`** property of the `ValidityState` interface indicates if a `required` control, such as an ``, `<select>`, or `<textarea>`, has an empty value.

If the `required` attribute is set, and no `<option>` is selected or a `<textarea>` or user-editable `` is empty, the `valueMissing` property will be `true`. The property is only `true` if the field is required and has no value; if the field is not required, or if the field is required and has a value, the value is `false`.

## Value

A boolean that is `true` if the `ValidityState` is not set and the `required` attribute is.

### Missing required input value

The following example checks the validity of a numeric input element.
Constraints have been added using the `min` attribute which sets a minimum value of `18` for the input, and the `required` attribute which disallows empty values.
If the user enters any value that's not a number greater than 17, the element fails constraint validation, and the styles matching `:invalid` are applied.

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
<input type="number" id="age" min="18" required />
```

```js
const userInput = document.getElementById("age");
const logElement = document.getElementById("log");

function log(text) {
  logElement.innerText = text;
}

userInput.addEventListener("input", () => {
  userInput.reportValidity();
  if (userInput.validity.valid) {
    log("Input OK…");
  } else if (userInput.validity.valueMissing) {
    log("Required field cannot be empty.");
  } else {
    log(`Bad input detected: ${userInput.validationMessage}`);
  }
});
```

## See also

- ValidityState badInput, valid properties.
- Constraint validation
- Forms: Data form validation
- Regular Expressions
