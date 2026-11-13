---
title: "HTMLButtonElement: reportValidity() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlbuttonelement/reportvalidity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLButtonElement: reportValidity() method

The **`reportValidity()`** method of the `HTMLButtonElement` interface performs the same validity checking steps as the `checkValidity()` method. In addition, if the `invalid` event is not canceled, the browser displays the problem to the user. It always returns true if the `` element is not a candidate for constraint validation (its `willValidate` is `false`).

## Syntax

```js
reportValidity()
```

### Parameters

None.

### Return value

Returns `true` if the element's value has no validity problems or if it's not a candidate for constraint validation; otherwise, returns `false`.

### Examples

This far fetched example demonstrates how a button can be made invalid.

#### HTML

We create two buttons:

```html
<p>
  <button id="example" type="submit" value="fixed">THIS BUTTON</button>
</p>
<p>
  <button type="button" id="report">reportValidity()</button>
</p>

<p id="log"></p>
```

#### CSS

We add a bit of CSS, including `:valid` and `:invalid` styles for our button:

```css
button {
  background-color: #3333aa;
  border: none;
  font-size: 1.3rem;
  padding: 5px 10px;
  color: white;
}
button:invalid {
  background-color: #aa3333;
}
button:valid {
  background-color: #33aa33;
}
```

#### JavaScript

We include a function to toggle the value, content, and validation message of the example button:

```js
const reportButton = document.querySelector("#report");
const exampleButton = document.querySelector("#example");
const output = document.querySelector("#log");

reportButton.addEventListener("click", () => {
  const reportVal = exampleButton.reportValidity();
  output.innerHTML = `reportValidity returned: ${reportVal} <br/> custom error: ${exampleButton.validationMessage}`;
});

exampleButton.addEventListener("invalid", () => {
  console.log("Invalid event fired on exampleButton");
});

exampleButton.addEventListener("click", () => {
  if (exampleButton.value === "error") {
    breakOrFixButton("fixed");
  } else {
    breakOrFixButton("error");
  }
  output.innerHTML = `validation message: ${exampleButton.validationMessage} <br/> custom error: ${exampleButton.validationMessage}`;
});

function breakOrFixButton() {
  const state = toggleButton();
  if (state === "error") {
    exampleButton.setCustomValidity("This is a custom error message");
  } else {
    exampleButton.setCustomValidity("");
  }
}

function toggleButton() {
  if (exampleButton.value === "error") {
    exampleButton.value = "fixed";
    exampleButton.innerHTML = "No error";
  } else {
    exampleButton.value = "error";
    exampleButton.innerHTML = "Custom error";
  }
  return exampleButton.value;
}
```

#### Results

The button is by default valid. Activate "THIS BUTTON" to change the value, content, and add a custom error message. Activating the "reportValidity()" button checks the validity of the button, reporting the custom error message to the user and throwing an `invalid` event if the button does not pass <example-value> validation due to the message.

## See also

- `HTMLButtonElement.checkValidity()`
- ``
- `<form>`
- Learn: Client-side form validation
- Guide: Constraint validation
- CSS `:valid` and `:invalid` pseudo-classes
