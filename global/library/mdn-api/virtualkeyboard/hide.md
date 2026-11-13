---
title: "VirtualKeyboard: hide() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/virtualkeyboard/hide/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VirtualKeyboard: hide() method

The **`hide()`** method of the `VirtualKeyboard` interface programmatically hides the on-screen virtual keyboard. This is useful when the page needs to implement its own virtual keyboard logic by using the `VirtualKeyboard API`.

This method only works if the currently-focused element's `virtualKeyboardPolicy` attribute is set to `manual` and `inputmode` isn't set to `none`.

The `hide()` method always returns `undefined` and triggers a `geometrychange` event.

## Syntax

```js
hide()
```

### Parameters

None.

### Return value

Undefined.

## Example

The code snippet below shows how to use the `virtualkeyboardpolicy` attribute to prevent the browser from showing the virtual keyboard on click or tap. The code also uses the `navigator.virtualKeyboard.show()` and `navigator.virtualKeyboard.hide()` methods to show and hide the virtual keyboard when a button is clicked:

```html
<div contenteditable virtualkeyboardpolicy="manual" id="editor"></div>
<button id="edit-button">Edit</button>
```

```js
if ("virtualKeyboard" in navigator) {
  const editor = document.getElementById("editor");
  const editButton = document.getElementById("edit-button");
  let isEditing = false;

  editButton.addEventListener("click", () => {
    if (isEditing) {
      navigator.virtualKeyboard.hide();
      editButton.textContent = "Edit";
    } else {
      editor.focus();
      navigator.virtualKeyboard.show();
      editButton.textContent = "Save changes";
    }

    isEditing = !isEditing;
  });
}
```

## See also

- `The VirtualKeyboard API`
- Full control with the VirtualKeyboard API
