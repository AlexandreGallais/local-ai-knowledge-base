---
title: "ValidityState: rangeUnderflow property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/validitystate/rangeunderflow/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ValidityState: rangeUnderflow property

The read-only **`rangeUnderflow`** property of the `ValidityState` interface indicates if the value of an ``, after having been edited by the user, does not conform to the constraints set by the element's `min` attribute.

If the field is numeric in nature, including the `<date>`, `<month>`, `<week>`, `<time>`, `<datetime-local>`, `<number>` and `<range>` types and a `min` value is set, if the value doesn't conform to the constraints set by the `min` value, the `rangeUnderflow` property will be true.

## Value

A boolean that is `true` if the `ValidityState` does not conform to the constraints.

## Examples

### Input with numeric underflow

The following example checks the validity of a numeric input element.
A constraint has been added using the `min` attribute which sets a minimum value of `18` for the input.
If the user enters a number lower than 18, the element fails constraint validation, and the styles matching `:invalid` and `:out-of-range` CSS pseudo-classes

```css
/* or :invalid */
input:out-of-range {
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
<input type="number" id="age" min="18" />
```

```js
const userInput = document.getElementById("age");
const logElement = document.getElementById("log");

function log(text) {
  logElement.innerText = text;
}

userInput.addEventListener("input", () => {
  userInput.reportValidity();
  if (userInput.validity.rangeUnderflow) {
    log("Number is too low!");
  } else {
    log("Valid…");
  }
});
```

## See also

- `ValidityState.rangeOverflow`
- Constraint validation
- Forms: Data form validation
- `step` attribute
- `max` attribute
