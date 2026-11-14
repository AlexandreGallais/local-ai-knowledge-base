---
title: "HTMLSelectElement: showPicker() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/showpicker/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: showPicker() method

The **`HTMLSelectElement.showPicker()`** method displays the browser picker for a `select` element.

This is the same picker that would normally be displayed when the element is selected, but can be triggered from a button press or other user interaction.

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
- `NotSupportedError` `DOMException`
    Thrown if the element associated with the picker is not being rendered.
- `SecurityError` `DOMException`
    Thrown if called in a cross-origin iframe.

## Security considerations

Transient user activation is required.
The user has to interact with the page or a UI element in order for this feature to work.

The method is only allowed to be called in same-origin iframes; an exception is thrown if this is called in a cross-origin iframe.

## Examples

### Feature detection

The code below shows how to check if `showPicker()` is supported:

```js
if ("showPicker" in HTMLSelectElement.prototype) {
  // showPicker() is supported.
}
```

### Launching the picker

This example shows how to use a button to launch the picker for a `<select>` element with two options.

#### HTML

```html
<p>
  <select>
    <option value="1">One</option>
    <option value="2">Two</option>
  </select>
  <button type="button">Show Picker</button>
</p>
```

#### JavaScript

The code gets the `` and adds a listener for its `click` event.
The event handler gets the `<select>` element and calls `showPicker()` on it.

```js
const button = document.querySelector("button");
button.addEventListener("click", (event) => {
  const select = event.srcElement.previousElementSibling;
  try {
    select.showPicker();
  } catch (error) {
    window.alert(error);
  }
});
```

## See also

- `<select>`
- `HTMLSelectElement`
- `HTMLInputElement.showPicker()`
