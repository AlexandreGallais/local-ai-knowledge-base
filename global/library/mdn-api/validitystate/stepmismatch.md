---
title: "ValidityState: stepMismatch property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/validitystate/stepmismatch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ValidityState: stepMismatch property

The read-only **`stepMismatch`** property of the `ValidityState` interface indicates if the value of an ``, after having been edited by the user, does not conform to the constraints set by the element's `step` attribute.

If the field is numeric in nature, including the `<date>`, `<month>`, `<week>`, `<time>`, `<datetime-local>`, `<number>` and `<range>` types and the step value is not `any`, if the value don't doesn't conform to the constraints set by the `step` and `min` values, then `stepMismatch` will be true. If the remainder of the form control's value less the `min` value, divided by the `step` value (which defaults to 1 if omitted) is not zero, there is a mismatch.

## Value

A boolean that is `true` if the `ValidityState` does not conform to the constraints.

## Examples

### Input with step mismatch

The following example checks the validity of a numeric input element.
A constraint has been added using the `step` attribute which means the input expects increments of 5 as values.
If the user enters a number that's not divisible by 5, the element fails constraint validation, and the styles matching `:invalid` CSS pseudo-class are applied.

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
<input type="number" id="degrees" step="5" />
```

```js
const userInput = document.getElementById("degrees");
const logElement = document.getElementById("log");

function log(text) {
  logElement.innerText = text;
}

userInput.addEventListener("input", () => {
  userInput.reportValidity();
  if (userInput.validity.stepMismatch) {
    log("Input must be divisible by 5");
  } else {
    log("Input is valid…");
  }
});
```

## See also

- Constraint validation
- Forms: Data form validation
- `step` attribute
