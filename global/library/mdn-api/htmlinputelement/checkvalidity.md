---
title: "HTMLInputElement: checkValidity() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/checkvalidity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: checkValidity() method

The **`checkValidity()`** method of the `HTMLInputElement` interface returns a boolean value which indicates if the element meets any constraint validation rules applied to it. If false, the method also fires an `invalid` event on the element. Because there's no default browser behavior for `checkValidity()`, canceling this `invalid` event has no effect.

> **Note:**
> An HTML `` element with a non-null `validationMessage` is considered invalid, will match the CSS `:invalid` pseudo-class, and will cause `checkValidity()` to return false. Use the `HTMLInputElement.setCustomValidity()` method to set the `HTMLInputElement.validationMessage` to the empty string to set the `validity` state to be valid.

## Syntax

```js
checkValidity()
```

### Parameters

None.

### Return value

Returns `true` if the element's value has no validity problems; otherwise, returns `false`.

## Examples

### HTML

We include a required number field and a button to check its validity.

```html
<p>
  <label for="age">Your (21 to 65) </label>
  <input type="number" name="age" required id="age" min="21" max="65" />
</p>
<p>
  <button type="button" id="check">checkValidity()</button>
</p>
<pre id="log"></pre>
```

### JavaScript

We log the return value of `checkValidity()` when the button is activated. We also listen for the `invalid` event and append a message to the output when it fires.

```js
const output = document.querySelector("#log");
const checkButton = document.querySelector("#check");
const ageInput = document.querySelector("#age");

ageInput.addEventListener("invalid", () => {
  output.textContent += "Invalid event fired.\n";
});

checkButton.addEventListener("click", () => {
  const checkVal = ageInput.checkValidity();
  output.textContent = `checkValidity returned: ${checkVal}`;
});
```

### Results

When `false`, if the value is missing, below 21, above 65, or otherwise invalid, the invalid event will be logged in the output. To report the error to the user, use `HTMLInputElement.reportValidity()` instead.

## See also

- `HTMLInputElement.reportValidity()`
- ``
- `<form>`
- Learn: Client-side form validation
- Guide: Constraint validation
- CSS `:valid` and `:invalid` pseudo-classes
