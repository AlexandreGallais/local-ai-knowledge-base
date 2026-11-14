---
title: "ValidityState: valid property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/validitystate/valid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ValidityState: valid property

The read-only **`valid`** property of the `ValidityState` interface indicates if the value of an `` element meets all its validation constraints, and is therefore considered to be valid.

If `true`, the element matches the `:valid` CSS pseudo-class; otherwise the `:invalid` CSS pseudo-class applies.

## Value

A boolean that is `true` if the `ValidityState` does conform to all the constraints.

## Examples

### Displaying validity state

The following example checks the validity of a numeric input element.
A constraint has been added using the `min` attribute which sets a minimum value of `18` for the input.
If the user enters any value that's not a number greater than 17, the element fails constraint validation, and the styles matching `input:invalid` are applied.

```css
input:invalid {
  outline: red solid 3px;
}
input:valid {
  outline: palegreen solid 3px;
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
  } else {
    log("Bad input detected…");
  }
});
```

## See also

- ValidityState badInput, customError properties.
- Constraint validation
- Forms: Data form validation
