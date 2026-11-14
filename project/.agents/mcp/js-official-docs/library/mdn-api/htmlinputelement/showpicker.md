---
title: "HTMLInputElement: showPicker() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/showpicker/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: showPicker() method

The **`HTMLInputElement.showPicker()`** method displays the browser picker for an `input` element.

This is the same picker that would normally be displayed when the element is selected, but can be triggered from a button press or other user interaction.

Commonly browsers implement it for inputs of these types: `"date"`, `"month"`, `"week"`, `"time"`, `"datetime-local"`, `"color"`, or `"file"`.
It can also be prepopulated with items from a `<datalist>` element or `autocomplete` attribute.

More generally, this method should ideally display the picker for any input element on the platform that has a picker.

## Syntax

```js
showPicker()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the element is not mutable, meaning that the user cannot modify it and/or that it cannot be automatically prefilled.
- `NotAllowedError` `DOMException`
    Thrown if not explicitly triggered by a user action such as a touch gesture or mouse click (the picker requires Transient activation).
- `SecurityError` `DOMException`
    Thrown if called in a cross-origin iframe, except for file and color pickers (exempt for historical reasons).

## Security

Transient user activation is required. The user has to interact with the page or a UI element in order for this feature to work.

## Examples

### Feature Detection

The code below shows how to check if `showPicker()` is supported:

```js
if ("showPicker" in HTMLInputElement.prototype) {
  // showPicker() is supported.
}
```

### Normal input pickers

This example shows how this feature can be used for `color` and `file` input pickers.

> **Note:**
> Pickers for `date`, `datetime-local`, `month`, `time`, `week` are launched in the same way.
> They cannot be shown here because live examples run in a cross-origin frame, and would cause a `SecurityError`

#### HTML

```html
<p>
  <input type="color" />
  <button id="color">Show the color picker</button>
</p>

<p>
  <input type="file" />
  <button id="file">Show the file picker</button>
</p>
```

#### JavaScript

The code simply gets the previous element of the selected button and calls `showPicker()` on it.

```js
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const input = event.srcElement.previousElementSibling;
    try {
      input.showPicker();
    } catch (error) {
      console.log(error);
    }
  });
});
```

#### Result

Click the button next to each input type to show its picker.

### showPicker() for a datalist input

`showPicker()` can launch the picker for a list of options defined in a `<datalist>`.

First we define a `<datalist>` in HTML consisting of a number of internet browsers, an input of type `text` that uses it, and a button.

```html
<datalist id="browsers">
  <option value="Chrome"></option>
  <option value="Firefox"></option>
  <option value="Opera"></option>
  <option value="Safari"></option>
  <option value="Microsoft Edge"></option>
</datalist>

<input type="text" list="browsers" />
<button>Select browser</button>
```

The code below adds an event listener that calls `showPicker()` when the button is clicked.

```js
const button = document.querySelector("button");
const browserInput = document.querySelector("input");

button.addEventListener("click", () => {
  try {
    browserInput.showPicker();
  } catch (error) {
    // Fall back to another picker mechanism
  }
});
```

As for the other pickers, we can't show this code running as a live example because it runs in a cross-origin frame, and would cause a `SecurityError`.

### showPicker() for autocomplete

`showPicker()` can launch a picker for an `autocomplete` input.

Here we define an input that takes an autocomplete option of "name".

```html
<input autocomplete="name" /> <button>Show autocomplete options</button>
```

The code below shows the picker for the input when the button is clicked.

```js
const button = document.querySelector("button");
const browserInput = document.querySelector("input");

button.addEventListener("click", () => {
  try {
    browserInput.showPicker();
  } catch (error) {
    // Fall back to another picker mechanism
  }
});
```

## See also

- ``
- `HTMLInputElement`
- `HTMLSelectElement.showPicker()`
- `<datalist>`
- `autocomplete`
