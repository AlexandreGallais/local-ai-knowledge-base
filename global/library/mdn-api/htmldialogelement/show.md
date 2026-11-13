---
title: "HTMLDialogElement: show() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmldialogelement/show/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLDialogElement: show() method

The **`show()`** method of the `HTMLDialogElement` interface displays the dialog as a non-modal dialog.

A non-modal dialog is one where users can interact with content outside/behind the open dialog.

## Syntax

```js
show()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the dialog is already open and modal (i.e., if the dialog has already been opened with `HTMLDialogElement.showModal()`).

## Examples

### Basic usage

The following example shows a simple button that, when clicked, opens a `<dialog>` using the `show()` method.

When the dialog is open, you can still interact with the rest of the page, including clicking the _Click me_ button that triggers an alert.

You can click the _Close dialog_ button to close the dialog (via the `close()` method).

#### HTML

```html
<dialog id="dialog">
  <button type="button" id="close">Close dialog</button>
</dialog>

<p><button id="open">Open dialog</button></p>
<p><button id="alert">Trigger alert</button></p>
```

#### JavaScript

```js
const dialog = document.getElementById("dialog");
const openButton = document.getElementById("open");
const closeButton = document.getElementById("close");
const alertButton = document.getElementById("alert");

// Open button opens a modeless dialog
openButton.addEventListener("click", () => {
  dialog.show();
});

// Alert button triggers an alert
alertButton.addEventListener("click", () => {
  alert("you clicked me!");
});

// Close button closes the dialog box
closeButton.addEventListener("click", () => {
  dialog.close();
});
```

#### Result

## See also

- HTML `<dialog>` element
- `HTMLDialogElement.showModal()`
